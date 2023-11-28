# Notifications
[Get Notifications](#get-notificaitons) | [Delete Notification](#delete-notification)
## Get Notifications
Get the User's notifications. Notifications have types that can be sorted after they have been downloaded.
meeting
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">api/user/notification/:userId</span>
- **Body**:
- **Response**:
    - **Status 200**:
      ```json
      {
        "message": "Successfully returned notifications",
        "notifications": [
            {
                "_id": "65618df272d4c70129269c59",
                "userId": "6561866172d4c70129269c20",
                "message": "jose sent you a friend request",
                "createdAt": "2023-11-25T06:02:26.112Z"
            },
            {
                "_id": "656190606a5538fd51ce509a",
                "userId": "6561866172d4c70129269c20",
                "message": "george sent you a friend request",
                "createdAt": "2023-11-25T06:12:48.879Z"
            },
            ...
            ...
        ]
      }
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
    - **Status 200**:
      ```json
      {
        "message": "Notificaiton deleted"
      }
      ```