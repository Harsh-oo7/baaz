# baaz

## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

### Install the Dependencies

Next, from the project folder, install the dependencies:

    npm i

### Set Environment variable

Create one .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. 

```dosini
PORT = your_port_number
MONGO_CONNECTION_URL = your_mongodb_url
```

### Start the Server

    node index.js

This will launch the Node server on port 5000. If that port is busy, you can set a different point in .env file.


### Postman collection

You can import postman api collection using above mention collection. File name is "Baaz.postman_collection".


### APIs

1) /sign-in
-> You can sign-in using username and password.

2) /sign-up
-> You can sign-up using username, email, password, name, logo(in base64).

3) /user-info
-> You can get user's information by providing username.

 