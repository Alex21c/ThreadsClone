import { Snackbar } from '@mui/material';
import { AlertTitle } from '@mui/material';
import {Alert} from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeTheMuiSnackbar } from '../../Redux/Slices/muiSnackbarSlice.mjs';

export default function MuiSnackbar({type, message}){
  const muiSnackbar = useSelector(store=>store.muiSnackbar);
  
  const dispatch=useDispatch();



  // console.log(type, message)
  const vertical='bottom', horizontal='center';

  return (
    <Snackbar  open={muiSnackbar.open} autoHideDuration={6000} onClose={()=>dispatch(closeTheMuiSnackbar())}  anchorOrigin={{vertical,horizontal} } >
    <Alert severity={muiSnackbar.type} sx = {{minWidth: "20rem"}}>
      <AlertTitle>{muiSnackbar.type.at(0).toUpperCase() + muiSnackbar.type.slice(1)}</AlertTitle>
      {muiSnackbar.message}
    </Alert>
  </Snackbar>
  );
}