Welcome to Auth_Service

Project Setup

Clone the project on your local Execute npm install on the same path as of your root directory of teh downloaded project Create a .env file in the root directory and add the following environment variable ```PORT=3001```  , ```JWT_KEY = Auth```. Inside the src/config folder create a new file config.json and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "AUTH_SERVICE_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
Once you've added your db config as listed above, go to the src folder from your terminal and execute 
```npx sequelize db:create``` and then execute ```npx sequelize db:migrate```

### TABLES

USER Table
 id , email, password, createdAt, updatedAt
```npx sequelize model:generate --name User --attributes email:String,password:String```

