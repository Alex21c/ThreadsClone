import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeMuiModalCreateNewThreadSlice, openMuiModalCreateNewThreadSlice } from '../../../Redux/Slices/muiModalCreateNewThreadSlice.mjs';
import { useRef } from 'react';
import Utils from '../../../Utils.mjs';
import { useCallback } from 'react';
import { useEffect } from 'react';

export default function MuiModalCreateNewThread(){

  const dispatch = useDispatch();
  const open = useSelector((store)=>store.muiModalCreateNewThread.open);

  
  const handleOpen = () => dispatch(openMuiModalCreateNewThreadSlice());
  const handleClose = () => dispatch(closeMuiModalCreateNewThreadSlice());
  const theme = useSelector((store)=>store.theme);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderColor: theme.secondaryText,
    p: 4,
    borderWidth: ".13rem",
    backgroundColor: theme.backgroundHover,
    color: theme.brightText
  };

  const refTextarea = useRef(null);
  const refDivVerticalLine =useRef(null);
  const refImageUploadByUser =useRef(null);

  function handleTextareaChange(refTextarea,refDivVerticalLine,refImageUploadByUser ){
    refTextarea.current.style.height = 'auto';
    refTextarea.current.style.height = refTextarea.current.scrollHeight + "px";
    refDivVerticalLine.current.style.height  = Number(refTextarea.current.scrollHeight + refImageUploadByUser.current.scrollHeight - 75 )+ "px";  
     
  }
  const debouncedHandleTextareaChange = useCallback(
    Utils.debouce(
      (refTextarea,refDivVerticalLine,refImageUploadByUser)=>handleTextareaChange(refTextarea,refDivVerticalLine,refImageUploadByUser), 100
    ), [handleTextareaChange]
  );
   

  function handleXBtnClick(event){
    // clear & hide image
      refImageUploadByUser.current.src = "";
      refImageUploadByUser.current.style.display="none";
    // hide self
      event.target.style.display="none";
      debouncedHandleTextareaChange(refTextarea,refDivVerticalLine,refImageUploadByUser);

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
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker background color
            },
          },
        }}        
        
      >
        <Box sx={style} className={`outline-none p-[.8rem] border rounded-xl  cursor-pointer hover:border-[blue-300] relative w-[35rem]  flex flex-col reltative`} >
          <h2 className='font-bold self-center top-[-2rem] absolute'>New thread</h2>
          <div className="flex gap-[2rem]">
            <div  className='flex items-center flex-col w-[10%]'>
              <div className='w-[4rem]  overflow-hidden  ' >
                <img src="https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718603004/SharedResources/a7syt68cd0kyj3tiyhux.png" alt="user profile image" className='w-[100%] rounded-full' />
              </div>
              <div ref={refDivVerticalLine} className='w-[.2rem] h-[2rem] bg-gray-300 my-[1rem]'>

              </div>
              <div className='w-[2rem] overflow-hidden'>
                <img src="https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718603004/SharedResources/a7syt68cd0kyj3tiyhux.png" alt="user profile image-small" 
                className="w-[100%] rounded-full " />
              </div>
            </div>

            <div className='w-[90%]'>
              <h3 className='font-medium'>alex21c</h3>
              <textarea ref={refTextarea} onChange={()=>debouncedHandleTextareaChange(refTextarea,refDivVerticalLine,refImageUploadByUser)} type="text" style={{backgroundColor: "transparent", color: theme.primaryText}} className='w-[100%] outline-none' placeholder="Start a thread"/>

              <div className='relative'>              
                <i className="cursor-pointer absolute right-[.5rem] top-[.5rem] fa-sharp fa-regular fa-xmark text-[1rem] text-white py-[.2rem] px-[.7rem] rounded-full bg-black hover:bg-white transition hover:text-black" onClick={(event)=>{handleXBtnClick(event)}}></i>
                <img ref={refImageUploadByUser} src="https://miro.medium.com/v2/resize:fit:1400/1*gIoRZCKodZT12rbl6Z5Lwg.png" alt="image upload by user"/>
              </div>
            </div>
          </div>
          

        </Box>
        
      </Modal>
    </div>
  );
}