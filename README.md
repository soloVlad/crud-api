## Installation
Ensure that you have node version >= 20
```bash
node -v
```
Install packages
```bash
npm install
```

## Running
Set environment variables.  
You can just run the following command
```bash
mv .env.example .env
```  
And change the value of `PORT` in `.env` or just keep the default.

Run the server
```bash
npm run start:dev # Starts the application in dev mode
npm run start:prod # Starts the application in prod mode
```

## Usage

To send request use some tool like Postman.

Choose method `GET`  
Request example: `localhost:4001/api/users/`  
(If PORT is set to 4001)

**Routes:**
  - `GET api/users`      
      Get the list of all users (empty by default);
  - `GET api/users/{userId}`  
      Get user by userId. You should send request to `localhost:4001/api/users/{userId}` where userId is the id of existing user(you should add some user and get its id from response in POST request or in GET All). If userId is not of type UUID you will get an error. If userId is UUID but there is no user with the given ID you will get an error.
  - `POST api/users`  
      Creates a user. You should provide valid userInfo in request body. At the begging set request body type to JSON, then print something like
      ```json
        {
          "username": "someName",
          "age": 20,
          "hobbies": ["Hobby1", "Hobby2"]
        }
      ```
  - `PUT api/users/{userID}`  
      UserId requirements specified in GET by userId section above. The structure of request should be as described in POST request above.
  - `DELETE api/users/{userID}`  
      UserId requirements specified in GET by userId section above.