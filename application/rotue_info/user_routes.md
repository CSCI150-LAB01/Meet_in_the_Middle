# User Routes
[Get User Info](#get-user-in) | [Get List of Users](#get-list-of-users) | [Get User Default Location](#get-user-default-location) | [Add/Update User Default Location](#add/update-user-default-location) | [Delete User](#delete-user)


## Get User Info
Returns the user that is provided in the URL.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/user/:userId</span>
- **Body**: 
- **Response**:
    - **Status 200**:
      ```json
      {
        "user": {
          "_id": "6561865672d4c70129269c1a",
          "email": "jose@gmail.com",
          "password":   "$2b$10$ftkcIcBl...",
          "username": "jose",
          "defaultLocationId": "6561865672d4c70129269c19",
          "createdAt": "2023-11-25T05:29:58.244Z",
          "updatedAt": "2023-11-25T05:29:58.244Z"
        }
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
      {
        "userList": [
            {
                "_id": "6561865672d4c70129269c1a",
                "email": "jose@gmail.com",
                "password": "$2b$10$bpJnd...",
                "username": "jose",
                "defaultLocationId": "6561865672d4c70129269c19",
                "createdAt": "2023-11-25T05:29:58.244Z",
                "updatedAt": "2023-11-25T05:29:58.244Z"
            },
            {
                "_id": "6561866172d4c70129269c20",
                "email": "kyle@gmail.com",
                "password": "$2b$10$96i...",
                "username": "kyle",
                "defaultLocationId": "6561866172d4c70129269c1f",
                "createdAt": "2023-11-25T05:30:09.634Z",
                "updatedAt": "2023-11-25T05:30:09.634Z"
            },
            ...
            ...
        ]
      }
      ```
    - **Status 500**

## Get User Default Location
Responds with the deafult location of the user provided in the URL.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/user/default-location/:userId</span>
- **Body** 
- **Response**:
    - **Status 200**:
      ```json
      {
          "message": "Successfully returned default location",
          "defaultLocation": {
              "_id": "653a14848e46a1fdc2caf8e2",
              "coordinates": [55.445, 67.891],
              "__v": 0,
              "createdAt": "2023-11-04T04:00:07.160Z",
              "updatedAt": "2023-11-04T04:00:07.160Z"
          }
      }
      ```


## Add/Update User Default Location
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
      }
    }
    ```
- **Response**:
    

## Delete User 
Deletes the user that is provided in the URL. Friends List, Default-location, and all other objects related to user are also deleted.
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">/api/user/:userId</span>
- **Body**: 

- **Response**:
    - **Status 200**: 
      ```json
      {
        "message": "User deleted",
        "user": {
            "_id": "6561863472d4c70129269c14",
            "email": "bob@gmail.com",
            "password": "$2b$10$UL...",
            "username": "bob",
            "defaultLocationId": "6561863472d4c70129269c13",
            "createdAt": "2023-11-25T05:29:24.452Z",
            "updatedAt": "2023-11-25T05:29:24.452Z"
        }
      }
      ```