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
          "friendList": {
          "_id": "653e15ef9459c162a1b39282",
          "friends": [
            "653ddc431694115a0df725e3",
            "653e1ab29459c162a1b392a1"
          ],
          "createdAt": "2023-10-29T08:21:03.623Z",
          "updatedAt": "2023-10-29T08:21:03.623Z",
          "userId": "653e15ef9459c162a1b39284",
          "__v": 2
          }
        }
      ```
    - **Status 500**:
  
## Get Friend Requests
Returns user's friend list. User id is sent in URL. 
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/user/friend-requests/:userId</span>
- **Body**:
- **Response**:
    - **Status 202**:
      ```json
      {
        "userId": "6545e45698fe7f58fa524310",
        "friendRequests": [
          {
            "_id": "6545e45698fe7f58fa52430c",
            "incomingRequests": [
                {
                    "senderId": "6545c1d5809eea63dfc73f47",
                    "message": "will you be my friend?",
                    "_id": "6545ed168656cb4a1c9b9d99",
                    "createdAt": "2023-11-04T07:04:54.716Z"
                }
            ],
            "outgoingRequests": [],
            "isFresh": true,
            "createdAt": "2023-11-04T06:27:34.569Z",
            "updatedAt": "2023-11-04T07:04:54.716Z",
            "userId": "6545e45698fe7f58fa524310",
            "__v": 7
          }
        ]
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
        "message": "Friend Requests Sent",
        "userFriendRequests": {
          "_id": "6543516d6fba2bbb82382d71",
          "incomingRequests": [],
          "outgoingRequests": [
            {
                "recipientId": "654351646fba2bbb82382d64",
                "message": "hello",
                "_id": "654351ef6fba2bbb82382d87",
                "createdAt": "2023-11-02T07:38:23.716Z"
            }
          ],
          "isFresh": false,
          "createdAt": "2023-11-02T07:36:13.278Z",
          "updatedAt": "2023-11-02T07:38:23.717Z",
          "userId": "6543516d6fba2bbb82382d73",
          "__v": 0
        },
        "recipientFriendRequests": {
          "_id": "654351646fba2bbb82382d62",
          "incomingRequests": [
            {
                "senderId": "6543516d6fba2bbb82382d73",
                "message": "hello",
                "_id": "654351ef6fba2bbb82382d88",
                "createdAt": "2023-11-02T07:38:23.718Z"
            }
          ],
          "outgoingRequests": [],
          "isFresh": true,
          "createdAt": "2023-11-02T07:36:04.162Z",
          "updatedAt": "2023-11-02T07:38:23.718Z",
          "userId": "654351646fba2bbb82382d64",
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
        "message": "Friends added",
        "senderFriendList": {
          "_id": "6545c1d5809eea63dfc73f3f",
          "friends": [
            "6545e45698fe7f58fa524310"
          ],
          "isFresh": true,
          "createdAt": "2023-11-04T04:00:21.368Z",
          "updatedAt": "2023-11-04T07:17:21.067Z",
          "userId": "6545c1d5809eea63dfc73f47",
          "__v": 1
        },
        "userFriendList": {
          "_id": "6545e45698fe7f58fa524308",
          "friends": [
            "6545c1d5809eea63dfc73f47"
          ],
          "isFresh": true,
          "createdAt": "2023-11-04T06:27:34.566Z",
          "updatedAt": "2023-11-04T07:17:21.067Z",
          "userId": "6545e45698fe7f58fa524310",
          "__v": 1
        }
      }
      ```

## Reject Friend Request
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
        "message": "Friends added",
        "senderFriendList": {
          "_id": "6545c1d5809eea63dfc73f3f",
          "friends": [
            "6545e45698fe7f58fa524310"
          ],
          "isFresh": true,
          "createdAt": "2023-11-04T04:00:21.368Z",
          "updatedAt": "2023-11-04T07:17:21.067Z",
          "userId": "6545c1d5809eea63dfc73f47",
          "__v": 1
        },
        "userFriendList": {
          "_id": "6545e45698fe7f58fa524308",
          "friends": [
            "6545c1d5809eea63dfc73f47"
          ],
          "isFresh": true,
          "createdAt": "2023-11-04T06:27:34.566Z",
          "updatedAt": "2023-11-04T07:17:21.067Z",
          "userId": "6545e45698fe7f58fa524310",
          "__v": 1
        }
      }
      ```