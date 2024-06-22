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
### 1.2 GET /api/v1/user/get-current-user-info
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




## Developer
[Abhishek kumar](https://www.linkedin.com/in/alex21c/), ([Geekster](https://geekster.in/) MERN Stack FS-14 Batch)














