import { Snackbar } from '@mui/material';
import { AlertTitle } from '@mui/material';
import {Alert} from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeTheMuiSnackbar } from '../../Redux/Slices/muiSnackbar.mjs';

export default function MuiSnackbar({type, message}){
  const state = useSelector(store=>store.muiSnackbar);
  console.log(state);
  const dispatch=useDispatch();
  
  // valid types are : error, success, info, warning
  if(!type){
    type="success";
  }
  if(!message){
    message="hi there!";
  }
  


  // console.log(type, message)
  const vertical='bottom', horizontal='center';

  return (
    <Snackbar  open={state.open} autoHideDuration={3000} onClose={()=>dispatch(closeTheMuiSnackbar())}  anchorOrigin={{vertical,horizontal} } >
    <Alert severity={type} sx = {{minWidth: "20rem"}}>
      <AlertTitle>{type.at(0).toUpperCase() + type.slice(1)}</AlertTitle>
      {message}
    </Alert>
  </Snackbar>
  );
}