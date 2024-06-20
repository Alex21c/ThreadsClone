import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeMuiModalCreateNewThreadSlice, openMuiModalCreateNewThreadSlice } from '../../../Redux/Slices/muiModalCreateNewThreadSlice.mjs';


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
        <Box sx={style} className={`outline-none p-[.8rem] border rounded-xl  cursor-pointer hover:border-[blue-300] relative w-[35rem] min-h-[20rem] flex flex-col reltative`} >
          <h2 className='font-bold self-center top-[-2rem] absolute'>New thread</h2>
          <div className='flex w-[100%] min-h-[20rem] gap-[1rem]  border-l-[.2rem] border-yellow-500 pl-[2rem]'>
            <div className='flex flex-col items-center justify-between ml-[-4rem]'>
              <div className='w-[4rem]  overflow-hidden pb-[1rem]' >
                <img src="https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718603004/SharedResources/a7syt68cd0kyj3tiyhux.png" alt="user profile image" className='w-[100%] rounded-full' />
              </div>

              <div className='w-[2rem] rounded-full overflow-hidden'>
                <img src="https://res.cloudinary.com/dwlfgbmsi/image/upload/v1718603004/SharedResources/a7syt68cd0kyj3tiyhux.png" alt="user profile image-small" />
              </div>
            </div>

            <div>
              <h3 className='font-medium'>alex21c</h3>
              <textarea type="text" style={{backgroundColor: theme.backgroundHover}} />
            </div>
          </div>

        </Box>
        
      </Modal>
    </div>
  );
}