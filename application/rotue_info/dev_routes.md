# Friend List (For Debugging Only)
- **NOTE**: <span style="color:red">These routes DO NOT link friends list to user.</span>

## Get Global Friend List
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/friend-list</span>
- **Body**: None
- **Response**:
    - **Status 201**:
      ```json
      {
        "userId" : "653b7229f6575860aa32ca45",
        "friends": ["653c600c017e15bcf7b9b57d", "653c457e017e15bcf7b9b556"]
        }
      ```
    - **Status 404**:

## Post Friend List
Adds a Friend list to the database. <span style="color:red">Does not link user to friend list.</span>
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/api/friend-list</span>
- **Body**: 
    ```json
    {
    "userId" : "653b7229f6575860aa32ca45",
    "friends": ["653c600c017e15bcf7b9b57d", "653c457e017e15bcf7b9b556"]
    }
    ```
- **Response**:
    - **Status 201**:
      ```json
      {
          "message": "Friend list added to databas, USER IS NOT LINKED TO FRIENDLIST"
      }
      ```
    - **Status 500**:

## Delete Friend List
Deletes a single friend list from the database. <span style="color:red">Does not unlink user to friend list! _id is primary key for friendlist, not userId!</span>
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">/api/friend-list</span>
- **Body**:
    ```json
    {
        "_id": "653b7229f6575860aa32ca45"
    }
    ```
- **Response**:
    - **Status 201**:
      ```json
      {
          "message": "Freind List Deleted"
      }
      ```
    - **Status 404**:


# Default Location Routes (For Debugging Only)

 <span style="color:red">These routes DO NOT LINK LOCATION TO USER this is for debugging only.</span>
## Get Default Location List
- **NOTE**: <span style="color:red">Does not link location to any user.</span>
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/dev/default-location-list</span>
- **Body**: None
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
## Get Default Location
- **NOTE**: <span style="color:red">Does not link location to any user.</span>
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/dev/default-location/:default-location-id</span>
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

## Delete Default Location
- **NOTE**: <span style="color:red">Does not link location to any user.</span>
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/api/dev/default-location/:default-location-id</span>
- **Body**: None
- **Response**:
    - **Status 201**:
      ```json
      {
          "message": "Default location deleted"
      }
      ```
    - **Status 500**:
      ```json
      {
          "error": "error"
      }
      ```

## Post Default Location
- **NOTE**: <span style="color:red">Does not link location to any user.</span>
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/api/default-location</span>
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
          "message": "Default location added to database. Location is NOT LINKED TO USER"
      }
      ```
    - **Status 500**:
      ```json
      {
          "error": "error"
      }
      ```