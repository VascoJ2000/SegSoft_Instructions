# 70140_70481 Software Security Project Guide

Client can be found [here](https://vascoj2000.github.io/SegSoft_Instructions/)

## Working with the Server

Make sure the server is not sleeping by using this [link](https://segsoft-server.onrender.com/).
Once it shows "Server active! Pls use a client to connect" it should be good to go for 50 mins.

### 0. Endpoints

#### 0.1 /api/auth/register

***Request***
```
POST https://segsoft-server.onrender.com/api/auth/register
content-type: application/json

{
    "username": "User",
    "password": "123456789"
}
```

#### 0.2 /Oauth/register

***Request***
```
POST https://segsoft-server.onrender.com/Oauth/register
content-type: application/json

{
    "name": "YOUR_CLIENT_ID",
    "secret": "YOUR_SECRET",
    "redirectUri": "YOUR_REDIRECT_LINK"
}
```

#### 0.3 /Oauth/authorize

***Request***
```
https://segsoft-server.onrender.com?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scope)}&state=${state}
```

Where:
* responseType = code 
* clientID = whatever clientID you registered with
* scope = default
* state = code to make sure there were no csrf attacks

You shouldn't use fetch here, send user directly to link.

You will receive back a: redirectUri?code=CODE&state=STATE

* redirectUri is your URL
* code is the authorization code
* state can be ignore, it is a check for csrf attacks

Which then u can use on the next step

#### 0.4 /Oauth/token

***Request***
```
POST https://segsoft-server.onrender.com/Oauth/token
content-type: application/json

{
  "grant_type": 'authorization_code',
  "code": CODE_RECEIVED,
  "client_id": clientId,
}
```

* grant_type should be authorization_code
* code is the code you just received
* client_id is your client id (again, just to confirm nothing weird is happening)

This will return you the token in a json file as "token".

### 1. Register you Client

#### 1.1 OPTIONAL - Register an account (just username and password)

Register a user and password using the /api/auth/register endpoint.
Can also just use default user.

### 2. Authorize and Login

Ask for authorization code and login using the /Oauth/authorize endpoint

This will give you a form to perform login which then will finally give the code back

### 3. Authenticate and receive back token

Using the code just received, send it to the endpoint /Oauth/token to finally receive the token

## Working with the client

### 1. Authorize and Login

Click one of the Oauth buttons and insert the user credentials

* Our server
* 70665-70715 server

### 2. Register

Allows to register a new user (only on our server).

### 3. Results

After login users can see authorization code and token in the bottom of the page
