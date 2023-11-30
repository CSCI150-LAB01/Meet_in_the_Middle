# Signin and Signup
[Signup User](#signup-user) | [Signin User](#signin-user)

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
            "password": "$2b$10$NOG9/...",
            "username": "joe",
            "defaultLocationId": "65615258757f05f60d42f6d8",
            "_id": "65615258757f05f60d42f6d9",
            "createdAt": "2023-11-25T01:48:08.464Z",
            "updatedAt": "2023-11-25T01:48:08.464Z",
            "__v": 0
        }
      }
      ```

## Signin User
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