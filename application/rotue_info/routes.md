# User Routes

## Signup User
  Creates a user based on information from body. Friends List is initialized to empty. Default-Location is set to coordinates or [0,0] if not provided. <span style="color:red">Longitude must range from -180 to 180, and Latitude must range from -90 to 90. Otherwise an error occurs</span>
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/api/user/signup/</span>
- **Body**: <span style="color:lightgreen">Coordinates default to [0,0] if not provided </span>
    ```json
    {
        "email" : "eamil@gmail.com",
        "password": "pass",
        "username" : "joe",    
        "coordinates" : [12,52]
    }
    ```
- **Response**:
    - **Status 200**: 
      ```json
      {
          "message": "User Created"
      }
      ```
    - **Status 409**:
      ```json
      {
          "message": "Email Already exists"
      }
      ```

## Login User (NOT WORKING)
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/api/user/login</span>
- **Body**:
    ```json
    {
        "email": "dummy@gmail.com",
        "password": "1234"
    }
    ```
- **Response**:
    - **Status 200**:
      ```json
      {
        "message": "Auth Successful",
        "token": "yJhbGciOiJIUzI1N..."
      }
      ```
    - **Status 401**:
      ```json
      {
          "message": "Auth Failed"
      }
      ```

## Delete User
Deletes the user that is provided in the URL. Friends List, Default-location, and all other objects related to user are also deleted.
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">/api/user/:userId</span>
- **Body**: 
    ```json
      {
          "userId" : "653a14848e46a1fdc2caf8e2"
      }
    ```
- **Response**:
    - **Status 200**: 
      ```json
      {
          "message": "User deleted"
      }
      ```
    - **Status 500**:
      ```json
      {
          "message": "User not found"
      }
      ```

## Get User Info 
Returns the user that is provided in the URL.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/user/:userId</span>
- **Body**: 
    ```json
      {
          "userId" : "653a14848e46a1fdc2caf8e2"
      }
    ```
- **Response**:
    - **Status 200**:
      ```json
        {
            "id": "6526405977a7ac5811437f87",
            "email": "dummy@gmail.com",
            "name": "John Doe",
            "password": "pass",
            ...
        }
      ```
    - **Status 500**:

## Get User List
Provides a list of ALL USERS in the database. Can be used to search for friends. 
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/user-list</span>
- **Body**: None
- **Response**:
    - **Status 200**:
      ```json
      [
          {
              "id": "6526405977a7ac5811437f87",
              "email": "dummy@gmail.com",
              "name": "John Doe",
              "password": "pass",
              "default-location" : "653cbc1bb172a8cf95067f92",
              "friendList" : "653cbc1bb172a8cf95067f90",
          },
          {
              "id": "6526405977a7ac5811437f87",
              "email": "dummy@gmail.com",
              "name": "John Doe",
              "password": "pass",
              ...
          },
          ...
      ]
      ```
    - **Status 500**:

## Get User Default Location 
Responds with the deafult location of the user provided in the URL
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/user/default-location/:userId</span>
- **Body** 
- **Response**:
    - **Status 200**:
      ```json
      {
          "defaultLocation": {
              "_id": "653a14848e46a1fdc2caf8e2",
              "coordinates": [55.445, 67.891],
              "__v": 0
          }
      }
      ```
    - **Status 404**:
      ```json
      {
          "message": "User not found"
      }
      ```
    - **Status 500**:
      ```json
      {
          "error": "error.message"
      }
      ```

## Add or Update User Default Location
UserId provided in URL has default location updated with the coordinates in the body. Note if a default location already exists it will be OVERIDEN. <span style="color:red">Longitude must be between -180 and 180, and Latitude must be between -90 and 90.</span>
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/default-location/:userId</span>
- **Body**:
    ```json
    {
        "coordinates": [12.345, 67.891]
    }
    ```
- **Response**:
    - **Status 201**:
      ```json
      {
          "message": "Default location set successfully"
      }
      ```
    - **Status 500**:
      ```json
      {
          "error": "Error saving default location"
      }
      ``
      
## Add Friend (NOT WORKING)
  Adds one friend to the user's friend list. User is sent in URL, friend is sent in body.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/friend/:userId</span>
- **Body**:
    ```json
    {
        "friendId" : "653cb96bb172a8cf95067f6e"
    }
    ```
- **Response**:
    - **Status 201**:
      ```json
      {
          "message": "Friend Added"
      }
      ```
    - **Status 500**:

## Remove Friend (NOT WORKING)
Removes one friend from the use's friend list. User is sent in URL, friend is sent in body.
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">/user/friend/:userId</span>
- **Body**:
    ```json
    {
        "friendId" : "653cb96bb172a8cf95067f6e"
    }
    ```
- **Response**:
    - **Status 202**:
      ```json
      {
          "message": "Friend Deleted"
      }
      ```
    - **Status 500**:

## Return Friend List (NOT WORKING)
Returns user's friend list.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/user/friend/:userId</span>
- **Body**:
- **Response**:
    - **Status 202**:
      ```json
        {
        "_id": "653cbc1bb172a8cf95067f90",
        "friends": [],
        "userId": "653cbc1bb172a8cf95067f92",
        "__v": 0
        }
      ```
    - **Status 500**: