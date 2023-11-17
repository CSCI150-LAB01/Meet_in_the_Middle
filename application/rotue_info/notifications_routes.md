# Notifications
## Get Notifications (QA)
Get the User's notifications. Notifications have types that can be sorted after they have been downloaded.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">api/user/notifications/:userId</span>
- **Body**:
- **Response**:
    - **Status 202**:
      ```json
      {
        "message": "user notificaitons",
        "userId": "6545e45698fe7f58fa524310",
        "notifications": {
          "_id": "6545e45698fe7f58fa52430e",
          "isFresh": false,
          "inbox": [
            {
                "senderId": "6545c1d5809eea63dfc73f47",
                "message": "joe sent friend request",
                "isRead": false,
                "type": "friend-request",
                "_id": "6545ec0c8656cb4a1c9b9d69",
                "createdAt": "2023-11-04T07:00:28.381Z"
            },
            {
                "senderId": "6545c1d5809eea63dfc73f47",
                "message": "joe sent friend request",
                "isRead": false,
                "type": "friend-request",
                "_id": "6545ec278656cb4a1c9b9d7f",
                "createdAt": "2023-11-04T07:00:55.772Z"
            },
            {
                "senderId": "6545c1d5809eea63dfc73f47",
                "message": "joe sent friend request",
                "isRead": false,
                "type": "friend-request",
                "_id": "6545ed168656cb4a1c9b9d9e",
                "createdAt": "2023-11-04T07:04:54.855Z"
            }
          ],
          "createdAt": "2023-11-04T06:27:34.569Z",
          "updatedAt": "2023-11-04T07:46:58.605Z",
          "userId": "6545e45698fe7f58fa524310",
          "__v": 5
        }
      }
      ```

## Delete from the Inbox (QA)
Delete a single user notification from the inbox. Must send internal inbox ID, not to be confused with the notifications ID.
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">api/user/notifications/:userId</span>
- **Body**:
  ```json
  {
    "inboxId": "6545e45698fe7f58fa524310"
  }
  ```
- **Response**:
    - **Status 202**:
      ```json
      {
        "message": "Notificaiton removed",
        "notifications": {
          "_id": "6545e45698fe7f58fa52430e",
          "isFresh": false,
          "inbox": [
            {
                "senderId": "6545c1d5809eea63dfc73f47",
                "message": "joe sent friend request",
                "isRead": false,
                "type": "friend-request",
                "_id": "6545ec0c8656cb4a1c9b9d69",
                "createdAt": "2023-11-04T07:00:28.381Z"
            },
            {
                "senderId": "6545c1d5809eea63dfc73f47",
                "message": "joe sent friend request",
                "isRead": false,
                "type": "friend-request",
                "_id": "6545ec278656cb4a1c9b9d7f",
                "createdAt": "2023-11-04T07:00:55.772Z"
            },
            {
                "senderId": "6545c1d5809eea63dfc73f47",
                "message": "joe sent friend request",
                "isRead": false,
                "type": "friend-request",
                "_id": "6545ed168656cb4a1c9b9d9e",
                "createdAt": "2023-11-04T07:04:54.855Z"
            }
          ],
          "createdAt": "2023-11-04T06:27:34.569Z",
          "updatedAt": "2023-11-04T07:46:58.605Z",
          "userId": "6545e45698fe7f58fa524310",
          "__v": 5
        }
      }
      ```