import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import PasswordField from '../PasswordField/PasswordField.mjs';
import MuiSnackbar from '../MuiSnackbar/MuiSnackbar.mjs';
import { openTheMuiSnackbar } from '../../Redux/Slices/muiSnackbarSlice.mjs';
import { setJwt } from '../../Redux/Slices/authSlice.mjs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API_ENDPOINTS from '../../config.mjs';

export default function CreateANewAccountForm(){
  const theme = useSelector(store => store.theme);
  const refUsername = useRef(null);
  const refFirstName = useRef(null);
  const refLastName = useRef(null);
  const refEmail = useRef(null);
  const refMobile = useRef(null);
  const refPassword = useRef(null);
  const refBio = useRef(null);
  const refLink = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmitRequest(event){
    event.preventDefault();
    
    // are required fields provided?
    if(
      refUsername.current.value === "" ||
      refFirstName.current.value === ""||
      refEmail.current.value === ""||
      refMobile.current.value === ""||
      refPassword.current.value=== ""
    ){
      return;
    }

    // make http req
      try {
        const data ={
          "firstName" : refFirstName.current.value,
          "lastName" : refLastName.current.value,
          "email" : refEmail.current.value,
          "mobile" : refMobile.current.value,
          "username" : refUsername.current.value,
          "password" : refPassword.current.value,
          "bio" : refBio.current.value,
          "customLink" : refLink.current.value
        };

        const headers = {
          "Content-Type": "application/json"
        };

        const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.User.register}`;
        let response = await fetch(reqURL, {
          method: "POST",
          headers,       
          body: JSON.stringify(data)    
        });
        if(!response){
          throw new Error("Failed to Make Req. with Server! please try again later...");
        }
        response = await response.json();
        if(!response.success){
          throw new Error(response.message);        
        }
        console.log(response);

        // save the token in the local storage, and redirect the user to homepage
          dispatch(setJwt(response.Authorization));
        
        // redirect user to homepage          
          navigate("/");


      } catch (error) {        
        dispatch(openTheMuiSnackbar({message: error.message, type: "error"}));
        console.log(error.message);
      }
  }



  return (
    
    <div className='flex flex-col items-center gap-[1rem]' style={{color: theme.secondaryText}}>
      <MuiSnackbar/>


      <h2 className='font-medium text-[1.2rem]' style={{color: theme.primaryText}} >Create Account</h2>
      <form className='flex flex-col gap-[.5rem] mb-[5rem]' onSubmit={(event)=>handleSubmitRequest(event)}>
        <span>* fields are mandatory !</span>

        <input ref={refUsername} required type="text" placeholder='Username *' className='bg-[#1e1e1e] p-[1rem] rounded-md w-[100%] outline-none focus:border-[#f3f5f726] border border-transparent focus:text-[#f3f5f7] transition' />
        <div className='flex gap-[.5rem]'>
          <input ref={refFirstName} required type="text" placeholder='First Name *' className='bg-[#1e1e1e] p-[1rem] rounded-md w-[20rem] outline-none focus:border-[#f3f5f726] border border-transparent focus:text-[#f3f5f7] transition' />
          <input ref={refLastName} type="text" placeholder='Last Name' className='bg-[#1e1e1e] p-[1rem] rounded-md w-[20rem] outline-none focus:border-[#f3f5f726] border border-transparent focus:text-[#f3f5f7] transition' />
        </div>
        <div className='flex gap-[.5rem]'>
          <input ref={refEmail} required  type="email" placeholder='E-Mail *' className='bg-[#1e1e1e] p-[1rem] rounded-md w-[20rem] outline-none focus:border-[#f3f5f726] border border-transparent focus:text-[#f3f5f7] transition' />
          <input ref={refMobile} required type="tel" placeholder='Mobile *' className='bg-[#1e1e1e] p-[1rem] rounded-md w-[20rem] outline-none focus:border-[#f3f5f726] border border-transparent focus:text-[#f3f5f7] transition' />
        </div>
        <PasswordField ref={refPassword}/>
        
        <textarea ref={refBio} type="text" placeholder='Bio' className='bg-[#1e1e1e] p-[1rem] rounded-md w-[100%] outline-none focus:border-[#f3f5f726] border border-transparent focus:text-[#f3f5f7] transition' />
        <input ref={refLink} type="url" placeholder='Link' className='bg-[#1e1e1e] p-[1rem] rounded-md w-[100%] outline-none focus:border-[#f3f5f726] border border-transparent focus:text-[#f3f5f7] transition' />
        
    
        
        <button className='bg-white p-[1rem] rounded-xl font-medium'>Register</button>
      </form>
    </div>
  );

}
