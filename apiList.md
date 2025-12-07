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

PAGINATION

/feed?page=1&limit=10 => first 10 user from 1 - 10 => .skip(0)&.limit(10)

/feed?page=2&limit=10 => second 10 user from 11 - 20 => .skip(10)&.limit(10)

/feed?page=3&limit=10 => third 10 user from 21 - 30 => .skip(20)&.limit(10)

.skip() and .limit()
