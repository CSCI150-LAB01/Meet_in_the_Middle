# User Routes

## Signup User
- **Method**: POST
- **Route**: /api/user/signup/
- **Body**:
    ```json
    {
        "email": "dummy@gmail.com",
        "password": "1234",
        "username": "dummy45"
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
- **Method**: POST
- **Route**: /api/user/login/
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
- **Note**: Delete User Example -> /user/6526405977a7ac5811437f87
- **Method**: DELETE
- **Route**: /api/user/:userId
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

## Get User List
- **Method**: GET
- **Route**: /api/user/user-list
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
    - **Status 500**

## Get Default User Location
- **Method**: GET
- **Route**: /user/default-location/:userId
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

## Post/Update Default User Location
- **Note**: Post method handles both posting AND updating location(old location will be overidden). Longitude must be between -180 and 180, and Latitude must be between -90 and 90.
- **Method**: POST
- **Route**: /user/default-location/:userId
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
      ```

## Delete Location (Debugging)

- **Method**: DELETE
- **Route**: /user/default-location/:locationId
- **Body**: None

**Response**:
- **Status 404**:
  ```json
  {
      "message": "Default location not found"
  }
  ```

## Get All Locations (Debugging)

- **Note**: Location is plural.
- **Method**: GET
- **Route**: /user/default-locations
- **Body**: None
- **Response**:
  ```json
  {
    "locations": 
    [
        {
            "_id": "653a29747bc9eb71e06320fa",
            "coordinates": [
                55.445,
                67.891
            ],
            "__v": 0
        },
        {
            "_id": "653a29747bc9eb71e06320fb",
            "coordinates": [
                65.445,
                81.895
            ],
            "__v": 0
        }
    ]
  }
  ```




