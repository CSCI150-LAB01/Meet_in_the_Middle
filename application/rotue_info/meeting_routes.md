# Meeting Routes
Add and Remove friends from friend list. Display friend list
  
## Get Suggestions
- Returns a list of suggestions given a search radius (in meters), a type of place, and a list of coordinates.
- 1-10 coordinate sets are accpeted.
- 1-5 types can be included in a request. The types use logical "or" relationship. 
- **Place Type Examples** amusement_park, art_gallery, bar, bowling_alley, cafe, campground, casino, clothing_store, department_store, gym, hair_care, movie_theater, museum, night_club, park, restaurant,shoe_store, shopping_mall, spa, zoo
- The full list of supported place types is available at: 
https://developers.google.com/maps/documentation/javascript/supported_types
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
        }
      ```
    - **Status 500**:
  
## Get Meeting (NOT WORKING)
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

## Create Meeting (NOT WORKING)
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


## Create Meeting Invite (NOT WORKING)
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

## Create Meeting (NOT WORKING)
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