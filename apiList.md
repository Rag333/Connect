#connect APIS

(AUTH-ROUTER)

- /POST/SIGNUP
- /POST/LOGIN
- /POST/LOGOUT

(PROFILE-ROUTER)

- GET/PROFILE/view
- PATCH/PROFILE/edit
- PATCH/PROFILE/password

- status - ignored/interested/accepted/rejected

(CONNECTION-REQUEST-ROUTER)

- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId
- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

(USER-ROUTER)

- GET/user/connections
- GET/user/requests
- GET/user/FEED - gets you the profile of other user on the platform
