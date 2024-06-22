# Threads Clone
![](thumbnail.png)
## Hosted Link
[Threads Clone](https://threads-clone-weld-ten.vercel.app/)

## About Threads
+ [Threads](https://threads.net/) is an online social media and social networking service operated by [Meta Platforms](https://en.wikipedia.org/wiki/Meta_Platforms).
+ Functionality is similar to Twitter, users can post text, images, and videos, as well as interact with other users' posts through replies, reposts, and likes.


## Member Features
### Create a New Thread
+ Thread can have: text, image

### Delete previously created self-Threads

### Like/Unlike other user threads


## Tech. Stack Used:
### Front End
+ [ReactJS](https://react.dev/)
+ [ReduxToolkit](https://redux-toolkit.js.org/) for global state management 
+ [React Router Dom](https://reactrouter.com/en/main/start/tutorial) for providing routing functionality
+ [Material UI](https://mui.com/material-ui/getting-started/)
+ [TailwindCSS](https://tailwindcss.com/)
+ [Google Fonts](https://fonts.google.com/)
+ [Font Awesome Icons](https://fontawesome.com/icons/)

## Back End
+ [MVC Framework](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
+ [ExpressJS](https://expressjs.com/) for Server Setup
+ [NodeJS](https://nodejs.org/en)
+ [MongoDB](https://www.mongodb.com) for Database
+ [JWT](https://jwt.io/) for JSON tokens
+ [Passport](https://www.passportjs.org/) for JWT Authentication
+ [Cloudinary](https://cloudinary.com/) for storing Media (images)
+ [Morgan](https://www.npmjs.com/package/morgan) for logging user requests
+ [Multer](https://www.npmjs.com/package/multer) for files upload
+ [Validator](https://www.npmjs.com/package/validator) for input validation


## How to install and run in yours local machine
```bash
npm install
npm start
```

## .env Files
### Front End
```javascript
REACT_APP_HIDE_SNACKBAR_AFTER_N_MILLISECONDS=4000
REACT_APP_PREFIX_LOCALSTORAGE=alex21cThreadsClone-
REACT_APP_SERVER_BASE_URL_LOCALHOST=http://localhost:4000
REACT_APP_SERVER_BASE_URL_RENDER=https://threadsclone-m3i6.onrender.com
REACT_APP_SERVER_BASE_URL=http://localhost:4000
REACT_APP_PRJ_NAME="Threads Clone"
REACT_APP_DEFAULT_USER_PROFILE_IMAGE_URL=https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718603004/SharedResources/a7syt68cd0kyj3tiyhux.png
```

### Back End
```javascript
PORT=4000
JWT_PRIVATE_KEY=ThreadsClone-PrivateKeyCreatedOn17JuneByAlex21C$
MONGODB_CONNECTION_STRING_LOCALHOST=mongodb://localhost:27017/ThreadsClone
MONGODB_CONNECTION_STRING_ATLAS=mlcToDo-get-yours-from-mongodb
USER_SESSION_EXPIRES_AFTER="1d"
CLOUDINARY_CLOUD_NAME=mlcToDo-get-yours-from-cloudinary
CLOUDINARY_API_KEY=mlcToDo-get-yours-from-cloudinary
CLOUDINARY_API_SECRET=mlcToDo-get-yours-from-cloudinary
MAX_ALLOWED_FILE_UPLOAD_SIZE_IN_KB=500
PRJ_NAME=ThreadsClone
DEFAULT_USER_PROFILE_IMAGE_URL=https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718603004/SharedResources/a7syt68cd0kyj3tiyhux.png
```
### Reference:
+ [Get Yours MONGODB_CONNECTION_STRING_ATLAS](https://www.mongodb.com/)
+ [Get Yours Cloudinary API_KEYS](https://cloudinary.com/)
  
### examples of valid expiry timestamps
```javascript
'2 days'  // 172800000
'1d'      // 86400000
'10h'     // 36000000
'2.5 hrs' // 9000000
'2h'      // 7200000
'1m'      // 60000
'5s'      // 5000
'1y'      // 31557600000
```


## Credits
i express my gratitude towards [Geekster](https://www.geekster.in/) for providing me opportunity to become MERN Stack developer and achieve my vision board Financial Freedom Goal! Apart from Geekster i express my gratitude towards:
+ [Divyansh Moonat](https://www.linkedin.com/in/divyanshmoonat/) Sir (Educator NodeJS/ExpressJS/MongoDB)
+ [Ankit Singh](https://www.linkedin.com/in/asingh88029/) Sir (Educator Assistant)
+ Manan Bansal Sir (For checking Assignments, projects and providing feedback)
+ Success Managers: Palak Bhardwaj Mam, Yatharth Sharma Sir, Aanchal Parnami Mam, Avinash Prakash Sir
+ Geekster Curriculum Team: for designing cutting edge ReactJs Curriculum along with real life industry standard assignments as projects
+ Geekster Administrative Team: for timely starting classes, providing concept videos and study material!



## API Endpoints
### Download Postman endpoints file 
+ [postman-api-endpoints.json](ThreadsClone.postman_collection.json)
### Server Base URL 
```javascript
LOCALHOST=http://localhost:4000
RENDER=https://threadsclone-m3i6.onrender.com
```

## 1. User Endpoints
### 1.1 POST /api/v1/user/register
### Purpose:
Create new User Account.
### Request Body:
```javascript
JSON BODY
{
"firstName" : "abhishek",
"lastName" : "kumar", 
"email" : "abhishek@alex21c.com", 
"mobile" : "01234567893", 
"username" : "admin", 
"password" : "admin123", 
"bio" : "MERN Stack Developer", 
"customLink" : "https://www.alex21c.com"
}

```
### Response Success:
```javascript
JSON
{
    "success": true,
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2NjUyYWFhN2UwMDQ0MzNjMGRhNzkiLCJmaXJzdE5hbWUiOiJhYmhpc2hlayIsImlhdCI6MTcxOTAzNTE3OCwiZXhwIjoxNzE5MTIxNTc4fQ.EKvFT1Mwfk3IMv36ezsc0CMma7GDojtjgnSW5mYxPds"
}
```
### Response failure:
```javascript
JSON
{
    "success": false,
    "message": "username already exist!"
}
```
### 1.2 POST /api/v1/user/login
### Purpose:
Authentication, Sign-In user
### Request Body:
```javascript
JSON BODY
{
 "usernameOrEmailOrMobile": "admin",
 "password": "admin123"
}

```
### Response Success:
```javascript
JSON
{
    "success": true,
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2NjUyYWFhN2UwMDQ0MzNjMGRhNzkiLCJmaXJzdE5hbWUiOiJhYmhpc2hlayIsImlhdCI6MTcxOTAzNTMwNywiZXhwIjoxNzE5MTIxNzA3fQ.3xybR40j3E-n0Qs5LrC0dGBmb3fO01JO5MGU83Y-Z_E"
}
```
### 1.3 GET /api/v1/user/get-current-user-info
### Purpose:
Get current user document from database, after excluding password, Useful for fetching what users follows, likes, profileImage and name etc.
### Request Body:
```javascript
HEADERS
Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2NjUyYWFhN2UwMDQ0MzNjMGRhNzkiLCJmaXJzdE5hbWUiOiJhYmhpc2hlayIsImlhdCI6MTcxOTAzNTMwNywiZXhwIjoxNzE5MTIxNzA3fQ.3xybR40j3E-n0Qs5LrC0dGBmb3fO01JO5MGU83Y-Z_E
```
### Response Success:
```javascript
JSON
{
    "success": true,
    "data": {
        "_id": "6676652aaa7e004433c0da79",
        "firstName": "abhishek",
        "lastName": "kumar",
        "email": "abhishek@alex21c.com",
        "mobile": "01234567893",
        "username": "admin",
        "bio": "MERN Stack Developer",
        "profileImage": {
            "public_id": null,
            "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718603004/SharedResources/a7syt68cd0kyj3tiyhux.png"
        },
        "customLink": "https://www.alex21c.com",
        "followers": [],
        "following": [],
        "likedThreads": [],
        "createdAt": "2024-06-22T05:46:18.595Z",
        "updatedAt": "2024-06-22T05:46:18.595Z",
        "__v": 0
    }
}
```


## 2. Thread Endpoints
### 2.1 POST /api/v1/thread/create-new-thread
### Purpose:
Create a new Thread
### Request Body:
Either bodyText or BodyImage is required, or can provide both !
```javascript
HEADERS
Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2NjUyYWFhN2UwMDQ0MzNjMGRhNzkiLCJmaXJzdE5hbWUiOiJhYmhpc2hlayIsImlhdCI6MTcxOTAzNTMwNywiZXhwIjoxNzE5MTIxNzA3fQ.3xybR40j3E-n0Qs5LrC0dGBmb3fO01JO5MGU83Y-Z_E

FORM-DATA
bodyImage : Image File
bodyText : my very first thread !
```
### Response Success:
```javascript
JSON
{
    "success": true,
    "message": "Thread Created Successfully !",
    "threadID": "6676685caa7e004433c0da7f"
}
```
### 2.2 PUT /api/v1/thread/like-a-thread
### Purpose:
Like a Thread
### Request Body:
```javascript
HEADERS
Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2NjUyYWFhN2UwMDQ0MzNjMGRhNzkiLCJmaXJzdE5hbWUiOiJhYmhpc2hlayIsImlhdCI6MTcxOTAzNTMwNywiZXhwIjoxNzE5MTIxNzA3fQ.3xybR40j3E-n0Qs5LrC0dGBmb3fO01JO5MGU83Y-Z_E

JSON BODY
{
 "threadID" :  "6676685caa7e004433c0da7f"
}
```
### Response Success:
```javascript
JSON
{
    "success": true,
    "message": "Liked Successfully !",
    "totalLikes": 1
}
```
### 2.3 PUT /api/v1/thread/unlike-a-thread
### Purpose:
Unlike a Thread
### Request Body:
```javascript
HEADERS
Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2NjUyYWFhN2UwMDQ0MzNjMGRhNzkiLCJmaXJzdE5hbWUiOiJhYmhpc2hlayIsImlhdCI6MTcxOTAzNTMwNywiZXhwIjoxNzE5MTIxNzA3fQ.3xybR40j3E-n0Qs5LrC0dGBmb3fO01JO5MGU83Y-Z_E

JSON BODY
{
 "threadID" :  "6676685caa7e004433c0da7f"
}
```
### Response Success:
```javascript
JSON
{
    "success": true,
    "message": "Un-Liked Successfully !",
    "totalLikes": 0
}
```
### 2.4 PUT /api/v1/thread/delete-a-thread
### Purpose:
Delete a Thread, iff created by current user
### Request Body:
```javascript
HEADERS
Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2NjUyYWFhN2UwMDQ0MzNjMGRhNzkiLCJmaXJzdE5hbWUiOiJhYmhpc2hlayIsImlhdCI6MTcxOTAzNTMwNywiZXhwIjoxNzE5MTIxNzA3fQ.3xybR40j3E-n0Qs5LrC0dGBmb3fO01JO5MGU83Y-Z_E

JSON BODY
{
 "threadID" :  "6676699aaa7e004433c0da93"
}
```
### Response Success:
```javascript
JSON
{
    "success": true,
    "message": "Thread Deleted Successfully !"
}
```
### 2.5 GET /api/v1/thread/get-all-the-threads-created-by-current-user
### Purpose:
Get all the threads created by current user
### Request Body:
```javascript
HEADERS
Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2NjUyYWFhN2UwMDQ0MzNjMGRhNzkiLCJmaXJzdE5hbWUiOiJhYmhpc2hlayIsImlhdCI6MTcxOTAzNTMwNywiZXhwIjoxNzE5MTIxNzA3fQ.3xybR40j3E-n0Qs5LrC0dGBmb3fO01JO5MGU83Y-Z_E
```
### Response Success:
```javascript
JSON
{
    "success": true,
    "data": [
        {
            "_id": "6676685caa7e004433c0da7f",
            "bodyText": "my very first thread !",
            "createdBy": "6676652aaa7e004433c0da79",
            "likes": [],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "createdAt": "2024-06-22T05:59:56.419Z",
            "updatedAt": "2024-06-22T06:04:18.357Z",
            "__v": 2
        },
        {
            "_id": "66766992aa7e004433c0da90",
            "bodyText": "this is my second thread !",
            "createdBy": "6676652aaa7e004433c0da79",
            "likes": [],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "createdAt": "2024-06-22T06:05:06.120Z",
            "updatedAt": "2024-06-22T06:05:06.120Z",
            "__v": 0
        }
    ]
}
```
### 2.6 GET /api/v1/thread/get-homepage-threads-for-current-user
### Purpose:
Get all the threads from the users who have been followed by current user, if not followed anyone then return threads created by default admin alex21c
### Request Body:
```javascript
HEADERS
Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2NjUyYWFhN2UwMDQ0MzNjMGRhNzkiLCJmaXJzdE5hbWUiOiJhYmhpc2hlayIsImlhdCI6MTcxOTAzNTMwNywiZXhwIjoxNzE5MTIxNzA3fQ.3xybR40j3E-n0Qs5LrC0dGBmb3fO01JO5MGU83Y-Z_E
```
### Response Success:
```javascript
JSON
{
    "success": true,
    "data": [
        {
            "_id": "6676438bed5ed6cca2a2104d",
            "bodyText": "fixing cors !",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "66764d7b728191936767a72a"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "createdAt": "2024-06-22T03:22:51.490Z",
            "updatedAt": "2024-06-22T04:06:17.400Z",
            "__v": 1
        },
        {
            "_id": "6675aab340f4b79245e13c2a",
            "bodyText": "To be Financially Free Myself, \r\nand to server Under-Employed individuals to achieve Financial Freedom !",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3",
                "6675c513bcc7815d7e380ddc"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "createdAt": "2024-06-21T16:30:43.918Z",
            "updatedAt": "2024-06-21T18:23:34.456Z",
            "__v": 2
        },
        {
            "_id": "6675aa7f40f4b79245e13c25",
            "bodyText": "Private Limited Companies: \r\nStock Market, \r\nRental Real Estate,\r\nFinancial Education,\r\nFranchises",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675aa7f40f4b79245e13c25/bodyImage-zPt72by76.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987391/ThreadsClone/alex21c-threads/6675aa7f40f4b79245e13c25/bodyImage-zPt72by76.png.png"
            },
            "createdAt": "2024-06-21T16:29:53.861Z",
            "updatedAt": "2024-06-21T16:31:12.503Z",
            "__v": 1
        },
        {
            "_id": "6675aa4740f4b79245e13c20",
            "bodyText": "Orchard !",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675aa4740f4b79245e13c20/bodyImage--H2UqRBdy.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987336/ThreadsClone/alex21c-threads/6675aa4740f4b79245e13c20/bodyImage--H2UqRBdy.png.png"
            },
            "createdAt": "2024-06-21T16:28:59.035Z",
            "updatedAt": "2024-06-21T16:31:11.118Z",
            "__v": 1
        },
        {
            "_id": "6675aa2f40f4b79245e13c1b",
            "bodyText": "Land in Porsche Area",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675aa2f40f4b79245e13c1b/bodyImage-khvFVldGD.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987312/ThreadsClone/alex21c-threads/6675aa2f40f4b79245e13c1b/bodyImage-khvFVldGD.png.png"
            },
            "createdAt": "2024-06-21T16:28:35.609Z",
            "updatedAt": "2024-06-21T16:31:09.472Z",
            "__v": 1
        },
        {
            "_id": "6675aa1740f4b79245e13c16",
            "bodyText": "Harley Davidson 48",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675aa1740f4b79245e13c16/bodyImage-4JeAsG9Es.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987288/ThreadsClone/alex21c-threads/6675aa1740f4b79245e13c16/bodyImage-4JeAsG9Es.png.png"
            },
            "createdAt": "2024-06-21T16:28:11.470Z",
            "updatedAt": "2024-06-21T16:31:07.987Z",
            "__v": 1
        },
        {
            "_id": "6675a9fc40f4b79245e13c11",
            "bodyText": "Trading Setup !",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675a9fc40f4b79245e13c11/bodyImage-IZGVHOd2p.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987261/ThreadsClone/alex21c-threads/6675a9fc40f4b79245e13c11/bodyImage-IZGVHOd2p.png.png"
            },
            "createdAt": "2024-06-21T16:27:44.680Z",
            "updatedAt": "2024-06-21T16:31:06.540Z",
            "__v": 1
        },
        {
            "_id": "6675a9e940f4b79245e13c0c",
            "bodyText": "Dell Alienware Area 51 MR2 Laptop",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675a9e940f4b79245e13c0c/bodyImage-WNLN0WFBI.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987242/ThreadsClone/alex21c-threads/6675a9e940f4b79245e13c0c/bodyImage-WNLN0WFBI.png.png"
            },
            "createdAt": "2024-06-21T16:27:24.905Z",
            "updatedAt": "2024-06-21T16:31:05.618Z",
            "__v": 1
        },
        {
            "_id": "6675a9be40f4b79245e13c07",
            "bodyText": "Whole family Health Insurance !",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675a9be40f4b79245e13c07/bodyImage-xYHHV5Nzw.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987200/ThreadsClone/alex21c-threads/6675a9be40f4b79245e13c07/bodyImage-xYHHV5Nzw.png.png"
            },
            "createdAt": "2024-06-21T16:26:42.730Z",
            "updatedAt": "2024-06-21T16:31:03.084Z",
            "__v": 1
        },
        {
            "_id": "6675a9a040f4b79245e13c02",
            "bodyText": "Emergency Fund !",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675a9a040f4b79245e13c02/bodyImage-gmAg4KdLM.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987169/ThreadsClone/alex21c-threads/6675a9a040f4b79245e13c02/bodyImage-gmAg4KdLM.png.png"
            },
            "createdAt": "2024-06-21T16:26:12.575Z",
            "updatedAt": "2024-06-21T16:31:01.520Z",
            "__v": 1
        },
        {
            "_id": "6675a98a40f4b79245e13bfd",
            "bodyText": "999.9 MMTC PAMP Silver",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675a98a40f4b79245e13bfd/bodyImage-rYh7WM9UI.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987146/ThreadsClone/alex21c-threads/6675a98a40f4b79245e13bfd/bodyImage-rYh7WM9UI.png.png"
            },
            "createdAt": "2024-06-21T16:25:49.722Z",
            "updatedAt": "2024-06-21T16:31:00.179Z",
            "__v": 1
        },
        {
            "_id": "6675a97240f4b79245e13bf8",
            "bodyText": "24K MMTC PAMP Gold",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675a97240f4b79245e13bf8/bodyImage-o0B--3uvT.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987124/ThreadsClone/alex21c-threads/6675a97240f4b79245e13bf8/bodyImage-o0B--3uvT.png.png"
            },
            "createdAt": "2024-06-21T16:25:26.872Z",
            "updatedAt": "2024-06-21T16:30:58.775Z",
            "__v": 1
        },
        {
            "_id": "6675a95640f4b79245e13bf3",
            "bodyText": "Passive income from Rental Real Estate !",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675a95640f4b79245e13bf3/bodyImage-aqmH3RUwq.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987095/ThreadsClone/alex21c-threads/6675a95640f4b79245e13bf3/bodyImage-aqmH3RUwq.png.png"
            },
            "createdAt": "2024-06-21T16:24:58.341Z",
            "updatedAt": "2024-06-21T16:30:56.838Z",
            "__v": 1
        },
        {
            "_id": "6675a92f40f4b79245e13bee",
            "bodyText": "Stock Market Passive Income !",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675a92f40f4b79245e13bee/bodyImage-lU8mlwVtR.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987056/ThreadsClone/alex21c-threads/6675a92f40f4b79245e13bee/bodyImage-lU8mlwVtR.png.png"
            },
            "createdAt": "2024-06-21T16:24:19.124Z",
            "updatedAt": "2024-06-21T16:30:54.730Z",
            "__v": 1
        },
        {
            "_id": "6675a8fc40f4b79245e13be9",
            "bodyText": "porsche 911 Carrera4 GTS",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675a8fc40f4b79245e13be9/bodyImage-bz0dCFlmE.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718987004/ThreadsClone/alex21c-threads/6675a8fc40f4b79245e13be9/bodyImage-bz0dCFlmE.png.png"
            },
            "createdAt": "2024-06-21T16:23:27.609Z",
            "updatedAt": "2024-06-21T16:30:52.303Z",
            "__v": 1
        },
        {
            "_id": "6675a88e40f4b79245e13bde",
            "bodyText": "World Tour !",
            "createdBy": {
                "_id": "6675a61ce6d62838497e55a3",
                "username": "alex21c",
                "profileImage": {
                    "public_id": null,
                    "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986666/SharedResources/Star_qudgtj.png"
                }
            },
            "likes": [
                "6675a61ce6d62838497e55a3"
            ],
            "replies": [],
            "replyBelongsToThisThreadID": null,
            "bodyImage": {
                "public_id": "ThreadsClone/alex21c-threads/6675a88e40f4b79245e13bde/bodyImage-pFfzVLpp-.png",
                "url": "https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718986895/ThreadsClone/alex21c-threads/6675a88e40f4b79245e13bde/bodyImage-pFfzVLpp-.png.png"
            },
            "createdAt": "2024-06-21T16:21:38.497Z",
            "updatedAt": "2024-06-21T16:22:32.492Z",
            "__v": 1
        }
    ]
}
```





## Developer
[Abhishek kumar](https://www.linkedin.com/in/alex21c/), ([Geekster](https://geekster.in/) MERN Stack FS-14 Batch)














