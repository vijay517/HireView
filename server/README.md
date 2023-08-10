# Steps to install MongoDB in your local laptop environment (for MAC OS)
```bash
  brew tap mongodb/brew
  brew update
  brew install mongodb-community@4.4
  brew services start mongodb-community@4.4
  echo 'export PATH="/opt/homebrew/opt/mongodb-community@4.4/bin:$PATH"' >> ~/.zshrc
  source ~/.zshrc
  mongo hirefix scripts/init.mongo.js
```

# Instructions to start the server using automation script

 - you can run the automation bash script start_client.sh to start the client
 - you can run using the following commands: 
 
 ```bash
    chmod +x start_server.sh # making bash script exeutable
    ./start_server.sh 
 ```

# Instructions to start the client manually

  - if you any errors while running the bash script, you can manually start by the client by running the following commands

  ``` bash
    systemctl start mongod

    mongo hirefix scripts/init.mongo.js;

    npm install

    npm start
  ```

# Graph API Test Sample (Correctly Working in the back-end side)
----------------------------------------------- 
**QUERY**
query authenticate($loginInfo: InputLogin!) {
  authenticate(loginInfo: $loginInfo). 
}

**VARIABLES**. 
{ "loginInfo":
  {
    "email": "john@example.com",
    "password":"password"
  }
}
 
**RESPONSE**
{
  "data": {
    "authenticate": true
  }
}

-----------------------------------------------  
**QUERY**. 
query getUserID($email: String!){
      getUserID(email: $email)
}

**VARIABLES**
{
  "email": "john@example.com"
}

**RESPONSE**
{
  "data": {
    "getUserID": "1"
  }
}

-----------------------------------------------  
**QUERY**. 
query getUserInfoById($userId: Int!){
  getUserInfoById(userId: $userId){
    firstName lastName
  }
}

**VARIABLES**
{
  "userId": 2
}

**RESPONSE**
{
  "data": {
    "getUserInformation": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}

-----------------------------------------------  

**QUERY**. 
query getUserInformation($email: String!){
  getUserInformation(email: $email) {
    id firstName lastName
  }
}

**VARIABLES**
{
  "email": "john@example.com"
}

**RESPONSE**
{
  "data": {
    "getUserInformation": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}

-----------------------------------------------  

**QUERY**. 
query getAllServices{
  getAllServices {
    id professional_id name description status
  }
}

**RESPONSE**
{
  "data": {
    "getAllServices": [
      {
        "id": 1,
        "professional_id": 1,
        "name": "Electrical Installation",
        "description": "Install electrical wiring and outlets",
        "status": true. 
      },
      {
        "id": 2,
        "professional_id": 1,
        "name": "Toilet Repair",
        "description": "Repair clogged toilets",
        "status": true. 
      },
      {. 
        "id": 3,
        "professional_id": 2,
        "name": "Aircon Cleaning",
        "description": "Aircon Cleaning",
        "status": true. 
      },
      {. 
        "id": 4,
        "professional_id": 2,
        "name": "Window Replacement",
        "description": "Window Replacement",
        "status": true. 
      }
    ]
  }
}

-----------------------------------------------

**QUERY**
query getServicesByCategory($category: String!){
  getServicesByCategory(category: $category){
    id professional_id name description status category
  }
}

**VARIABLES**
{
  "category": "Electrical Works"
}

**RESPONSE**
{
  "data": {
    "getServicesByCategory": [
      {
        "id": 1,
        "professional_id": 1,
        "name": "Electrical Installation",
        "description": "Install electrical wiring and outlets",
        "status": true,
        "category": "Electrical Works". 
      }
    ]
  }
}

-----------------------------------------------

**QUERY**
query getServicesByUser($userId: Int!){
  getServicesByUser(userId: $userId){
    transaction_id professional_id imageBase64 name description category lowerrange upperrange finalprice scheduled_time reservation_ids review_ids
  }
}

**VARIABLES**
{
  "userId": 2
}

**RESPONSE**
{
  "data": {
    "getServicesByUser": [
      {
        "transaction_id": 1,
        "professional_id": 1,
        "imageBase64": "data:image/jpeg;base64,[base64-encoded-string]",
        "name": "Electrical Installation part1",
        "description": "Install electrical wiring and outlets part1",
        "category": "Electrical Works",
        "lowerrange": 20,
        "upperrange": 50,
        "finalprice": null,
        "scheduled_time": "16 Mar 2023, 1000hrs - 1300hrs",
        "reservation_ids": [
          "617b78b5fc3b3f1c52e17d6a"
        ],
        "review_ids": [
          "617b78b5fc3b3f1c52e17d6b",
          "617b78bc036e8e97c1d364f4",
          "617b78bc036e8e97c1d36888"
        ]
      },
      {
        "transaction_id": 1,
        "professional_id": 1,
        "imageBase64": "data:image/jpeg;base64,[base64-encoded-string]",
        "name": "Aircon Cleaning part2",
        "description": "Cleaning Air Conditioner",
        "category": "Aircon Service",
        "lowerrange": 30,
        "upperrange": 60,
        "finalprice": null,
        "scheduled_time": "16 Mar 2023, 1100hrs - 1400hrs",
        "reservation_ids": [
          "617b78b5fc3b3f1c52e17d6a"
        ],
        "review_ids": [
          "617b78b5fc3b3f1c52e17d6b",
          "617b78bc036e8e97c1d364f4",
          "617b78bc036e8e97c1d36888"
        ]
      },
      {
        "transaction_id": 1,
        "professional_id": 1,
        "imageBase64": "data:image/jpeg;base64,[base64-encoded-string]",
        "name": "Window Replacement",
        "description": "Window Replacement",
        "category": "Window Servicing",
        "lowerrange": 40,
        "upperrange": 80,
        "finalprice": null,
        "scheduled_time": "16 Mar 2023, 1200hrs - 1500hrs",
        "reservation_ids": [
          "617b78b5fc3b3f1c52e17d6a"
        ],
        "review_ids": [
          "617b78b5fc3b3f1c52e17d6b",
          "617b78bc036e8e97c1d364f4",
          "617b78bc036e8e97c1d36888"
        ]
      },
      {
        "transaction_id": 2,
        "professional_id": 1,
        "imageBase64": "data:image/jpeg;base64,[base64-encoded-string]",
        "name": "Electrical Installation completion part1",
        "description": "Install electrical wiring and outlets completion part1",
        "category": "Electrical Works",
        "lowerrange": 30,
        "upperrange": 60,
        "finalprice": 50,
        "scheduled_time": "16 Mar 2023, 1100hrs - 1400hrs",
        "reservation_ids": [
          "617b78b5fc3b3f1c52e17d6a"
        ],
        "review_ids": [
          "617b78b5fc3b3f1c52e17d6b",
          "617b78bc036e8e97c1d364f4",
          "617b78bc036e8e97c1d36888"
        ]
      },
      {
        "transaction_id": 2,
        "professional_id": 1,
        "imageBase64": "data:image/jpeg;base64,[base64-encoded-string]",
        "name": "Aircon Cleaning completion",
        "description": "Cleaning Air Conditioner",
        "category": "Aircon Service",
        "lowerrange": 30,
        "upperrange": 60,
        "finalprice": 55,
        "scheduled_time": "16 Mar 2023, 1100hrs - 1400hrs",
        "reservation_ids": [
          "617b78b5fc3b3f1c52e17d6a"
        ],
        "review_ids": [
          "617b78b5fc3b3f1c52e17d6b",
          "617b78bc036e8e97c1d364f4",
          "617b78bc036e8e97c1d36888"
        ]
      },
      {
        "transaction_id": 2,
        "professional_id": 1,
        "imageBase64": "data:image/jpeg;base64,[base64-encoded-string]",
        "name": "Window Replacement",
        "description": "Window Replacement",
        "category": "Window Servicing",
        "lowerrange": 30,
        "upperrange": 60,
        "finalprice": 65,
        "scheduled_time": "16 Mar 2023, 1100hrs - 1400hrs",
        "reservation_ids": [
          "617b78b5fc3b3f1c52e17d6a"
        ],
        "review_ids": [
          "617b78b5fc3b3f1c52e17d6b",
          "617b78bc036e8e97c1d364f4",
          "617b78bc036e8e97c1d36888"
        ]
      },
      {
        "transaction_id": 3,
        "professional_id": 1,
        "imageBase64": "data:image/jpeg;base64,[base64-encoded-string]",
        "name": "Electrical Installation completion part1",
        "description": "Install electrical wiring and outlets completion part1",
        "category": "Electrical Works",
        "lowerrange": 30,
        "upperrange": 60,
        "finalprice": 50,
        "scheduled_time": "16 Mar 2023, 1100hrs - 1400hrs",
        "reservation_ids": [
          "617b78b5fc3b3f1c52e17d6a"
        ],
        "review_ids": [
          "617b78b5fc3b3f1c52e17d6b",
          "617b78bc036e8e97c1d364f4",
          "617b78bc036e8e97c1d36888"
        ]
      },
      {
        "transaction_id": 3,
        "professional_id": 1,
        "imageBase64": "data:image/jpeg;base64,[base64-encoded-string]",
        "name": "Aircon Cleaning completion",
        "description": "Cleaning Air Conditioner",
        "category": "Aircon Service",
        "lowerrange": 30,
        "upperrange": 60,
        "finalprice": 55,
        "scheduled_time": "16 Mar 2023, 1100hrs - 1400hrs",
        "reservation_ids": [
          "617b78b5fc3b3f1c52e17d6a"
        ],
        "review_ids": [
          "617b78b5fc3b3f1c52e17d6b",
          "617b78bc036e8e97c1d364f4",
          "617b78bc036e8e97c1d36888"
        ]
      },
      {
        "transaction_id": 3,
        "professional_id": 1,
        "imageBase64": "data:image/jpeg;base64,[base64-encoded-string]",
        "name": "Window Replacement",
        "description": "Window Replacement",
        "category": "Window Servicing",
        "lowerrange": 30,
        "upperrange": 60,
        "finalprice": 65,
        "scheduled_time": "16 Mar 2023, 1100hrs - 1400hrs",
        "reservation_ids": [
          "617b78b5fc3b3f1c52e17d6a"
        ],
        "review_ids": [
          "617b78b5fc3b3f1c52e17d6b",
          "617b78bc036e8e97c1d364f4",
          "617b78bc036e8e97c1d36888"
        ]
      }
    ]
  }
}

-----------------------------------------------

**QUERY**
query getServicesById($professionalId: Int!){
  getServicesById(professionalId: $professionalId){
    id professional_id name description status category
  }
}

**VARIABLES**
{
  "professionalId":2
}

**RESPONSE**
{
  "data": {
    "getServicesById": [
      {
        "id": 3,
        "professional_id": 2,
        "name": "Aircon Cleaning",
        "description": "Aircon Cleaning",
        "status": true,
        "category": "Aircon Servicing"
      },
      {
        "id": 4,
        "professional_id": 2,
        "name": "Window Replacement",
        "description": "Window Replacement",
        "status": true,
        "category": "Window Servicing"
      }
    ]
  }
}

-----------------------------------------------

**QUERY**
mutation registerUser($user: InputUser!){
  registerUser(user: $user){
    id firstName lastName postalcode address email phone 
  }
}

**VARIABLES**
{
  "user": 
  {
    "firstName": "Taro",
    "lastName": "Yamada",
    "postalcode": 484444,
    "address":"Katong",
    "email":"test@test.gmail.com",
    "phone":12345678,
    "password":"test"
  }
}

**RESPONSE**
{
  "data": {
    "registerUser": {
      "id": 3,
      "firstName": "Taro",
      "lastName": "Yamada",
      "postalcode": 484444,
      "address": "Katong",
      "email": "test@test.gmail.com",
      "phone": 12345678
    }
  }
}

-----------------------------------------------

**QUERY**
mutation registerProfessional($user: InputProfessional!){
  registerProfessional(user: $user){
    id user_id company_id skill_ids service_ids    
  }
}

**VARIABLES**
{
  "user": {
    "firstName": "essional",
    "lastName": "Prof",
    "postalcode": 999999,
    "address":"Katong",
    "email":"professional@test.com",
    "phone":46494946,
    "password":"test",
    "companyName": "Well Being Forever",
    "companyEmail": "clementi-my-home.com",
    "companyLocation": "Clementi",
    "websiteUrl": "http://test-987654.com",
    "skillName": "Electronic Engineering",
    "license": "NUS graduate certification",
    "yearsOfExperience": 10
  }
}

**RESPONSE**
{
  "data": {
    "registerProfessional": {
      "id": 4,
      "user_id": 4,
      "company_id": "64253ee67b9f8967b6990e58",
      "skill_ids": [
        "64253ee67b9f8967b6990e59"
      ],
      "service_ids": []
    }
  }
}

-----------------------------------------------

**QUERY**
mutation createQuoteRequest($inputRequest: InputRequest!){
  createQuoteRequest(inputRequest: $inputRequest){
    id user_id service_id status explanation service_time
  }
}

**VARIABLES**
{"inputRequest": {
  "user_id": 2,
  "service_id": 2,
  "status":  0,
  "explanation": "The plumbing has been broken",
  "service_time": "2023-05-10"
}}

**RESPONSE**
{
  "data": {
    "createQuoteRequest": {
      "id": 15,
      "user_id": 2,
      "service_id": 2,
      "status": 0,
      "explanation": "The plumbing has been broken",
      "service_time": "2023-05-10"
    }
  }
}

-----------------------------------------------

**QUERY**
mutation updateTransactionStatusOfService($updateStatus: UpdateService!){
  updateTransactionStatusOfService(updateStatus: $updateStatus)
}

**VARIABLES**
{"updateStatus": 
  {
    "id": 2,
  	"transaction_id": 1,
    "user_id": 2
  }
}

**RESPONSE**
{
  "data": {
    "updateTransactionStatusOfService": true
  }
}

-----------------------------------------------

**QUERY**
mutation approveQuoteRequest($requestId: Int!){
  approveQuoteRequest(requestId: $requestId)
}

**VARIABLES**
{"requestId": 1}

**RESPONSE**
{
  "data": {
    "approveQuoteRequest": true
  }
}

-----------------------------------------------

**QUERY**

**VARIABLES**

**RESPONSE**

-----------------------------------------------

**QUERY**

**VARIABLES**

**RESPONSE**

-----------------------------------------------
