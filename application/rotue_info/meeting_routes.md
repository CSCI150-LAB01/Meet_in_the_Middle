# Meeting Routes
[Get Suggestions](#get-suggestions) \
[Get Meetings](#get-meetings) | [Create Meeting](#create-meeting) | [Delete Meeting](#delete-meeting) \
[Get Meeting Invites](#get-meeting-invites) | [Send Meeting Invites](#send-meeting-invites) | [Reject Meeting Invite](#reject-meeting-invite) 
  
## Get Suggestions
- Returns a list of suggestions given a search radius (in meters), a type of place, and a list of coordinates.
- 1-10 coordinate sets are accepted.
- 1-5 types can be included in a request. The types use a logical "or" relationship.

**Place Type Examples:**
- amusement_park
- art_gallery
- bar
- bowling_alley
- cafe
- campground
- casino
- clothing_store
- department_store
- gym
- hair_care
- movie_theater
- museum
- night_club
- park
- restaurant
- shoe_store
- shopping_mall
- spa
- zoo

The **Full List** of supported place types is available at: [Google Maps Supported Types](https://developers.google.com/maps/documentation/javascript/supported_types)

- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">api/suggesstion</span>
- **Body**:
    ```json
    {
        "types": [
            "restaurant",
            "movie_theater"
        ]
        "radius" : 1000,
        "coordinates": [
            {
                "latitude": 40.7128, 
                "longitude" : -74.0060
            },
            {
                "latitude": 40.7128, 
                "longitude" : -74.0060
            },
            {
                "latitude": 40.7128, 
                "longitude" : -74.0060
            }
        ]  
    }
    ```
- **Response**:
    - **Status 200**:
      ```json
        {
        "results": [
            {
                "name": "The Frederick Hotel",
                "place_id": "ChIJYSjtGB9awokRvtwfGw4UEpc",
                "rating": 4.2,
                "types": [
                    "lodging",
                    "restaurant",
                    "point_of_interest",
                    "food",
                    "establishment"
            ],
                "user_ratings_total": 757,
                "vicinity": "95 West Broadway, New York"
            },
            {
                "name": "NOMO SOHO",
                "place_id": "ChIJM8mGj4lZwokRSbZBvNOVNKM",
                "rating": 4,
                "types": [
                    "lodging",
                    "restaurant",
                    "point_of_interest",
                    "food",
                    "establishment"
                ],
                "user_ratings_total": 1617,
                "vicinity": "9 Crosby Street, New York"
            },
            ...
            ...
            ...
        }
      ```

  
## Get Meetings
Returns a list of meetings where the user has accepted an invitation to. 
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">/user/friend-requests/:userId</span>
- **Body**:
- **Response**:
    - **Status 200**:
      ```json
      {
        "meetings": [
          {
            "_id": "656107982e5684c0dcaeac7d",
            "creatorId": "6545c1d5809eea63dfc73f47",
            "title": "Really Not Great Meeting",
            "placeId": "xChIJc_F6SZDglIARiwcdwXAqF1B",
            "pending": [],
            "denied": [],
            "accepted": [
                "6545c1d5809eea63dfc73f47"
            ],
            "createdAt": "2023-11-24T20:29:12.273Z",
            "updatedAt": "2023-11-24T20:29:12.273Z",
            "__v": 0
          },
          {
            "_id": "656107a12e5684c0dcaeac80",
            "creatorId": "6545c1d5809eea63dfc73f47",
            "title": "Really Not Great Meeting",
            "placeId": "xChIJc_F6SZDglIARiwcdwXAqF1B",
            "pending": [],
            "denied": [],
            "accepted": [
                "6545c1d5809eea63dfc73f47"
            ],
            "createdAt": "2023-11-24T20:29:21.611Z",
            "updatedAt": "2023-11-24T20:29:21.611Z",
            "__v": 0
          }
        ]
      }
      ```

## Create Meeting 
User creates a new meeting with a Google placeId, title of the meeting, and date and time the meeting will take place. The creator of the meeting is added to the accepted list.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/meeting/:userId</span>
- **Body**:
  ```json
    {
      "placeId" : "xChIJc_F6SZDglIARiwcdwXAqF1A",
      "title" : "Really Great Meeting",
      "dateTime" : "2012-04-23T18:25:43.511Z"
    }
  ```
- **Response**:
    - **Status 200**:
      ```json
      {
        "meeting": {
          "creatorId": "6545c1d5809eea63dfc73f47",
          "title": "Really Not Great Meeting",
          "placeId": "xChIJc_F6SZDglIARiwcdwXAqF1B",
          "pending": [],
          "denied": [],
          "accepted": [
            "6545c1d5809eea63dfc73f47"
          ],
          "_id": "656107a12e5684c0dcaeac80",
          "createdAt": "2023-11-24T20:29:21.611Z",
          "updatedAt": "2023-11-24T20:29:21.611Z",
          "__v": 0
        }
      }
      ```


## Delete Meeting
Remove a user's meeting from the database. The user Id is sent in the URL and the meeting Id is sent in the body.
- **Method**: <span style="color:lightgreen">POST</span>
- **Route**: <span style="color:lightgreen">/user/send-friend-request/:userId</span>
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
        "message": "deleted 656107982e5684c0dcaeac7d"
      }
      ```

## Get Meeting Invites
Get a list of meetings the user has been invited to.\
**NOTE:** Meeting Id is required, NOT the meeting invite ID
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
        "meeting": [
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
            "updatedAt": "2023-11-24T20:29:21.611Z"
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
        "message": "Successfully rejected meeting invite",
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