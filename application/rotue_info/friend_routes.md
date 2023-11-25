# Friend Routes
Add and Remove friends from friend list. Display friend list
  
## Get Friend List
Returns user's friend list. User id is sent in URL.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">api/user/friend-list/:userId</span>
- **Body**:
- **Response**:
    - **Status 202**:
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
        "userId": "65615258757f05f60d42f6d9",
        "friendRequsts": [
          {
              "_id": "65616a43a6746ea45ea5db45",
              "senderId": "65615258757f05f60d42f6d9",
              "recipientId": "65615888a9933298a2bfc118",
              "message": "be my friend",
              "createdAt": "2023-11-25T03:30:11.944Z",
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
      "recipientId" : "65431d26f82ab63467719b94",
      "message" : "will you be my friend?"
    }
  ```
- **Response**:
    - **Status 202**:
      ```json
      {
        "message": "Friend Request Sent",
        "friendRequest": {
          "userId": "65615258757f05f60d42f6d9",
          "_id": "656158e5a9933298a2bfc11d",
          "createdAt": "2023-11-25T02:16:05.772Z",
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
        "message": "created friends",
        "relationA": {
            "userId": "65615888a9933298a2bfc118",
            "friendId": "65615258757f05f60d42f6d9",
            "_id": "65616a4aa6746ea45ea5db4c",
            "createdAt": "2023-11-25T03:30:18.060Z",
            "__v": 0
        },
        "relationB": {
            "userId": "65615258757f05f60d42f6d9",
            "friendId": "65615888a9933298a2bfc118",
            "_id": "65616a4aa6746ea45ea5db4d",
            "createdAt": "2023-11-25T03:30:18.060Z",
            "__v": 0
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
    - **Status 202**:
      ```json
      {
        "message": "Friend Request Rejected",
        "senderFriendRequests": {
          "_id": "6545c1d5809eea63dfc73f43",
          "incomingRequests": [],
          "outgoingRequests": [],
          "isFresh": true,
          "createdAt": "2023-11-04T04:00:21.368Z",
          "updatedAt": "2023-11-04T07:00:55.689Z",
          "userId": "6545c1d5809eea63dfc73f47",
          "__v": 6
          },
        "userFriendRequests": {
          "_id": "6545e45698fe7f58fa52430c",
          "incomingRequests": [],
          "outgoingRequests": [],
          "isFresh": true,
          "createdAt": "2023-11-04T06:27:34.569Z",
          "updatedAt": "2023-11-04T07:00:55.689Z",
          "userId": "6545e45698fe7f58fa524310",
          "__v": 6
          }
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