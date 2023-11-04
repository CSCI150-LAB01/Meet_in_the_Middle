# Friend Routes
Add and Remove friends from friend list. Display friend list
  
## Get  Friend List 
Returns user's friend list. User id is sent in URL.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/user/friend-list/:userId</span>
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

## Send Friend Request 
Send a friend request from a user to a recipient. Message can be read by friend when friend request is recieved. After friend request is sent, it will be added to user's outging-requests, and recievers incoming-requests (friend request object).
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
          "isFresh": true,
          "createdAt": "2023-11-02T07:36:13.278Z",
          "updatedAt": "2023-11-02T07:38:23.717Z",
          "userId": "6543516d6fba2bbb82382d73",
          "__v": 0
        },
        "proposedFriendRequests": {
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
    - **Status 500**:
  
## Accept Friend Request (Working but Needs Testing)
IMPORTANT README: User accepts the sender's friend request. Remove the friend request from both the users incoming request list, and from the senders outgoing request list. Add both the user and sender to each other's friend list.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/accept-friend-requests/:userId</span>
- **Body**:
    ```json
      {
        "senderId" : "654351646fba2bbb82382d62"
      }
    ```
- **Response**:
    - **Status 202**:
      ```json
        NEEDS JSON RESPONSE!!!!!!
      ```
    - **Status 500**:

## Reject Friend Request (Working needs testing)
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
        NEEDS JSON RESPONSE!!!!!!
      ```
    - **Status 500**: