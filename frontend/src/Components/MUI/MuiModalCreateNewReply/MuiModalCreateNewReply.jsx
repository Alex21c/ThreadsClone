import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeMuiModalCreateNewReply } from '../../../Redux/Slices/muiModalCreateNewReplySlice.mjs';
import { useRef, useState } from 'react';
import Utils from '../../../Utils.mjs';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { openTheMuiSnackbar } from '../../../Redux/Slices/muiSnackbarSlice.mjs';
import MuiSnackbar from '../MuiSnackbar/MuiSnackbar.jsx';
import CircularProgressInfinite from '../CirclularProgressInfinite/CircularProgressInfinite.jsx';
import API_ENDPOINTS from '../../../config.mjs';
import { fetchThreadsCreatedByCurrentUser } from '../../../Redux/Slices/threadsSlice.mjs';
import { Divider } from '@mui/material';
import { fetchThreadsForHomepage } from '../../../Redux/Slices/threadsSlice.mjs';
import { fetchSpecificThread } from '../../../Redux/Slices/threadsSlice.mjs';
import { useNavigate } from 'react-router-dom';

export default function MuiModalCreateNewReply({isItHomepage= false, isItSpecificThreadPage=false}){
  const navigate = useNavigate();
  const [stateApiReqMessage, setStateApiReqMessage] = useState('Posting Yours Reply...');
  const auth = useSelector(store=>store.auth);  
  const user = useSelector(store=>store.user);  
  const threads = useSelector(store=>store.threads);  
  const muiModalCreateNewReply = useSelector(store=>store.muiModalCreateNewReply);  
  
  const userProfileImage = user?.data?.profileImage?.url || null;
  const dispatch = useDispatch();
   
  
  const handleClose = () => dispatch(closeMuiModalCreateNewReply());
  const theme = useSelector((store)=>store.theme);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderColor: theme.borderColor,
    p: 4,
    borderWidth: ".13rem",
    backgroundColor: theme.backgroundHover,
    color: theme.brightText,
    maxHeight: "90vh",
    overflowY: "auto"
  };
  
  const [statePreviewImageSrc, setStatePreviewImageSrc] = React.useState("");
  useEffect(()=>{    
    debouncedHandleTextareaChange(refTextarea,refDivVerticalLine,refImageUploadByUser);
  }, [statePreviewImageSrc]);
  const [statePosting, setStatePosting] = React.useState(false);


  const refTextarea = useRef(null);
  const refDivVerticalLine =useRef(null);
  const refImageUploadByUser =useRef(null);
  const refInputFile = useRef(null);

 


  function handleTextareaChange(refTextarea,refDivVerticalLine,refImageUploadByUser ){
    try {    
      if(!refTextarea?.current){
        return;
      }
      refTextarea.current.style.height = 'auto';
      refTextarea.current.style.height = refTextarea.current.scrollHeight + "px";
      const previewImageScrollHeight = refImageUploadByUser?.current ? refImageUploadByUser.current.scrollHeight : 0;
      const decrement = refTextarea.current.scrollHeight>100 ? 10 : 10;
  
      refDivVerticalLine.current.style.height  = Number(refTextarea.current.scrollHeight + previewImageScrollHeight - decrement )+ "px";  
    } catch (error) {
      console.error(error.message);
    }    
        
  }
  const debouncedHandleTextareaChange = useCallback(
    Utils.debouce(
      (refTextarea,refDivVerticalLine,refImageUploadByUser)=>handleTextareaChange(refTextarea,refDivVerticalLine,refImageUploadByUser), 100
    ), [handleTextareaChange]
  );
   


  function handleInputImageFileChange(){
    const file = refInputFile.current.files[0];
    
    if(file){
      const reader = new FileReader();      
      reader.onloadend = ()=>{       
        setStatePreviewImageSrc(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }

  async function handReqCreateANewReply(replyBelongsToThisThreadID=null){
   
    // fetch body Text
      const bodyText=refTextarea.current.value;
    

    // if both body image and text are empty then just return
      if(bodyText === ''){
        return dispatch(openTheMuiSnackbar({message: "Kindly provide reply Text", type: "info"}));        
      }else if (!replyBelongsToThisThreadID){
        console.log('required field is missing : replyBelongsToThisThreadID in params' );
        return;
      }


    try {      
      // make an api req to the server using form-data 
      /// hide the post button and show the spinner in place of it              
        setStatePosting(true);
        setStateApiReqMessage("Posting Yours Reply...");

        const data ={
          bodyText,
          replyBelongsToThisThreadID
        };

        const headers = {
          "Content-Type": "application/json",
          "Authorization": auth.authorization
        };
        
        const requestOptions = {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data)   
        };
  
  
        const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Reply['create-new-reply']}`;
        

        
        

        let response = await fetch(reqURL, requestOptions);        

        if(!response){
          return dispatch(openTheMuiSnackbar({message: "Unable to post Reply!", type: "error"}));                    
        }
        response = await response.json();        
      // if sucess: false
        if(!response.success){          
          return dispatch(openTheMuiSnackbar({message: response.message, type: "error"})); 
        }
      

      // show success messsage to user 
        dispatch(openTheMuiSnackbar({message: response.message, type: "success"})); 

    // close the modal
    /// clear image and textarea
        refTextarea.current.value = "";

        async function closeTheModal(){
          return new Promise((resolve, rejected)=>{
            setTimeout(()=>{
              handleClose();
              resolve();

            }, 2000)

          });
        };
        await closeTheModal();

      // refresh the threads
      dispatch(fetchThreadsCreatedByCurrentUser(auth));
      if(isItHomepage){
        dispatch(fetchThreadsForHomepage(auth));
      }

        
      if(isItSpecificThreadPage){
        const threadID = threads.specificThread._id;
        dispatch(
          fetchSpecificThread({threadID, auth, navigate})
        )
      }

      
    } catch (error) {      
      console.log(error.message);
      dispatch(openTheMuiSnackbar({message: "Unable to Post a Reply, please try again after some time!", type: "error"}));      
    } finally{
      // operation completed
        setStatePosting(false);
    }
               

    
  
    
    
  }

  useEffect(()=>{
    // adjust height of vertical bar between users
    debouncedHandleTextareaChange(refTextarea,refDivVerticalLine,refImageUploadByUser);
    setTimeout(()=>{

      if(refTextarea.current){
        refTextarea.current.focus();
        refTextarea.current.click();
      }

    }, 2000)
  }, []);
  


  return (
    <div>
      
      <Modal
        className='relative'
        open={muiModalCreateNewReply.open}
        onClose={handleClose}
        aria-labelledby="create a New Thread"
        aria-describedby="helps creating a new thread"
        slotProps={{
          backdrop: {
            sx: {
               backgroundColor: theme.background
            },
          },
        }}        
        
      >
        <Box sx={style} className={`outline-none p-[.8rem] border rounded-xl  cursor-pointer hover:border-[blue-300]  w-[35rem]  flex flex-col gap-[2rem]`} >
          
          <h2 className='font-bold self-center  relative text-[1.1rem]'>New Reply</h2>
        {/* Thread segment begin */}

        {
          muiModalCreateNewReply.replyingToThisThread?._id &&
          <div className='flex gap-[2rem]'  >        
            <div className='flex items-center flex-col w-[10%]'>
              <div className='w-[3rem]  overflow-hidden' >
                <img src={muiModalCreateNewReply.replyingToThisThread?.createdBy?.profileImage?.url} alt="user profile image" className='w-[100%] rounded-full' />
              </div>
            </div>
            <div className='w-[90%] flex flex-col gap-[1rem]'>
              <div className='flex gap-[1rem]'>
                <h3 style={{color:theme.primaryText}} className='font-medium'>{muiModalCreateNewReply.replyingToThisThread?.createdBy?.username} </h3>
                <span style={{color: theme.secondaryText}}>
                  {Utils.getRelativeTime(muiModalCreateNewReply.replyingToThisThread?.createdAt || null)}
                  
                </span>
              </div>
              {
                muiModalCreateNewReply.replyingToThisThread?.bodyText && 
                <p style={{backgroundColor: "transparent", color: theme.primaryText}} className='w-[100%] outline-none font-normal text-[1rem] '>
                  {muiModalCreateNewReply.replyingToThisThread.bodyText}
                </p>
              }

              {
                muiModalCreateNewReply.replyingToThisThread?.bodyImage?.url &&
                <div className='w-[50%]'>              
                  <img  src={muiModalCreateNewReply.replyingToThisThread.bodyImage.url} alt="image upload by user"/>
                </div>

              }

        
        
              


            </div>      
          </div>
        }

      {/* thread segment end */}
      {
        // do not want divider if it is last thread
          <Divider flexItem orientation="horizontal"  className=" h-[.2rem]" style={{ backgroundColor: theme.borderColor }}/>
        
        }


          <div className="flex gap-[2rem]">
            <div  className='flex items-center flex-col w-[10%]'>
              <div className='w-[3rem]  overflow-hidden  ' >
                <img src={userProfileImage || process.env.REACT_APP_DEFAULT_USER_PROFILE_IMAGE_URL} alt="user profile image" className='w-[100%] rounded-full' />
              </div>
              <div ref={refDivVerticalLine} className='w-[.1rem] h-[2rem] my-[1rem]' style={{backgroundColor: theme.borderColor}}>

              </div>
              <div className='w-[1.5rem] overflow-hidden'>
                <img src={userProfileImage || process.env.REACT_APP_DEFAULT_USER_PROFILE_IMAGE_URL} alt="user profile image-small" 
                className="w-[100%] rounded-full " />
              </div>
            </div>

            <div className='w-[90%] flex flex-col gap-[1rem]'>
              <h3 className='font-medium'>{user?.data?.username || "username"}</h3>
              <textarea ref={refTextarea} onChange={()=>debouncedHandleTextareaChange(refTextarea,refDivVerticalLine,refImageUploadByUser)} type="text" style={{backgroundColor: "transparent", color: theme.primaryText}} className='w-[100%] outline-none font-normal text-[1rem] ' placeholder={`Reply to ${muiModalCreateNewReply?.replyingToThisThread?.createdBy?.username}...`}/>



              {
                statePosting ? 
                <div className='self-end'>
                  <CircularProgressInfinite /> 
                </div>
                :
                <button className='px-[1rem] py-[.5rem] border-[.1rem] rounded-xl w-[5rem] self-end' style={{borderColor:theme.borderColor, color: theme.primaryText, backgroundColor: theme.background}} onClick={()=>handReqCreateANewReply(muiModalCreateNewReply?.replyingToThisThread?._id)}>Reply</button>
              }
              <input ref={refInputFile} type="file" className='invisible absolute' onChange={()=>handleInputImageFileChange()}/>


            </div>
          </div>
          

          
        </Box>
      </Modal>
    </div>
  );
}