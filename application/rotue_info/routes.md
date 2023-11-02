# Signin and Signup


## Signup User (Broken)
  Creates a user based on information from body. Email is unique Friends List is initialized to empty. Default-Location is set to coordinates or [0,0] if not provided. <span style="color:red">Longitude must range from -180 to 180, and Latitude must range from -90 to 90. Coordinates has longitude first and then latitude</span>
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/api/signup/</span>
- **Body**: <span style="color:lightgreen">Coordinates default to [0,0] if not provided </span>
    ```json
    {
        "email" : "email@gmail.com",
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

## Signin User (Not working with Frontend)
Requires a username, email, and password to signin. <span style="color:red">Google Signin Not Setup</span>
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/api/signin</span>
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
&nbsp;
# User Routes
  Add, Remove, and Modify Users and User data. Signin and Login
## Delete User
Deletes the user that is provided in the URL. Friends List, Default-location, and all other objects related to user are also deleted.
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">/api/user/:userId</span>
- **Body**: 

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
              "_id": "6540a5a90d8577911fe78fae",
              "email": "eamil7@gmail.com",
              "password": "$2b$10$h...",
              "username": "joe5",
              "defaultLocationId": "6540a5a90d8577911fe78fab",
              "friendListId": "6540a5a90d8577911fe78fac",
              "meetings": [],
              "createdAt": "2023-10-31T06:58:49.564Z",
              "updatedAt": "2023-10-31T06:58:49.564Z",
              "__v": 0
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
&nbsp;
# Friend Routes
Add and Remove friends from friend list. Display friend list
  
## Get User's Friend List 
Returns user's friend list. User id is sent in URL.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/user/friend-list/:userId</span>
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
  
## Get Friend Requests 
Returns user's friend list. User id is sent in URL. 
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/user/friend-requests/:userId</span>
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

## Send Friend Request (Working but Needs Testing) ADD NOTIFICATION
Send a friend request from a user to a recipient. Message can be read by friend when friend request is recieved. After friend request is sent, it will be added to user's outging-requests, and recievers incoming-requests (friend request object).
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/send-friend-request/:userId</span>
- **Body**:
  ```json
    {
      "recipientId" : "65431d26f82ab63467719b94",
      "message" : "will you be my friend?"
    }
  ```
- **Response**:
    - **Status 202**:
      ```json
        {
        "message": "Friend Requests Sent",
        "userFriendRequests": {
          "_id": "6543516d6fba2bbb82382d71",
          "incomingRequests": [],
          "outgoingRequests": [
            {
                "recipientId": "654351646fba2bbb82382d64",
                "message": "hello",
                "_id": "654351ef6fba2bbb82382d87",
                "createdAt": "2023-11-02T07:38:23.716Z"
            }
          ],
          "isFresh": true,
          "createdAt": "2023-11-02T07:36:13.278Z",
          "updatedAt": "2023-11-02T07:38:23.717Z",
          "userId": "6543516d6fba2bbb82382d73",
          "__v": 0
        },
        "proposedFriendRequests": {
          "_id": "654351646fba2bbb82382d62",
          "incomingRequests": [
            {
                "senderId": "6543516d6fba2bbb82382d73",
                "message": "hello",
                "_id": "654351ef6fba2bbb82382d88",
                "createdAt": "2023-11-02T07:38:23.718Z"
            }
          ],
          "outgoingRequests": [],
          "isFresh": true,
          "createdAt": "2023-11-02T07:36:04.162Z",
          "updatedAt": "2023-11-02T07:38:23.718Z",
          "userId": "654351646fba2bbb82382d64",
          "__v": 0
          }
        }
      ```
    - **Status 500**:
  
## Accept Friend Request (Working but Needs Testing) ADD NOTIFICATION
IMPORTANT README: User accepts the sender's friend request. This endpoint removes the friend request from both the users incoming request list, and from the senders outgoing request list. The endpoint also adds both the user and sender to each other's friend list.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/accept-friend-requests/:userId</span>
- **Body**:
    ```json
      {
        "senderId" : "654351646fba2bbb82382d62"
      }
    ```
- **Response**:
    - **Status 202**:
      ```json
        NEEDS JSON RESPONSE!!!!!!
      ```
    - **Status 500**:

## Reject Friend Request (Not Working) ADD NOTIFICATION
IMPORTANT README: User accepts the sender's friend request. This endpoint removes the friend request from both the users incoming request list, and from the senders outgoing request list. The endpoint also adds both the user and sender to each other's friend list.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/accept-friend-requests/:userId</span>
- **Body**:
    ```json
      {
        "senderId" : "654351646fba2bbb82382d62"
      }
    ```
- **Response**:
    - **Status 202**:
      ```json
        NEEDS JSON RESPONSE!!!!!!
      ```
    - **Status 500**:

## Add Friends (Dev Route) 
Add user A to user B's friend list. Then, add user B to user A's friend list. This makes user A and user B friends.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/add-friends</span>
- **Body**:
    ```json
      {
        "userIdA" : "653ddc431694115a0df725e3",
        "userIdB" : "653e1ab29459c162a1b392a1"
      }
    ```
- **Response**:
    - **Status 202**:
      ```json
        {
          "message": "Friends Added",
          "friendListA": {
            "_id": "6540a5be0d8577911fe78fb5",
            "friends": [
              "6540a5a90d8577911fe78fae"
            ],
            "createdAt": "2023-10-31T06:59:10.685Z",
            "updatedAt": "2023-10-31T07:44:20.807Z",
            "userId": "6540a5be0d8577911fe78fb7",
            "__v": 5
          },
          "friendListB": {
            "_id": "6540a5a90d8577911fe78fac",
            "friends": [
              "6540a5be0d8577911fe78fb7"
            ],
            "createdAt": "2023-10-31T06:58:49.502Z",
            "updatedAt": "2023-10-31T07:44:20.808Z",
            "userId": "6540a5a90d8577911fe78fae",
            "__v": 5
          }
        }
      ```
    - **Status 500**:


## Remove Friends (Dev Route)
  User A is removed from user B's friend list. Then user B is removed from user A's friend list. This unfriends user A and user B
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/remove-friends</span>
- **Body**:
    ```json
    {
      "userIdA" : "6540a5be0d8577911fe78fb7",
      "userIdB" : "6540a5a90d8577911fe78fae"
    }
    ```
- **Response**:
    - **Status 201**:
      ```json
      {
        "message": "Friends Removed",
        "friendListA": {
          "_id": "6540a5be0d8577911fe78fb5",
          "friends": [],
          "createdAt": "2023-10-31T06:59:10.685Z",
          "updatedAt": "2023-10-31T07:38:21.506Z",
          "userId": "6540a5be0d8577911fe78fb7",
          "__v": 4
        },
        "friendListB": {
          "_id": "6540a5a90d8577911fe78fac",
          "friends": [],
          "createdAt": "2023-10-31T06:58:49.502Z",
          "updatedAt": "2023-10-31T07:38:21.506Z",
          "userId": "6540a5a90d8577911fe78fae",
          "__v": 4
        }
      }
      ```
    - **Status 500**:

## Get Global Friend List (DEV ROUTE)
Intended as a DEV ROUTE. Returns all friend lists in the database. Route does not always return results, have not yet found the bug that is causing this. 
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/friend-list</span>
- **Body**: None
- **Response**:
    - **Status 201**:
      ```json
      [
        {
          "_id": "653cb96bb172a8cf95067f6c",
          "friends": [
              "6540a5a90d8577911fe78fae"
            ],
          "userId": "653cb96bb172a8cf95067f6e",
          "__v": 0,
          "createdAt": "2023-10-31T07:49:34.318Z",
          "updatedAt": "2023-10-31T07:49:34.318Z"
        },
        {
          "_id": "653cbc1bb172a8cf95067f90",
          "friends": [
              "6540a5a90d8577911fe78fae"
            ],
          "userId": "653cbc1bb172a8cf95067f92",
          "__v": 0,
          "createdAt": "2023-10-31T07:49:34.318Z",
          "updatedAt": "2023-10-31T07:49:34.318Z"
        }
      ```
    - **Status 500**:


