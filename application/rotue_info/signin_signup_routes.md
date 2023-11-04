# Signin and Signup


## Signup User
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
        "message": "User created",
        "user": {
          "email": "email@gmail.com",
          "password": "$2b$10...",
          "username": "joe",
          "defaultLocationId": "6545c1d5809eea63dfc73f3e",
          "friendListId": "6545c1d5809eea63dfc73f3f",
          "friendRequestsId": "6545c1d5809eea63dfc73f43",
          "notificationsId": "6545c1d5809eea63dfc73f45",
          "meetingsId": "6545c1d5809eea63dfc73f41",
          "_id": "6545c1d5809eea63dfc73f47",
          "createdAt": "2023-11-04T04:00:21.421Z",
          "updatedAt": "2023-11-04T04:00:21.421Z",
          "__v": 0
          }
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