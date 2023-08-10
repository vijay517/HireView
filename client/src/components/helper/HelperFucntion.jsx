import GLOBAL_VARIABLES from '../globalVariables';

const server_url = GLOBAL_VARIABLES["graph-ql"];
const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
}

export　async function getUserID(email) {
    try {
        const query = `query getUserID($email: String!){
            getUserID(email: $email)
          }`;

        const result = await graphQLFetch(query, { email });
        console.log("Resposen from GQL server: ", { result });

        return result.getUserID;
    } catch (e) {
        alert(`Error in booking the traveller : ${e.message}`);
    }
}

export　async function getUserInfoById(userId) {
    try{
        const query = `query getUserInfoById($userId: Int!){
            getUserInfoById(userId: $userId){
              firstName lastName profilepic postalcode address phone email
            }
          }`;
        const result = await graphQLFetch(query, { userId });
        const userinfo = result.getUserInfoById;
        console.log("getUserInfoById Resposen from GQL server: ", {result});
        return userinfo;
      } catch (e) {
        alert(`Error in gettting user name by id : ${e.message}`);
      }
}

export　async function getServicesByUser(userId){
    try{
        const query = `query getServicesByUser($userId: Int!){
            getServicesByUser(userId: $userId){
              transaction_id professional_id imageBase64 name description category lowerrange upperrange finalprice scheduled_time reservation_ids review_ids
            }
          }`;
        const result = await graphQLFetch(query, { userId });
        const services = result.getServicesByUser;
        console.log("getServicesByUser Response from GQL server: ", {services});
        return services;
      } catch (e) {
        alert(`Error in services by user id: ${e.message}`);
      }
}

export　async function getAllAvailableServices(){
  try{
      const query = `query getAllAvailableServices{
        getAllAvailableServices{
            id transaction_id professional_id imageBase64 name description category lowerrange upperrange finalprice scheduled_time reservation_ids review_ids
          }
        }`;
      const result = await graphQLFetch(query);
      const services = result.getAllAvailableServices;
      console.log("getAllAvailableServices Response from GQL server: ", {services});
      return services;
    } catch (e) {
      alert(`Error in getting available services: ${e.message}`);
    }
}

export　async function registerUser(user) {
  try{
      const query = `mutation registerUser($user: InputUser!) { registerUser(user: $user)
          { id firstName lastName postalcode address email phone } }`;
      const result = await graphQLFetch(query, { user });
      const userinfo = result.registerUser;
      console.log("getUserInfoById Resposen from GQL server: ", {result});
      return userinfo;
    } catch (e) {
      alert(`Error in signing up a user : ${e.message}`);
    }
}

export　async function createQuoteRequest(inputRequest) {
try{
    const query = `mutation createQuoteRequest($inputRequest: InputRequest!){
      createQuoteRequest(inputRequest: $inputRequest){
        id user_id service_id status explanation service_time
      }
    }`;
    inputRequest.status = 0; // Newly created(0)
    const result = await graphQLFetch(query, { inputRequest });
    const createdQuoteRequest = result.createQuoteRequest;
    console.log("createQuoteRequest Resposen from GQL server: ", createdQuoteRequest);
    return createdQuoteRequest;
  } catch (e) {
    alert(`Error in creating quote request : ${e.message}`);
  }
}

export　async function updateUser(user) {
  try{
    console.log(user);
    const query = `mutation updateUser($user: UpdateUser!){
      updateUser(user: $user)
      }`;
    const result = await graphQLFetch(query, { user });
    return result;
    } catch (e) {
      alert(`Error in updating user : ${e.message}`);
    }
}

export　async function updateUserProfileImage(userid, profilePic) {
try{
  console.log("updateUserProfileImage start");
  const base64ImgString = profilePic.toString('base64');
  const updateInfo = {
    id: userid,
    profilePic: base64ImgString,
  };
  const query = `mutation updateUserProfileImage($updateInfo: UpdateProfile!) {
    updateUserProfileImage(updateInfo: $updateInfo)
  }`;
  const response = await graphQLFetch(query, { updateInfo });
  const result = response.updateUserProfileImage;
  if(!result){
    console.log("Update Profile Image failed");
  }

  } catch (error) {
    console.log(error);
  }
}

export　async function setServiceInProgress(updateStatus) {
  try{
    console.log(updateStatus);
    const query = `mutation updateTransactionStatusOfService($updateStatus: UpdateService!){
      updateTransactionStatusOfService(updateStatus: $updateStatus)
    }`;
    const result = await graphQLFetch(query, { updateStatus });
    return result;
    } catch (e) {
      alert(`Error in updating the status of a service : ${e.message}`);
    }
}

export async function approveQuoteRequest(requestId){
  try{
    console.log("approveQuoteRequest start from HelperFunction.jsx");
    const query = `mutation approveQuoteRequest($requestId: Int!){
      approveQuoteRequest(requestId: $requestId)
    }`;
    const response = await graphQLFetch(query, { requestId });
    const isApprovedReq = response.approveQuoteRequest;
    return isApprovedReq;
    } catch (error) {
      console.log(error);
    }
}

export async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch(server_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
        });
        const body = await response.text();
        const result = JSON.parse(body, jsonDateReviver);

        if (result.errors) {
            const error = result.errors[0];
            alert(result.errors[0]);
            if (error.extensions.code === 'BAD_USER_INPUT') {
                alert(`${error.message}`);
            } else {
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result.data;
    } catch (e) {
        console.log(`Error in sending data to server: ${e.message}`);
    }
}
