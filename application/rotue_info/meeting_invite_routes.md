# Meeting Invite Routes
[Get Meeting Invites](#get-meeting-invites) | [Send Meeting Invites](#send-meeting-invites) | [Reject Meeting Invite](#reject-meeting-invite) 

## Get Meeting Invites
Get a list of meetings the user has been invited to.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/user/get-meeting-invite/:userId</span>
- **Body**:
  ```json
    {
      "meetingId": "656107982e5684c0dcaeac7d"
    }
  ```
- **Response**:
    - **Status 200**:
      ```json
      {
        "meetings": [
          {
            "_id": "656107a12e5684c0dcaeac80",
            "creatorId": "6545c1d5809eea63dfc73f47",
            "title": "Really Not Great Meeting",
            "placeId": "xChIJc_F6SZDglIARiwcdwXAqF1B",
            "pending": [
                "6552c89b2d3c47e3a1a9dceb"
            ],
            "denied": [
                "6549be6583ef8f4250d38c32"
            ],
            "accepted": [
                "6545c1d5809eea63dfc73f47",
                "6545e45698fe7f58fa524310"
            ],
            "createdAt": "2023-11-24T20:29:21.611Z",
            "updatedAt": "2023-11-24T20:29:21.611Z",
            "__v": 4
          }
        ]
      }
      ```

## Send Meeting Invites
Send a meeting invite to one or more users. Only the meeting creator can send invites.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/meeting-invite/:userId</span>
- **Body**:
  ```json
    {
      "userIds": [ 
        "6545e45698fe7f58fa524310",
        "6549be6583ef8f4250d38c32"        
      ]
    }
  ```
- **Response**:
    - **Status 200**:
      ```json
      {
        "message": "Successfully invited users to meeting meeting",
        "meeting": {
            "_id": "656107a12e5684c0dcaeac80",
            "creatorId": "6545c1d5809eea63dfc73f47",
            "title": "Really Not Great Meeting",
            "placeId": "xChIJc_F6SZDglIARiwcdwXAqF1B",
            "pending": [
                "6545e45698fe7f58fa524310",
                "6549be6583ef8f4250d38c32"
            ],
            "denied": [],
            "accepted": [
                "6545c1d5809eea63dfc73f47"
            ],
            "createdAt": "2023-11-24T20:29:21.611Z",
            "updatedAt": "2023-11-24T20:29:21.611Z",
            "__v": 0
          }
      }
      ```

## Accept Meeting Invite
User accepts an invite to a meeting. The user MUST already be in the pending array to accept the invite. After accepting the invite the user is moved from the pending to the accepted array.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/accept-meeting-invite/:userId</span>
- **Body**:
  ```json
    {
      "meetingId": "656107a12e5684c0dcaeac80"
    }
  ```
- **Response**:
    - **Status 200**:
      ```json
      {
        "message": "Successfully accepted meeting invite",
        "meeting": {
            "_id": "656107a12e5684c0dcaeac80",
            "creatorId": "6545c1d5809eea63dfc73f47",
            "title": "Really Not Great Meeting",
            "placeId": "xChIJc_F6SZDglIARiwcdwXAqF1B",
            "pending": [
                "6549be6583ef8f4250d38c32"
            ],
            "denied": [],
            "accepted": [
                "6545c1d5809eea63dfc73f47",
                "6545e45698fe7f58fa524310"
            ],
            "createdAt": "2023-11-24T20:29:21.611Z",
            "updatedAt": "2023-11-24T20:29:21.611Z",
            "__v": 1
        }
      }
      ```

## Reject Meeting Invite
User rejects an invite to a meeting. The user MUST already be in the pending array to reject the invite. After rejecting the invite the user is moved from the pending to the denied array.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/reject-meeting-invite/:userId</span>
- **Body**:
  ```json
    {
      "meetingId": "656107a12e5684c0dcaeac80"
    }
  ```
- **Response**:
    - **Status 200**:
      ```json
      {
        "message": "Successfully accepted meeting invite",
        "meeting": {
            "_id": "656107a12e5684c0dcaeac80",
            "creatorId": "6545c1d5809eea63dfc73f47",
            "title": "Really Not Great Meeting",
            "placeId": "xChIJc_F6SZDglIARiwcdwXAqF1B",
            "pending": [],
            "denied": [
                "6549be6583ef8f4250d38c32"
            ],
            "accepted": [
                "6545c1d5809eea63dfc73f47",
                "6545e45698fe7f58fa524310"
            ],
            "createdAt": "2023-11-24T20:29:21.611Z",
            "updatedAt": "2023-11-24T20:29:21.611Z",
            "__v": 2
        }
      }
      ```