# Notifications
[Get Notifications](#get-notificaitons) | [Delete Notification](#delete-notification)
## Get Notifications
Get the User's notifications. Notifications have types that can be sorted after they have been downloaded.
meeting
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">api/user/notification/:userId</span>
- **Body**:
- **Response**:
    - **Status 202**:
      ```json
      
      
      ```

## Delete Notification
Delete a single user notification from the inbox. Must send internal inbox ID, not to be confused with the notifications ID.
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">api/user/notification/:userId</span>
- **Body**:
  ```json
  {
    "notificationId": "6545e45698fe7f58fa524310"
  }
  ```
- **Response**:
    - **Status 202**:
      ```json
      {
        "message": "Notificaiton deleted"
      }
      ```