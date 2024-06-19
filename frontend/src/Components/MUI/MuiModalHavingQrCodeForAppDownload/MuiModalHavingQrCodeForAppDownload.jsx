import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import qrCode from '../../../Assests/Images/Login/qrCodeDownloadApp.png';
import { useSelector, useDispatch } from 'react-redux';
import { closeMuiModalHavingQrCodeForAppDownloadSlice, openMuiModalHavingQrCodeForAppDownloadSlice } from '../../../Redux/Slices/muiModalHavingQrCodeForAppDownloadSlice.mjs';



export default function MuiModalHavingQrCodeForAppDownload() {
  const dispatch = useDispatch();
  const open = useSelector((store)=>store.muiModalHavingQrCodeForAppDownload.open);

  
  const handleOpen = () => dispatch(openMuiModalHavingQrCodeForAppDownloadSlice());
  const handleClose = () => dispatch(closeMuiModalHavingQrCodeForAppDownloadSlice());

  const theme = useSelector((store)=>store.theme);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    borderColor: theme.text,
    p: 4,

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
              backgroundColor: 'rgba(0, 0, 0, 0.85)', // Darker background color
            },
          },
        }}        
        
      >
        <Box sx={style} className={`outline-none p-[.8rem] border  rounded-xl bg-[#181818] cursor-pointer hover:border-[blue-300]`} >
          <img src={qrCode} className='w-[20rem]'/>
        </Box>
        
      </Modal>
    </div>
  );
}
