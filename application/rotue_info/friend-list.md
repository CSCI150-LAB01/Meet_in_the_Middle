# Friend List (For Debugging Only)
- **NOTE**: <span style="color:red">These routes DO NOT link friends list to user.</span>

## Get Friend List
- **NOTE**: <span style="color:red">Does not link user to friend list.</span>
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
- **NOTE**: <span style="color:red">Does not link user to friend list.</span>
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

## Delete Default Location
- **NOTE**: <span style="color:red">Does not link user to friend list! _id is primary key for friendlist, not userId!</span>
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
