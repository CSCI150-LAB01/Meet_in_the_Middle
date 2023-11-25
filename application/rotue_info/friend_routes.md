# Friend Routes
[Get Friend List](#get-friend-list) \
[Get Friend Requests](#get-friend-requests) | [Send Friend Request](#send-friend-request) | [Delete Friend Request (from User to Recipient)](#delete-friend-request-from-user-to-recipient) \
[Accept Friend Request](#accept-friend-request) | [Reject Friend Request (from Sender to User)](#reject-friend-request-from-sender-to-user) | [Remove Friend](#remove-friend)
  
## Get Friend List
Returns user's friend list. User id is sent in URL.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">api/user/friend-list/:userId</span>
- **Body**:
- **Response**:
    - **Status 200**:
      ```json
      {
        "message": "Successfully returned friendIds",
        "friendIds": [
          "65615258757f05f60d42f6d9",
          "65615258757f05f60d42f212",
          "65615258757f05f60d42f5g6",
          ...
        ]
      }
      ```
  
## Get Friend Requests
Returns user's friend list. User id is sent in URL. 
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/user/friend-requests/:userId</span>
- **Body**:
- **Response**:
    - **Status 200**:
      ```json
      {
        "message": "Successfully returned friend requests",
        "userId": "6561866172d4c70129269c20",
        "friendRequsts": [
            {
                "_id": "65618df272d4c70129269c57",
                "senderId": "6561865672d4c70129269c1a",
                "recipientId": "6561866172d4c70129269c20",
                "message": "be my friend",
                "createdAt": "2023-11-25T06:02:26.024Z",
                "__v": 0
            },
            {
                "_id": "656190606a5538fd51ce5098",
                "senderId": "6561866c72d4c70129269c26",
                "recipientId": "6561866172d4c70129269c20",
                "message": "be my friend",
                "createdAt": "2023-11-25T06:12:48.787Z",
                "__v": 0
            }
        ]
      }
      ```

## Delete Friend Request from User to Recipient
Delete a friend request that a user sent to a recipient.
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">/user/friend-requests/:userId</span>
- **Body**:
```json
  {
    "recipientId": "6545e45698fe7f58fa524310"
  }
 ```
- **Response**:
    - **Status 200**:
      ```json
      {
        "message": "Friend request deleted",
        "status": 200
      }
      ```

## Send Friend Request
Send a friend request from a user to a recipient. After friend request is sent, it will be added to user's outging-requests and the recievers incoming-requests.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/send-friend-request/:userId</span>
- **Body**:
  ```json
    {
      "recipientId" : "6561865672d4c70129269c1a",
      "message" : "be my friend?"
    }
  ```
- **Response**:
    - **Status 202**:
      ```json
      {
        "message": "Friend Request sent and Notification created",
        "friendRequest": {
            "senderId": "6561865672d4c70129269c1a",
            "recipientId": "6561866172d4c70129269c20",
            "message": "be my friend",
            "_id": "65618df272d4c70129269c57",
            "createdAt": "2023-11-25T06:02:26.024Z",
            "__v": 0
        },
        "notification": {
            "userId": "6561866172d4c70129269c20",
            "message": "jose sent you a friend request",
            "_id": "65618df272d4c70129269c59",
            "createdAt": "2023-11-25T06:02:26.112Z",
            "__v": 0
        }
      }
      ```
  
## Accept Friend Request
User accepts the sender's friend request. Remove the friend request from both the users incoming request list, and from the senders outgoing request list. Add both the user and sender to each other's friend list.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/accept-friend-requests/:userId</span>
- **Body**:
    ```json
      {
        "senderId" : "654351646fba2bbb82382d62"
      }
    ```
- **Response**:
    - **Status 200**:
      ```json
      {
        "message": "created friends and sent notification",
        "relationA": {
            "userId": "6561866172d4c70129269c20",
            "friendId": "6561865672d4c70129269c1a",
            "_id": "656192176a5538fd51ce50af",
            "createdAt": "2023-11-25T06:20:07.536Z"
        },
        "relationB": {
            "userId": "6561865672d4c70129269c1a",
            "friendId": "6561866172d4c70129269c20",
            "_id": "656192176a5538fd51ce50b0",
            "createdAt": "2023-11-25T06:20:07.536Z"
        },
        "notification": {
            "userId": "6561865672d4c70129269c1a",
            "message": "kyle accepted your friend request",
            "_id": "656192176a5538fd51ce50b5",
            "createdAt": "2023-11-25T06:20:07.799Z"
        }
      }
      ```

## Reject Friend Request from Sender to User
User rejects the sender's friend request. Friend request is removed from both the user's incoming friend-requests and sender's outgoing friend requests.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/reject-friend-requests/:userId</span>
- **Body**:
    ```json
      {
        "senderId" : "654351646fba2bbb82382d62"
      }
    ```
- **Response**:
    - **Status 200**:
      ```json
      {
        "message": "Friend request deleted",
        "status": 200
      }  
      ```
  
## Remove Friend
Remove friend from user's friend list. 
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">/api/user/remove-friend/:userId</span>
- **Body**:
    ```json
      {
        "friendId" : "654351646fba2bbb82382d62"
      }
    ```
- **Response**:
    - **Status 200**:
      ```json
      {
        "message": "Successfully removed friend",
        "friendId": "654351646fba2bbb82382d62"
      }
      ```