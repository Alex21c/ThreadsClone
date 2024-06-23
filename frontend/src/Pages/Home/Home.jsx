import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderLeft from "../../Components/HeaderLeft/HeaderLeft";
import MuiModalCreateNewThread from "../../Components/MUI/MuiModalCreateNewThread/MuiModalCreateNewThread";
import MuiModalCreateNewReply from "../../Components/MUI/MuiModalCreateNewReply/MuiModalCreateNewReply";
import { openMuiModalCreateNewThread } from "../../Redux/Slices/muiModalCreateNewThreadSlice.mjs";
import { useDispatch } from "react-redux";
import { closeTheMuiSnackbar } from "../../Redux/Slices/muiSnackbarSlice.mjs";
import { fetchUser } from "../../Redux/Slices/userSlice.mjs";
import { Divider } from "@mui/material";
import API_ENDPOINTS from "../../config.mjs";
import { useState } from "react";
import Thread from "../../Components/Thread/Thread";
import { handshakeHello } from "../../Redux/Slices/handshakeSlice.mjs";
import { fetchThreadsForHomepage } from "../../Redux/Slices/threadsSlice.mjs";

// export async function fetchThreadsForHomepage(auth){
//   try {
//     console.log('fetching homepage Threads threds !'); // keep it
//     const headers = {          
//       "Authorization": auth.authorization
//     };
    
//     const requestOptions = {
//       method: "GET",
//       headers: headers
//     };
    

//     const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Thread['get-homepage-threads-for-current-user']}`;    
    
//     let response = await fetch(reqURL, requestOptions);   
    
//     if(response?.statusText === "Unauthorized"){
//       // just delete the authorization from local storage
//       localStorage.removeItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"Authorization");
      
//       throw new Error ("Kindly login again");
//     }
//     response = await response.json();
//     // console.log(response);

//     if(response.success){        
//       setStateHomepageThreads(response.data);
//     }else {
//       throw new Error(response.message);
//     }
//   } catch (error) {
//     console.error('ThreadsCloneCustomError: failed to req to fetch threads for homepage ' + error.message)
//   }
// }

export default function Home(){
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector(store=>store.auth);
  const icons = useSelector(store=>store.icons);
  const theme = useSelector(store=>store.theme);
  const threads = useSelector(store=>store.threads);
  const user = useSelector(store=>store.user);

  


  useEffect(()=>{
    document.title=process.env.REACT_APP_PRJ_NAME;

    if(!auth.authorization){
      return navigate('/auth/login');
      
    }
    
    if(Object.keys(user.data).length ===0 ){
      // console.log(auth.authorization)
      // fetch user data
      dispatch(fetchUser(auth));
    }

    // perform handshake with server
    dispatch(handshakeHello());
    dispatch(fetchThreadsForHomepage(auth));


  }, []);

  function handleReqCreateThreadBtnClicked(){
    dispatch(openMuiModalCreateNewThread()); 
    dispatch(closeTheMuiSnackbar());
    
  }
  
  return (
    <div className="flex justify-between " style={{backgroundColor: theme.background, color: theme.primaryText}}>
      <HeaderLeft/>
      <MuiModalCreateNewThread/>
      <MuiModalCreateNewReply isItHomepage= {true}/>
      <main style={{ backgroundColor: theme.backgroundHover, borderColor: theme.borderColor, color: theme.primaryText}}
        className = "border-[.1rem] rounded-tl-2xl rounded-tr-2xl p-[1rem] w-[40rem] min-h-[96vh] border-b-[0] m-[auto] mt-[2rem]" >

          <div className="flex justify-between items-center">
            <div className="flex gap-[1rem] items-center ">
               <div className='w-[3rem]  overflow-hidden  ' >
                  <img src={user?.data?.profileImage?.url || process.env.REACT_APP_DEFAULT_USER_PROFILE_IMAGE_URL} alt="user profile image" className='w-[100%] rounded-full' />
              </div>
                        
              <span style={{color: theme.secondaryText}}>Start a thread...</span>
            </div>
            <div>
              <button className='px-[1rem] py-[.4rem] border-[.1rem] rounded-xl w-[5rem] h- ' style={{borderColor:theme.borderColor}} onClick={()=>handleReqCreateThreadBtnClicked()}>Post</button>
            </div>
          </div>

          <div className='py-[1rem]'>
            <Divider flexItem orientation="horizontal"  className=" h-[.2rem]" style={{ backgroundColor: theme.borderColor }}/>
          </div>

          {
          threads?.homepageThreads?.length >0 && 
          threads.homepageThreads.map(
            (thread, idx)=>
            <Thread 
              key={thread._id} threadData={thread} totalItems={threads.homepageThreads.length} idx={idx} createdByOtherUser={true}
            />
          )

        }

        
      </main>

      <div className="p-[1rem] sticky top-[89vh] right-0 self-start" onClick={()=> handleReqCreateThreadBtnClicked() }>
         <div className='flex items-center gap-[1rem] flex-col '>
          <div  className="flex items-center justify-center cursor-pointer  border-[.1rem] w-[5.5rem] h-[4.5rem] p-[1.8rem] transition  rounded-2xl hover:scale-[1.1]"
          style={{borderColor: theme.borderColor, backgroundColor: theme.backgroundHover}}
          >
            <img src={icons.createAPost} alt="icon home" className='w-[2rem] ' />        
          </div>
        </div> 
      </div>
    </div>

  );
}