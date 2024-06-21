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
import CircularProgressInfinite from '../MUI/CirclularProgressInfinite/CircularProgressInfinite.jsx';
import { fetchThreadsCreatedByCurrentUser } from '../../Redux/Slices/threadsSlice.mjs';

export default function Thread({threadData=null, totalItems=null, idx=null, createdByOtherUser=false}){  


  const dispatch = useDispatch();

  const [stateApiReqMessage, setStateApiReqMessage] = useState('Wait...');
  const [stateMakingApiCallAfterBtnClick, setStateMakingApiCallAfterBtnClick] = React.useState(false);
  const auth = useSelector(store=>store.auth);  
  const user = useSelector(store=>store.user); 

  const theme = useSelector((store)=>store.theme);
    
  const refTextarea = useRef(null);
  const refDivVerticalLine =useRef(null);
  const refThreadBodyImage =useRef(null);

  // computing
    const createdByUserName = createdByOtherUser ? threadData.createdBy.username : user.data.username;
    const createdByUserProfileImage= createdByOtherUser ? threadData.createdBy.profileImage.url : user.data.profileImage.url;
  
  
  function handleTextareaChange(refTextarea,refDivVerticalLine,refThreadBodyImage ){
    try {    
      if(!refTextarea?.current){
        const previewImageScrollHeight = refThreadBodyImage?.current ? refThreadBodyImage.current.scrollHeight : 0;
        const decrement =  previewImageScrollHeight- Math.floor((90/100) * previewImageScrollHeight);        
        refDivVerticalLine.current.style.height  = Number(previewImageScrollHeight - decrement )+ "px";  

        
      }else{
        refTextarea.current.style.height = 'auto';
        refTextarea.current.style.height = refTextarea.current.scrollHeight + "px";
        const previewImageScrollHeight = refThreadBodyImage?.current ? refThreadBodyImage.current.scrollHeight : 0;
        const decrement = refTextarea.current.scrollHeight>100 ? 10 : 10;
    
        refDivVerticalLine.current.style.height  = Number(refTextarea.current.scrollHeight + previewImageScrollHeight - decrement )+ "px";  
      }
    } catch (error) {
      console.error(error.message);
    }    
        
  }
  const debouncedHandleTextareaChange = useCallback(
    Utils.debouce(
      (refTextarea,refDivVerticalLine,refThreadBodyImage)=>handleTextareaChange(refTextarea,refDivVerticalLine,refThreadBodyImage), 100
    ), [handleTextareaChange]
  );
   



  useEffect(()=>{
    // adjust height of vertical bar between users
    debouncedHandleTextareaChange(refTextarea,refDivVerticalLine,refThreadBodyImage);
  }, []);
    
  async function handleReqUnLikeThread(threadID=null){   
    // console.log(threadID) 
    try {
      if(!threadID){
        throw new Error("threadID not provided");
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
      dispatch(fetchThreadsCreatedByCurrentUser(auth));


    } catch (error) {
      console.error(process.env.REACT_APP_PREFIX_LOCALSTORAGE + "CustomError: " +error.message);
      return dispatch(openTheMuiSnackbar({message: "Failed to Un Like a Thread ! " + error.message, type: "error"})) ;
    }finally{
      setStateMakingApiCallAfterBtnClick(false);
      
      
    }
    

  }
  async function handleReqLikeThread(threadID=null){   
    // console.log(threadID) 
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

      // show success message
      dispatch(openTheMuiSnackbar({message: response.message, type: "success"})) ;
      dispatch(fetchThreadsCreatedByCurrentUser(auth));

    } catch (error) {
      console.error(process.env.REACT_APP_PREFIX_LOCALSTORAGE + "CustomError: " +error.message);
      return dispatch(openTheMuiSnackbar({message: "Failed to Like a Thread ! " + error.message, type: "error"})) ;
    }finally{
      setStateMakingApiCallAfterBtnClick(false);
      
      
    }
    

  }
  async function handleReqDeleteThread(threadID=null){   
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

    } catch (error) {
      console.error(process.env.REACT_APP_PREFIX_LOCALSTORAGE + "CustomError: " +error.message);
      return dispatch(openTheMuiSnackbar({message: "Failed to Delete a Thread ! " + error.message, type: "error"})) ;
    }finally{
      setStateMakingApiCallAfterBtnClick(false);
      
      
    }
    

  }


  return (
    <div className='flex flex-col '>
      <MuiSnackbar/>

      <div className="flex gap-[2rem]">
      <div  className='flex items-center flex-col w-[10%]'>
        <div className='w-[3rem]  overflow-hidden  ' >
          <img src={createdByUserProfileImage || process.env.REACT_APP_DEFAULT_USER_PROFILE_IMAGE_URL} alt="user profile image" className='w-[100%] rounded-full' />
        </div>
        <div ref={refDivVerticalLine} className='w-[.1rem] h-[2rem] my-[1rem]' style={{backgroundColor: theme.borderColor}}>

        </div>
        <div className='w-[1.5rem] overflow-hidden'>
          <img src={createdByUserProfileImage || process.env.REACT_APP_DEFAULT_USER_PROFILE_IMAGE_URL} alt="user profile image-small" 
          className="w-[100%] rounded-full " />
        </div>
      </div>

      <div className='w-[90%] flex flex-col gap-[1rem]'>
        <div className='flex gap-[1rem]'>
          <h3 className='font-medium'>{createdByUserName || "username"}</h3>
          <span style={{color: theme.secondaryText}}>
            {Utils.getRelativeTime(threadData.createdAt)}
          </span>
        </div>
        {
          threadData?.bodyText && 
          <textarea ref={refTextarea} defaultValue={threadData.bodyText} readOnly onChange={()=>debouncedHandleTextareaChange(refTextarea,refDivVerticalLine,refThreadBodyImage)} type="text" style={{backgroundColor: "transparent", color: theme.primaryText}} className='w-[100%] outline-none font-normal text-[1rem] ' placeholder="Start a thread"/>
        }

        {


          threadData?.bodyImage?.url &&
          <div className='w-[50%]'>              
            <img  ref={refThreadBodyImage} src={threadData.bodyImage.url} alt="image upload by user"/>
          </div>

        }

        {    

          stateMakingApiCallAfterBtnClick ?
          <div className='self-end'>
            <CircularProgressInfinite message={stateApiReqMessage}/> 
          </div>
          :
          <div className='flex gap-[2rem] items-center'>
            <div>

              {threadData.likes.includes(user.data._id) ?
              <div className="flex gap-[.5rem] items-center text-red-600">
                <i className="fa-solid fa-heart text-[1.3rem] cursor-pointer" title="Like" onClick={()=>{handleReqUnLikeThread(threadData._id)}}></i>
                <span>{threadData.likes.length}</span>
              </div>
              
              :
              <div className="flex gap-[.5rem] items-center">              
                <i className="fa-light fa-heart text-[1.3rem] cursor-pointer" title="Like" onClick={()=>{handleReqLikeThread(threadData._id)}}></i>
                <span>{threadData.likes.length>0 && threadData.likes.length}</span>
              </div>
                            
              }
              
            </div>

            <i className="fa-light fa-comment text-[1.3rem] cursor-pointer" title="Reply"></i>
            <i className="fa-light fa-trash text-[1.3rem] cursor-pointer" title="Delete"
              onClick={()=>{handleReqDeleteThread(threadData._id)}}
            ></i>
          </div>

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