# User Routes

## Signup User
- **Note**: <span style="color:red">Longitude range from -180 to 180, and Latitude must range from -90 to 90. Otherwise an error occurs</span>
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/api/user/signup/</span>
- **Body**:
    ```json
    {
        "email" : "eamil@gmail.com",
        "password": "pass",
        "username" : "joe",    
        "location" : [12,52]
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

## Login User
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/api/user/login/</span>
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
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">/api/user/:userId</span>
- **Body**: None
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
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/user/:userId</span>
- **Body**: None
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
              ...
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
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/user/default-location/:userId</span>
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

## Post/Update User Default Location
- **Note**: <span style="color:red">Post method handles both posting AND updating location (old location will be overridden). Longitude must be between -180 and 180, and Latitude must be between -90 and 90.</span>
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
      