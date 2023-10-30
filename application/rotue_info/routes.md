# User Routes
- Add, Remove, and Modify Users and User data. Signin and Login

## Signup User
  Creates a user based on information from body. Friends List is initialized to empty. Default-Location is set to coordinates or [0,0] if not provided. <span style="color:red">Longitude must range from -180 to 180, and Latitude must range from -90 to 90. Coordinates has longitude first and then latitude</span>
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/api/user/signup/</span>
- **Body**: <span style="color:lightgreen">Coordinates default to [0,0] if not provided </span>
    ```json
    {
        "email" : "eamil@gmail.com",
        "password": "pass",
        "username" : "joe",    
        "coordinates" : [179,-89]
    }
    ```
- **Response**:
    - **Status 200**: 
      ```json
      {
          "message": "User Created",
          {
            "_id": "653ddc431694115a0df725e3",
            "email": "user@gmail.com",
            "password": "$2b$10$...",
            "username": "joe",
            "defaultLocationId": "653ddc431694115a0df725e0",
            "friendListId": "653ddc431694115a0df725e1",
            "__v": 0
          }
      }
      ```
    - **Status 409**:
      ```json
      {
          "message": "Email Already exists"
      }
      ```

## Login User
Requires a username, email, and password to login. <span style="color:red">Google Login Not Setup</span>
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
      }
      ```
    - **Status 500**:
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

## Get List of Users
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
              "defaultLocationId" : "653cbc1bb172a8cf95067f92",
              "friendListId" : "653cbc1bb172a8cf95067f90",
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
UserId provided in URL has default location updated with the coordinates in the body. Note if a default location already exists it will be OVERIDEN. <span style="color:red">Longitude must be between -180 and 180, and Latitude must be between -90 and 90. Coordinates has longitude first and then latitude</span>
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/default-location/:userId</span>
- **Body**:
    ```json
    {
        "coordinates": [179, 89]
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

# Friend Routes
- Add and Remove friends from friend list. Display friend list
  
## Get Friend List 
Returns user's friend list. User id is sent in URL.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/user/friend/:userId</span>
- **Body**:
- **Response**:
    - **Status 202**:
      ```json
        {
          "friendList": {
          "_id": "653e15ef9459c162a1b39282",
          "friends": [
            "653ddc431694115a0df725e3",
            "653e1ab29459c162a1b392a1"
          ],
          "createdAt": "2023-10-29T08:21:03.623Z",
          "updatedAt": "2023-10-29T08:21:03.623Z",
          "userId": "653e15ef9459c162a1b39284",
          "__v": 2
          }
        }
      ```
    - **Status 500**:
  
## Add Friend 
  Adds one friend to the user's friend list. User id is sent in URL, friend is sent in body.
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
          "message": "Friend Added",
          "friendList": {
          "_id": "653e15ef9459c162a1b39282",
          "friends": [
            "653ddc431694115a0df725e3",
            "653e1ab29459c162a1b392a1"
          ],
          "createdAt": "2023-10-29T08:21:03.623Z",
          "updatedAt": "2023-10-29T08:21:03.623Z",
          "userId": "653e15ef9459c162a1b39284",
          "__v": 2
          }
      }
      ```
    - **Status 500**:
      ```json
      {
          "message": "Error adding to friends list"
      }
      ```

## Delete Friend (NOT WORKING)
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
      ```json
      {
        "message" : "Error removing from friends list"
      }
      ```

