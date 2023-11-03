# DEV ROUTES, FOR DEBUGGING ONLY
# Friend List 
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

## Remove Friend (Needs Testing)
  User A is removed from user B's friend list. Then user B is removed from user A's friend list. This unfriends user A and user B
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">api/dev/remove-friends</span>
- **Body**:
    ```json
    {
      "friendId" : "6540a5a90d8577911fe78fae"
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

## Add Friends 
Add user A to user B's friend list. Then, add user B to user A's friend list. This makes user A and user B friends.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/dev/add-friends</span>
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

## Get Global Friend List 
Intended as a DEV ROUTE. Returns all friend lists in the database. Route does not always return results, have not yet found the bug that is causing this. 
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/dev/friend-list</span>
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

# Default Location Routes 

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