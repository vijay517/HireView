/*
 * Author: Hironobu Fukuzawa
 * Creation Date: 29/03/2023
 * Description: Server-side functions
 */
const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

let db;

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } }, 
    { returnOriginal: false },
  );
  return result.value.current;
}

async function authenticate(parent, { loginInfo }) {
    console.log("loginInfo: ", loginInfo);
    const {email, password} = loginInfo;
    const user = await db.collection('users').findOne({ email });
    if (!user) {
        return false;
    }
    if (user.password !== password) {
        return false;
    }
    return true;
}

async function getUserInfoById(parent, { userId }){
  const id = parseInt(userId);
  const user = await db.collection('users').findOne({id: id});
  return user;
}

async function getUserID(parent, { email }){
  const user = await db.collection('users').findOne({email: email});
  console.log("getUserID userId: ", user.id);
  return user.id;
}

async function getUserInformation(parent, { email }){
    console.log("getUserInformation email: ", email);
    const user = await db.collection('users').findOne({email: email});
    return user;
}

async function getAllServices(){
    const services = await db.collection('services').find({}).toArray();
    return services;
}

async function getAllAvailableServices(){
  console.log("getAllAvailableServices start");
  const services = await db.collection('services').find({transaction_id: 0}).toArray();
  return services;
}

async function getServicesByCategory(parent, { category }){
    console.log("category: ", category);
    const services = await db.collection('services').find({category: category}).toArray();
    return services;
}

async function getServicesByUser(parent, { userId }){
    console.log("userId: ", userId);
    const services = await db.collection('services').find({user_id: userId}).toArray();
    return services;
}

async function getServicesById(parent, { professionalId }){
    console.log("professionalId: ", professionalId);
    const professional = await db.collection('professionals').findOne({ id: professionalId });
    if (!professional) {
      throw new Error(`Professional with id ${professionalId} not found`);
    }
    const serviceIds = professional.service_ids;
    const services = await db.collection('services').find({_id: {$in: serviceIds}}).toArray();
    return services;
}

async function registerUser(parent, { user }){
  console.log("register user", { user });

  // async function getNextSequence(name) {
  //   const result = await db.collection('counters').findOneAndUpdate(
  //     { _id: name },
  //     { $inc: { current: 1 } }, 
  //     { returnOriginal: false },
  //   );
  //   return result.value.current;
  // }

  user.id = await getNextSequence('users');
  console.log("user.id: ", user.id);
  user.createdAt = new Date();

  const result = await db.collection('users').insertOne(user);
  const registeredUser = await db.collection('users').findOne({_id: result.insertedId});
  console.log("registeredUser: ", registeredUser);
  return registeredUser;
}

async function registerProfessional(parent, { user }) {
    console.log("input user data: ", { user });
    const { companyName, companyEmail, companyLocation, websiteUrl, skillName, license, yearsOfExperience, ...rest } = user;
    console.log("rest user: ", rest);
    const isUserRegistered = await registerUser(parent, { "user": { ...rest } });
    console.log("isUserRegistered: ", isUserRegistered);
    if(!isUserRegistered){
        throw new Error(`registerUser with user ${rest} not succeeded`);
    }

    // async function getNextSequence(name) {
    //   const result = await db.collection('counters').findOneAndUpdate(
    //     { _id: name },
    //     { $inc: { current: 1 } }, 
    //     { returnOriginal: false },
    //   );
    //   return result.value.current;
    // }
  
    const professional = {
        user_id: isUserRegistered.id,
        createdAt: new Date(),
        company_id: [],
        skill_ids: [],
        service_ids: [] 
    };

    professional.id = await getNextSequence('professionals');
    console.log("professional.id: ", professional.id);
    const objProfessional = await db.collection('professionals').insertOne(professional);
    console.log("objProfessional: ", objProfessional);

    if(!objProfessional){
        throw new Error(`registeredProfessional with user ${objProfessional} not succeeded`);
    }

    // Inserting Company, Skill
    const company = {
        professional_id: objProfessional.insertedId,
        name: companyName,
        email: companyEmail,
        location: companyLocation,
        websiteUrl: websiteUrl
    };

    const skill = {
        professional_id: objProfessional.insertedId,
        skillName: skillName,
        license: license,
        yearsOfExperience: yearsOfExperience
    };

    company.id = await getNextSequence('companies');
    skill.id = await getNextSequence('skills');
    console.log("company: ", company);
    console.log("skill: ", skill);
    const objCompany = await db.collection('companies').insertOne(company);
    const objSkill = await db.collection('skills').insertOne(skill);
    if(!objCompany){
        throw new Error(`insertCompany ${objCompany} not succeeded`);
    }
    if(!objSkill){
        throw new Error(`insertSkill ${objSkill} not succeeded`);        
    }

    // Update child dependencies (Dependency injections)
    const company_id = objCompany.insertedId;
    const skill_id = objSkill.insertedId;
    const professional_id = objProfessional.insertedId;
    const updateProfessional = {
        $push: {
            skill_ids: skill_id,
            company_id: company_id
        }
    };
    let registeredProfessional = await db.collection('professionals').updateOne(
        { _id: professional_id },
        updateProfessional
    );
    if(!registeredProfessional){
        throw new Error(`registeredProfessional with user ${registeredProfessional} not succeeded`);
    }
    const updatedProfessional = await db.collection('professionals').findOne({ _id: professional_id });
    console.log("updatedProfessional: ", updatedProfessional);
    if (!updatedProfessional) {
        throw new Error('Updated professional document not found');
    }
    return updatedProfessional;
}

async function createQuoteRequest(parent, { inputRequest }){
  console.log(inputRequest);
  inputRequest.id = await getNextSequence('quoterequests');
  console.log(inputRequest);
  const createdQuoteRequest = await db.collection('quoterequests').insertOne(inputRequest);
  const registeredQuoteRequest = await db.collection('quoterequests').findOne({_id: createdQuoteRequest.insertedId});
  return registeredQuoteRequest;
}

async function updateUser(parent, { user }){
  console.log("user:", user);
  let updatedUser = await db.collection('users').updateOne(
    { id: user.id },
    { $set: user }
  );

  console.log("updatedUser.modifiedCount: " + updatedUser.modifiedCount);
  if(updatedUser.modifiedCount > 0){
    return true;
  }
  return false;
}

async function updateUserProfileImage(parent, updateInfo) {
  try {
    console.log("updateUserProfileImage start from server");
    const userid = updateInfo.updateInfo.id;
    const profilepic = updateInfo.updateInfo.profilePic;
    const result = await db.collection('users').updateOne(
      { id: userid },
      { $set: { profilepic: profilepic } }
    );
    if (result.matchedCount === 0) {
      throw new Error(`User with ID ${userid} not found`);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateTransactionStatusOfService(parent, { updateStatus }) {
  try {
    console.log("updateTransactionStatusOfService start");
    console.log("updateStatus: ", updateStatus);
    const serviceId = updateStatus.id;
    const transactionId = updateStatus.transaction_id;
    const userId = updateStatus.user_id;
    const result = await db.collection('services').updateOne(
      { id: serviceId },
      { $set: { transaction_id: transactionId, user_id: userId } }
    );
    if (result.matchedCount === 0) {
      throw new Error(`Services with ID ${serviceId} not found`);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function approveQuoteRequest(parent, { requestId }) {
  try {
    console.log("approveQuoteRequest start");
    console.log("requestId: ", requestId);
    const result = await db.collection('quoterequests').updateOne(
      { id: requestId },
      { $set: { status: 1 } }
    );
    if (result.matchedCount === 0) {
      throw new Error(`QuoteRequest with ID ${requestId} not found`);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// createService(professionalId: Int!, service: InputService!):Service!
// createReview(serviceId: ID!, review: InputReview!):Review!
// updateProfessional(professionalId: Int!, professional: UpdateProfessional!):Boolean!
// deleteUser(userID: Int!):Boolean!
// deleteService(professionalId: Int!, serviceId: ID!):Boolean!

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    console.log(value)
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const GraphQLTime = new GraphQLScalarType({
  name: 'GraphQLTime',
  description: 'A Time() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const timeValue = new Date(`1970-01-01T${value}Z`);
    return isNaN(timeValue) ? undefined : timeValue;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const timeValue = new Date(`1970-01-01T${ast.value}Z`);
      return isNaN(timeValue) ? undefined : timeValue;
    }
  },
});

const resolvers = {
  Query: {
    authenticate,
    getUserID,
    getUserInfoById,
    getUserInformation,
    getAllServices,
    getAllAvailableServices,
    getServicesByCategory,
    getServicesByUser,
    getServicesById,
  },
  Mutation: {
    registerUser,
    registerProfessional,
    createQuoteRequest,
    // createService,
    // createReview,
    updateUser,
    updateUserProfileImage,
    updateTransactionStatusOfService,
    approveQuoteRequest,
    // updateProfessional,
    // deleteUser,
    // deleteService,
  },
  Service: {
    imageBase64(parent) {
      const imageBuffer = Buffer.from(parent.imageBase64, 'base64');
      const mimeType = 'image/jpeg'; // You can use a library like 'file-type' to automatically detect the mimeType from the imageBuffer

      // Return the image as a data URL
      return `data:${mimeType};base64,${parent.imageBase64}`;
    },
  },
  GraphQLDate,
  GraphQLTime,
};

const app = express();
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./schema/hirefixschema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});
server.applyMiddleware({ app, path: '/graphql' });

async function connectToDb() {
  const url = 'mongodb://localhost/hirefix';
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to HireFix DB at', url);
  db = client.db();
}

(async function () {
  try {
    await connectToDb();
    app.listen(8000, function () {
      console.log('App started on port 8000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
