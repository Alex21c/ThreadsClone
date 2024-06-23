import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeMuiModalCreateNewThread } from '../../../Redux/Slices/muiModalCreateNewThreadSlice.mjs';
import { useRef } from 'react';
import Utils from '../../../Utils.mjs';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { openTheMuiSnackbar, closeTheMuiSnackbar } from '../../../Redux/Slices/muiSnackbarSlice.mjs';
import MuiSnackbar from '../MuiSnackbar/MuiSnackbar.jsx';
import CircularProgressInfinite from '../CirclularProgressInfinite/CircularProgressInfinite';
import API_ENDPOINTS from '../../../config.mjs';
import { fetchThreadsCreatedByCurrentUser } from '../../../Redux/Slices/threadsSlice.mjs';

export default function MuiModalCreateNewThread(){
  const auth = useSelector(store=>store.auth);  
  const user = useSelector(store=>store.user);  
  const userProfileImage = user?.data?.profileImage?.url || null;
  const dispatch = useDispatch();
  const open = useSelector((store)=>store.muiModalCreateNewThread.open);

  
  
  const handleClose = () => dispatch(closeMuiModalCreateNewThread());
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
   

  function handleXBtnClick(event){
    setStatePreviewImageSrc("");      
    // remove the file from the list
    if(refInputFile?.current?.files){
      refInputFile.current.value="";
    }

  }

  function handleReqImageUpload(){
    refInputFile.current.focus();
    refInputFile.current.click();
  }

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

  async function handleReqCreateANewPost(){

    // fetch bodyImage, iff any
      let bodyImage = null;
      if(refInputFile?.current?.files[0]){
        bodyImage = refInputFile.current.files[0];
      }
    
    // fetch body Text
      const bodyText=refTextarea.current.value;

    // if both body image and text are empty then just return
      if(bodyImage === null && bodyText === ''){
        return dispatch(openTheMuiSnackbar({message: "Kindly provide either any text or image as thread!", type: "info"}));        
      }


    try {      
      // make an api req to the server using form-data 
      /// hide the post button and show the spinner in place of it              
        setStatePosting(true);

      // i need to make send request to backend to authenticate
        const formData = new FormData();
        if(bodyImage){
          formData.append('bodyImage', bodyImage);
        }
        formData.append('bodyText', bodyText);
      
        const headers = {          
          "Authorization": auth.authorization
        };
        
        const requestOptions = {
          method: "POST",
          headers: headers,
          body: formData
        };
  
  
        const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Thread['create-new-thread']}`;
        

        let response = await fetch(reqURL, requestOptions);        

        if(!response){
          return dispatch(openTheMuiSnackbar({message: "Unable to Post Thread!", type: "error"}));                    
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
        refInputFile.current.value="";
        setStatePreviewImageSrc("");
        async function closeTheModal(){
          return new Promise((resolve, rejected)=>{
            setTimeout(()=>{
              handleClose();
              resolve();

            }, 3000)

          });
        };
        await closeTheModal();

      // refresh the threads
      dispatch(fetchThreadsCreatedByCurrentUser(auth));
        


      
    } catch (error) {      
      console.log(error.message);
      dispatch(openTheMuiSnackbar({message: "Unable to Post a Thread, please try again after some time!", type: "error"}));      
    } finally{
      // operation completed
        setStatePosting(false);
    }
               

    
  
    
    
  }

  useEffect(()=>{
    // adjust height of vertical bar between users
    debouncedHandleTextareaChange(refTextarea,refDivVerticalLine,refImageUploadByUser);
    dispatch(closeTheMuiSnackbar());
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
        open={open}
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
        <Box sx={style} className={`outline-none p-[.8rem] border rounded-xl  cursor-pointer hover:border-[blue-300]  w-[35rem]  flex flex-col `} >
          
          <h2 className='self-center top-[-1.3rem] relative font-semibold text-[1.1rem]'>New thread</h2>
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
              <textarea ref={refTextarea} onChange={()=>debouncedHandleTextareaChange(refTextarea,refDivVerticalLine,refImageUploadByUser)} type="text" style={{backgroundColor: "transparent", color: theme.primaryText}} className='w-[100%] outline-none font-normal text-[1rem] ' placeholder="Start a thread"/>

              {
                statePreviewImageSrc !== "" ?
                <div className='relative'>              
                  <i className="cursor-pointer absolute right-[.5rem] top-[.5rem] fa-sharp fa-regular fa-xmark text-[1rem] text-white py-[.2rem] px-[.7rem] rounded-full bg-black hover:bg-white transition hover:text-black" onClick={(event)=>{handleXBtnClick(event)}}></i>
                  <img ref={refImageUploadByUser} src={statePreviewImageSrc} alt="image upload by user"/>
                </div>

              :
              <div className='flex gap-[.5rem] items-center cursor-pointer'  style={{color: theme.secondaryText}} onClick={()=>handleReqImageUpload()}>
                <i className="fa-solid fa-image text-[1.5rem]" ></i>
                <span className='font-medium'>Add</span>
              </div>
              }

              {
                statePosting ? 
                <div className='self-end'>
                  <CircularProgressInfinite /> 
                </div>
                :
                <button className='px-[1rem] py-[.5rem]  border-[.1rem] rounded-xl w-[5rem] self-end' style={{borderColor:theme.borderColor}} onClick={()=>handleReqCreateANewPost()}>Post</button>
              }
              <input ref={refInputFile} type="file" className='invisible absolute' onChange={()=>handleInputImageFileChange()}/>


            </div>
          </div>
          

          <MuiSnackbar/>
        </Box>
      </Modal>
    </div>
  );
}