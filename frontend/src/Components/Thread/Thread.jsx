import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import Utils from '../../Utils.mjs';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import MuiSnackbar from '../MUI/MuiSnackbar/MuiSnackbar.jsx';
import { closeTheMuiSnackbar, openTheMuiSnackbar } from '../../Redux/Slices/muiSnackbarSlice.mjs';
import API_ENDPOINTS from '../../config.mjs';
import { fetchThreadsCreatedByCurrentUser } from '../../Redux/Slices/threadsSlice.mjs';
import { fetchThreadsForHomepage } from '../../Redux/Slices/threadsSlice.mjs';
import ThreadSegment from './ThreadSegment.jsx';
import { useNavigate } from "react-router-dom";
import { fetchSpecificThread } from '../../Redux/Slices/threadsSlice.mjs';
import { fetchRepliesMadeByCurrentUser } from '../../Redux/Slices/replySlice.mjs';
import { fetchSpecificUserInfo } from '../../Redux/Slices/userSlice.mjs';
import { fetchSpecificUserThreads } from '../../Redux/Slices/threadsSlice.mjs';
import { fetchSpecificUserReplies } from '../../Redux/Slices/replySlice.mjs';

export default function Thread({threadData=null, totalItems=null, idx=null, createdByOtherUser=false, wantOnlySelfReplyLatestOne=false, isItSpecificThreadPage=false, wantToSeeReplyBelongsToThisThreadID=false, username=null}){  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stateApiReqMessage, setStateApiReqMessage] = useState('Wait...');
  const [stateMakingApiCallAfterBtnClick, setStateMakingApiCallAfterBtnClick] = React.useState(false);
  const auth = useSelector(store=>store.auth);  
  const user = useSelector(store=>store.user); 
  const theme = useSelector((store)=>store.theme);
  const threads = useSelector((store)=>store.threads);
  
      
  const refDivVerticalLine =useRef(null);  
  const refThread = useRef(null);

    async function handleReqUnLikeThread(threadID=null, threads=null, isItSpecificThreadPage=false, username=null){   
    // console.log(threadID) 
    try {
      if(!threadID){
        throw new Error("threadID not provided");
      }else if(!threads){
        throw new Error('threads not provided');
      }
      setStateMakingApiCallAfterBtnClick(true);
      setStateApiReqMessage("Un-Liking...");

      const headers = {          
        "Authorization": auth.authorization,
        "Content-Type": "application/json"
      };
      const data ={      
        "threadID" : threadID
      };    
      const requestOptions = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
      };
      
      const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Thread['unlike-a-thread']}`;    
    // console.log(reqURL);
      
      let response = await fetch(reqURL, requestOptions);  
      
      if(!response){
        throw new Error("No response!");
      }     
      response = await response.json();    
      if(!response.success){
        throw new Error(response.message);
      }

      // show success message
      dispatch(openTheMuiSnackbar({message: response.message, type: "success"}));
      // now here the question is, does user likes thread of his own or any other user
      // does this thread belogs to user?
      const isThreadCreatedByCurrentUser = threads?.threadsCreatedByCurrentUser?.some(thread => thread._id === threadID);
      if(isThreadCreatedByCurrentUser){
        dispatch(fetchThreadsCreatedByCurrentUser(auth));
      } else{
        // if it is of any other user then, it would be on homepage of any other users,
        // now lets try to make fetch req
          dispatch(fetchThreadsForHomepage(auth));
      }
      
      if(isItSpecificThreadPage){
        const threadID = threads.specificThread._id;
        dispatch(
          fetchSpecificThread({threadID, auth, navigate})
        )
      }

      if(username){
        dispatch(fetchSpecificUserInfo({auth, username, navigate}));
        dispatch(fetchSpecificUserThreads({auth, username}));          
        dispatch(fetchSpecificUserReplies({auth, username}));          
      }else{
        dispatch(
          fetchRepliesMadeByCurrentUser(auth)
        );
  
      }

    } catch (error) {
      console.error(process.env.REACT_APP_PREFIX_LOCALSTORAGE + "CustomError: " +error.message);
      return dispatch(openTheMuiSnackbar({message: "Failed to Un Like a Thread ! " + error.message, type: "error"})) ;
    }finally{
      setStateMakingApiCallAfterBtnClick(false);
      
      
    }
    

  }
  async function handleReqLikeThread(threadID=null, isItSpecificThreadPage=false, username=null){   
    // console.log(`liking ${threadID}`) ;
    try {
      if(!threadID){
        throw new Error("threadID not provided");
      }
      setStateMakingApiCallAfterBtnClick(true);
      setStateApiReqMessage("Liking...");

      const headers = {          
        "Authorization": auth.authorization,
        "Content-Type": "application/json"
      };
      const data ={      
        "threadID" : threadID
      };    
      const requestOptions = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
      };
      
      const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Thread['like-a-thread']}`;    
    // console.log(reqURL);
      
      let response = await fetch(reqURL, requestOptions);  
      
      if(!response){
        throw new Error("No response!");
      }     
      response = await response.json();    
      if(!response.success){
        throw new Error(response.message);
      }
      // console.log(response);

      // show success message
      dispatch(openTheMuiSnackbar({message: response.message, type: "success"})) ;
      
      // does this thread belogs to user?
      const isThreadCreatedByCurrentUser = threads?.threadsCreatedByCurrentUser?.some(thread => thread._id === threadID);
      

      if(isThreadCreatedByCurrentUser){
        dispatch(fetchThreadsCreatedByCurrentUser(auth));
      } else{
        // if it is of any other user then, it would be on homepage of any other users,
        // now lets try to make fetch req
          dispatch(fetchThreadsForHomepage(auth));
      }  
      if(isItSpecificThreadPage){
        const threadID = threads.specificThread._id;
        dispatch(
          fetchSpecificThread({threadID, auth, navigate})
        )
      }


      
      if(username){
        dispatch(fetchSpecificUserInfo({auth, username, navigate}));
        dispatch(fetchSpecificUserThreads({auth, username}));          
        dispatch(fetchSpecificUserReplies({auth, username}));          
      }else{
        dispatch(
          fetchRepliesMadeByCurrentUser(auth)
        );
  
      }

    } catch (error) {
      console.error(process.env.REACT_APP_PREFIX_LOCALSTORAGE + "CustomError: " +error.message);
      return dispatch(openTheMuiSnackbar({message: "Failed to Like a Thread ! " + error.message, type: "error"})) ;
    }finally{
      setStateMakingApiCallAfterBtnClick(false);
      
      
    }
    

  }
  async function handleReqDeleteThread(threadID=null, isItSpecificThreadPage=false){   
    // console.log(threadID) 
    try {
      if(!threadID){
        throw new Error("threadID not provided");
      }
      setStateMakingApiCallAfterBtnClick(true);
      setStateApiReqMessage("Deleting...");

      const headers = {          
        "Authorization": auth.authorization,
        "Content-Type": "application/json"
      };
      const data ={      
        "threadID" : threadID
      };    
      const requestOptions = {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data)
      };
      
      const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Thread['delete-a-thread']}`;    
    // console.log(reqURL);
      
      let response = await fetch(reqURL, requestOptions);  
      
      if(!response){
        throw new Error("No response!");
      }     
      response = await response.json();    
      if(!response.success){
        throw new Error(response.message);
      }

      // show success message
      dispatch(openTheMuiSnackbar({message: response.message, type: "success"})) ;
      dispatch(fetchThreadsCreatedByCurrentUser(auth));
      dispatch(fetchThreadsForHomepage(auth));

      if(isItSpecificThreadPage){
        const threadID = threads.specificThread._id;
        dispatch(
          fetchSpecificThread({threadID, auth, navigate})
        )
      }

      dispatch(
        fetchRepliesMadeByCurrentUser(auth)
      );      

    } catch (error) {
      console.error(process.env.REACT_APP_PREFIX_LOCALSTORAGE + "CustomError: " +error.message);
      return dispatch(openTheMuiSnackbar({message: "Failed to Delete a Thread ! " + error.message, type: "error"})) ;
    }finally{
      setStateMakingApiCallAfterBtnClick(false);
      
      
    }
    

  }
  async function handleReqDeleteReply(replyID=null, replyBelongsToThisThreadID=null,  isItSpecificThreadPage=false){   
    // console.log(`req made delete a reply ${replyID}` ) ;
    replyBelongsToThisThreadID = replyBelongsToThisThreadID?._id || replyBelongsToThisThreadID;
    try {
      if(!replyID){
        throw new Error("replyID not provided");
      }else if(!replyBelongsToThisThreadID){
        throw new Error("replyBelongsToThisThreadID not provided");
      }
      setStateMakingApiCallAfterBtnClick(true);
      setStateApiReqMessage("Deleting Reply...");

      const headers = {          
        "Authorization": auth.authorization,
        "Content-Type": "application/json"
      };
      const data ={      
        replyID,
        replyBelongsToThisThreadID,
         "req": "delete-a-reply"
      };    
      const requestOptions = {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data)
      };
      
      const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Reply['delete-a-reply']}`;    
    // console.log(reqURL);
      
      let response = await fetch(reqURL, requestOptions);  
      
      if(!response){
        throw new Error("No response!");
      }     
      response = await response.json();    
      if(!response.success){
        throw new Error(response.message);
      }

      // show success message
      dispatch(openTheMuiSnackbar({message: response.message, type: "success"})) ;
      dispatch(fetchThreadsCreatedByCurrentUser(auth));
      dispatch(fetchThreadsForHomepage(auth));

      if(isItSpecificThreadPage){
        const threadID = threads.specificThread._id;
        dispatch(
          fetchSpecificThread({threadID, auth, navigate})
        )
      }

      dispatch(
        fetchRepliesMadeByCurrentUser(auth)
      );        
    } catch (error) {
      console.error(process.env.REACT_APP_PREFIX_LOCALSTORAGE + "CustomError: " +error.message);
      return dispatch(openTheMuiSnackbar({message: "Failed to Delete a Reply ! " + error.message, type: "error"})) ;
    }finally{
      setStateMakingApiCallAfterBtnClick(false);
      
      
    }
    

  }

  // Replies specific
    let replies = [];

    // get all those replies which has been made by the user and, if present get the latest reply      
    if(wantOnlySelfReplyLatestOne){
      replies =  threadData?.replies?.filter((reply)=> reply.createdBy._id === user?.data?._id);
    }else{
      // can i get all the threads whose replyBelongsToThisThreadID current thread ID
      replies =  threadData.replies;
    }
    // console.log( threadData)

      
    
    function handleThreadAreaChange(refThread ){
      try {    
        if(!refThread?.current?.style){
          return;
        }
        refThread.current.style.height = 'auto';
        

          // const previewImageScrollHeight = refThreadBodyImage?.current ? refThreadBodyImage.current.scrollHeight : 0;
          let decrement = refThread.current.scrollHeight - ((85/100)*refThread.current.scrollHeight);
          if(wantOnlySelfReplyLatestOne){
            decrement = refThread.current.scrollHeight - ((78/100)*refThread.current.scrollHeight);
          }          
          if(refDivVerticalLine?.current){
            // console.log('drawing the vertical thread line ...');
             refDivVerticalLine.current.style.height  = Number(refThread.current.scrollHeight - decrement )+ "px";  
          } 
        
      } catch (error) {
        console.error(error.message);
      }    
          
    }
    const debouncedHandleTextareaChange = useCallback(
      Utils.debounce(
        (refThread)=>handleThreadAreaChange(refThread), 100
      ), [handleThreadAreaChange]
      );
   
    
    useEffect(()=>{
      // adjust height of vertical bar between users
      debouncedHandleTextareaChange(refThread);
    }, [refThread?.current]);

  return (
    <div className='flex flex-col  w-[100%] pl-[2rem]'>      

      <div className="flex gap-[0rem]">
        <div  className='flex items-center flex-col'>
          {
            (threadData?.replies?.length > 0 &&  wantToSeeReplyBelongsToThisThreadID) &&
            <div key={threadData._id} ref={refDivVerticalLine} className='w-[.15rem] h-[2rem] my-[.5rem]' style={{backgroundColor: theme.borderColor}}/>            

          }
          

        </div>

        <div ref={refThread} className='flex flex-col  gap-[1rem] relative left-[-2rem] '>
          {
            wantToSeeReplyBelongsToThisThreadID && 
            <ThreadSegment threadData={threadData?.replyBelongsToThisThreadID}  handleReqUnLikeThread={handleReqUnLikeThread} handleReqLikeThread={handleReqLikeThread} handleReqDeleteThread={handleReqDeleteThread} handleReqDeleteReply={handleReqDeleteReply} theme={theme} user={user} threads={threads} navigate={navigate} dispatch={dispatch} auth={auth} username={username}
            />
          }
          <ThreadSegment threadData={threadData}  handleReqUnLikeThread={handleReqUnLikeThread} handleReqLikeThread={handleReqLikeThread} handleReqDeleteThread={handleReqDeleteThread} handleReqDeleteReply={handleReqDeleteReply} theme={theme} user={user} threads={threads} navigate={navigate} isItSpecificThreadPage={isItSpecificThreadPage} dispatch={dispatch} auth={auth} username={username}/>
          
          {            
            replies?.length>0 && replies.map(threadData => {
              // console.log(threadData);              
              return <ThreadSegment navigate={navigate} key={threadData._id} threadData={threadData} handleReqUnLikeThread={handleReqUnLikeThread} handleReqLikeThread={handleReqLikeThread} handleReqDeleteThread={handleReqDeleteThread} handleReqDeleteReply={handleReqDeleteReply} theme={theme} user={user} threads={threads} isItSpecificThreadPage={isItSpecificThreadPage}  dispatch={dispatch} auth={auth} username={username}/>

            }
              
               )
          }
          
        </div>
      </div>

      

      <div className='py-[1rem]'>
        {
        // do not want divider if it is last thread
          totalItems-1 !== idx &&
          <Divider flexItem orientation="horizontal"  className=" h-[.2rem]" style={{ backgroundColor: theme.borderColor }}/>
        }

      </div>
      
    
  </div>
  );
}