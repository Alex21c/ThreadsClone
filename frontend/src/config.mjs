const API_ENDPOINTS = {
  "User": {
    register : "/api/v1/user/register",
    login : "/api/v1/user/login",    
    handshake : "/api/v1/user/handshake-hello",    
    "get-current-user-info" : "/api/v1/user/get-current-user-info"  
  },
  "Thread": {
    'create-new-thread': "/api/v1/thread/create-new-thread",
    'like-a-thread': "/api/v1/thread/like-a-thread",
    'unlike-a-thread': "/api/v1/thread/unlike-a-thread",
    'delete-a-thread': "/api/v1/thread/delete-a-thread",
    'get-specific-thread': "/api/v1/thread/get-specific-thread",
    'get-all-the-threads-created-by-current-user': "/api/v1/thread/get-all-the-threads-created-by-current-user",
    'get-homepage-threads-for-current-user': "/api/v1/thread/get-homepage-threads-for-current-user"
  },
  "Reply":{
    "create-new-reply": "/api/v1/reply/create-new-reply",
    "get-all-the-replies-made-by-current-user": "/api/v1/reply/get-all-the-replies-made-by-current-user",
    "delete-a-reply": "/api/v1/reply/delete-a-reply"
  }
};

export default API_ENDPOINTS;