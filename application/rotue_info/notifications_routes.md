# Notifications
## Get Notifications
Get the User's notifications. Notifications have types that can be sorted after they have been downloaded.
- **Method**: <span style="color:lightgreen">GET</span>
- **Route**: <span style="color:lightgreen">api/user/notifications/:userId</span>
- **Body**:
- **Response**:
    - **Status 202**:
      ```json
        {
          NEEDS RESPONSE
        }
      ```
    - **Status 500**:

## Delete from the Inbox
Delete a single user notification from the inbox.
- **Method**: <span style="color:lightgreen">DELETE</span>
- **Route**: <span style="color:lightgreen">api/user/notifications/:userId</span>
- **Body**:
  ```json
        {
          inboxId: "..."
        }
      ```
- **Response**:
    - **Status 202**:
      ```json
        {
          
        }
      ```
    - **Status 500**: