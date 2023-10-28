# Default Location Routes (For Debugging Only)
- **NOTE**: <span style="color:red">These routes DO NOT LINK LOCATION TO USER this is for debugging only.</span>


## Get Default Location List
- **NOTE**: <span style="color:red">Does not link location to any user.</span>
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/api/default-location-list</span>
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
- **Route**: <span style="color:lightgreen">/api/default-location/:default-location-id</span>
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
- **Route**: <span style="color:lightgreen">/default-location/:default-location-id</span>
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