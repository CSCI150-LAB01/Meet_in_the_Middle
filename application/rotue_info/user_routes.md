# User Routes
  Add, Remove, and Modify Users and User data. Signin and Login

## Get User Info (QA)
Returns the user that is provided in the URL.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/user/:userId</span>
- **Body**: 
- **Response**:
    - **Status 200**:
      ```json
       {
          "_id": "6545c1d5809eea63dfc73f47",
          "email": "joe@gmail.com",
          "password": "$2b$10$sOZnb...",
          "username": "joe",
          "defaultLocationId": "6545c1d5809eea63dfc73f3e",
          "friendListId": "6545c1d5809eea63dfc73f3f",
          "friendRequestsId": "6545c1d5809eea63dfc73f43",
          "notificationsId": "6545c1d5809eea63dfc73f45",
          "meetingsId": "6545c1d5809eea63dfc73f41",
          "createdAt": "2023-11-04T04:00:21.421Z",
          "updatedAt": "2023-11-04T04:00:21.421Z"
        }
      ```
    - **Status 500**:

## Get List of Users (QA)
Provides a list of ALL USERS in the database. Can be used to search for friends. 
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/user-list</span>
- **Body**: None
- **Response**:
    - **Status 200**:
      ```json
      [
          "userList": {
              "_id": "6545c1c7809eea63dfc73f35",
              "email": "bob@gmail.com",
              "password": "$2b$10$x...",
              "username": "bob",
              "defaultLocationId": "6545c1c7809eea63dfc73f2c",
              "friendListId": "6545c1c7809eea63dfc73f2d",
              "friendRequestsId": "6545c1c7809eea63dfc73f31",
              "notificationsId": "6545c1c7809eea63dfc73f33",
              "meetingsId": "6545c1c7809eea63dfc73f2f",
              "createdAt": "2023-11-04T04:00:07.213Z",
              "updatedAt": "2023-11-04T04:00:07.213Z"
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
    - **Status 500**

## Get User Default Location (QA)
Responds with the deafult location of the user provided in the URL.
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
              "__v": 0,
              "createdAt": "2023-11-04T04:00:07.160Z",
              "updatedAt": "2023-11-04T04:00:07.160Z"
          }
      }
      ```


## Add/Update User Default Location (QA)
UserId provided in URL has default location updated with the coordinates in the body. Note if a default location already exists it will be OVERIDEN. <span style="color:red">Longitude must be between -180 and 180, and Latitude must be between -90 and 90. Coordinates has longitude first and then latitude</span>
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/default-location/:userId</span>
- **Body**:
    ```json
    {
      "message": "Success",
      "defaultLocation": {
        "_id": "6545d051809eea63dfc73fd7",
        "coordinates": [
            1,
            1
        ],
        "createdAt": "2023-11-04T05:02:09.800Z",
        "updatedAt": "2023-11-04T05:02:09.800Z",
        "__v": 0
      }
    }
    ```
- **Response**:
    

## Delete User (QA)
Deletes the user that is provided in the URL. Friends List, Default-location, and all other objects related to user are also deleted.
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">/api/user/:userId</span>
- **Body**: 

- **Response**:
    - **Status 200**: 
      ```json
      {
          "message": "User deleted",
          {
              "_id": "6545c1c7809eea63dfc73f35",
              "email": "bob@gmail.com",
              "password": "$2b$10$x...",
              "username": "bob",
              "defaultLocationId": "6545c1c7809eea63dfc73f2c",
              "friendListId": "6545c1c7809eea63dfc73f2d",
              "friendRequestsId": "6545c1c7809eea63dfc73f31",
              "notificationsId": "6545c1c7809eea63dfc73f33",
              "meetingsId": "6545c1c7809eea63dfc73f2f",
              "createdAt": "2023-11-04T04:00:07.213Z",
              "updatedAt": "2023-11-04T04:00:07.213Z"
          }
      }
      ```