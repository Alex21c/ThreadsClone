import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderLeft from "../../Components/HeaderLeft/HeaderLeft";
import { useDispatch } from "react-redux";
import { Divider } from "@mui/material";
import { handshakeHello } from "../../Redux/Slices/handshakeSlice.mjs";
import { fetchAllTheUsersExceptCurrentOne } from "../../Redux/Slices/userSlice.mjs";
import CircularProgressInfinite from "../../Components/MUI/CirclularProgressInfinite/CircularProgressInfinite";
import Utils from "../../Utils.mjs";
import MuiSnackbar from "../../Components/MUI/MuiSnackbar/MuiSnackbar";
import { openTheMuiSnackbar } from "../../Redux/Slices/muiSnackbarSlice.mjs";
import API_ENDPOINTS from "../../config.mjs";
import Thread  from "../../Components/Thread/Thread";
import { fetchUser } from "../../Redux/Slices/userSlice.mjs";
import { Link } from "react-router-dom";
import FollowBtn from "../../Components/FollowBtn/FollowBtn";

export default function Search(){
  let [stateQuery, setStateQuery] = useState('');
  const [stateApiReqMessage, setStateApiReqMessage] = useState('Wait...');
  const [stateMakingApiCall, setStateMakingApiCallAfterBtnClick] = useState(false);



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector(store=>store.auth);  
  const theme = useSelector(store=>store.theme);  
  const user = useSelector(store=>store.user);

  let [stateSearchQueryResponse, setStateSearchQueryResponse] = useState({
    threads: [],
    users: user.allTheUsersExceptCurrentOne
  });

  useEffect(()=>{
    // console.log(stateSearchQueryResponse)
  }, [stateSearchQueryResponse]);
  //reset users to default 
  useEffect(()=>{
    if(stateQuery=== ""){
      setStateSearchQueryResponse(previousState=>(      
        {
          ...previousState, 
          users: user.allTheUsersExceptCurrentOne
        }
      ))

    }
  }, [stateQuery])


  let [stateIsUserCardOpened, setStateIsUserCardOpened] = useState(false); 
  let [stateUserName, setStateUserName] = useState(''); 

  const refInputSearch = useRef(null);
  let stateDebouncedMakeApiCall = useRef(null);
  
  useEffect(()=>{
    setStateSearchQueryResponse(previousState=>(      
      {
        ...previousState, 
        users: user.allTheUsersExceptCurrentOne
      }
    ))
  }, [user.allTheUsersExceptCurrentOne]);

  useEffect(()=>{    
    document.title=process.env.REACT_APP_PRJ_NAME + " (Search)";

    if(!auth.authorization){
      return navigate('/auth/login');
      
    }
    refInputSearch.current.focus();


 
    // perform handshake with server
    dispatch(handshakeHello());
    dispatch(fetchAllTheUsersExceptCurrentOne(auth));

    // debounced 
    stateDebouncedMakeApiCall.current= Utils.debounce(
      (query)=>makeApiCallFetchUsersOrThreadsMatchingSearchQuery(query), 1000
    );
    
    

// console.log(theme)
  }, []);

  function waitForNSeconds(delay){
    return new Promise((resolve, rejected )=>{
      setTimeout(()=>{
        resolve();
      }, delay)
    });
  }




  async function makeApiCallFetchUsersOrThreadsMatchingSearchQuery(query=null){    
    try {
      if(!query){
        return;
        // throw new Error("query not provided");
      }
      setStateMakingApiCallAfterBtnClick(true);
      setStateApiReqMessage("Fetching...");
      // console.log('making api call makeApiCallFetchUsersOrThreadsMatchingSearchQuery');

      
      const headers = {          
        "Authorization": auth.authorization,
        "Content-Type": "application/json"
      };
      
      const requestOptions = {
        method: "GET",
        headers: headers,        
      };
      
      const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Search['get-all-users-or-threads-matching-search-query']}/${query}`;    
    // console.log(reqURL);
      
      let response = await fetch(reqURL, requestOptions);  
      
      if(!response){
        setStateSearchQueryResponse({
          users: [], 
          threads: []
        });

        throw new Error("No response!");
      }     
      response = await response.json();   

      if(!response.success){
        setStateSearchQueryResponse({
          users: [], 
          threads: []
        });

        throw new Error(response.message);        
      }
      console.log(response); 
      setStateSearchQueryResponse({
        users: response.data.users, 
        threads: response.data.threads
      })
      if(!response.success){
        throw new Error(response.message);
      }

      
    } catch (error) {
      console.error(process.env.REACT_APP_PREFIX_LOCALSTORAGE + "CustomError: " +error.message);
      return dispatch(openTheMuiSnackbar({message:error.message, type: "error"})) ;
    }finally{
      setStateMakingApiCallAfterBtnClick(false);
      
      
    }

  }

  return (
    <div className="flex justify-between " style={{backgroundColor: theme.background, color: theme.primaryText}}>
      <HeaderLeft/>  
      <MuiSnackbar  />
      <main style={{ backgroundColor: theme.backgroundHover, borderColor: theme.borderColor, color: theme.primaryText}}
        className = "border-[.1rem] rounded-tl-2xl rounded-tr-2xl p-[1rem] w-[40rem] min-h-[96vh] border-b-[0] m-[auto] mt-[2rem] gap-[1rem] flex flex-col" >

          <div className="flex justify-between items-center relative">
           <input onChange={(event)=>{setStateQuery(event.target.value); stateDebouncedMakeApiCall.current&& stateDebouncedMakeApiCall.current(event.target.value);}} ref={refInputSearch} style={{color: theme.primaryText, backgroundColor: theme.background, borderColor: theme.borderColor}}
            className="pl-[3rem] px-[1rem] py-[.5rem] border-[.15rem] rounded-xl w-[100%] outline-none"
           type="search" placeholder="Search"/>
           <i style={{color:theme.secondaryText}} className="fa-regular fa-magnifying-glass absolute left-[1rem]"></i>
          </div>

          
          <div>
            {
            stateQuery !== "" && 
              <>
                <div className='py-[1rem]'>
                  <Divider flexItem orientation="horizontal"  className=" h-[.2rem]" style={{ backgroundColor: theme.borderColor }}/>
                </div>
                <div className="flex gap-[1rem] relative">
                  <i style={{color:theme.secondaryText}} className="fa-regular fa-magnifying-glass"></i>
                  <span className="text font-medium" >{stateQuery}</span>
                  <i style={{color:theme.secondaryText}} className="fa-solid fa-chevron-right absolute right-[1rem]"></i>
                </div>
                <div className='py-[1rem]'>
                  <Divider flexItem orientation="horizontal"  className=" h-[.2rem]" style={{ backgroundColor: theme.borderColor }}/>                  
                  {
                    stateMakingApiCall && 
                    <CircularProgressInfinite message={"fetching users.."}/>
                  }
                </div>
              </>
            }

                      
          </div>

              <div className="flex flex-col gap-[1rem]">
                {
                stateSearchQueryResponse?.users?.length>0 &&
                stateSearchQueryResponse.users
                .map((otherUser)=><div key={otherUser._id}
                className="flex  justify-between" 
                >
                  <div className="flex gap-[1rem]">
                    <Link  to={`/profile/${otherUser?.username}`} className="w-[4rem] h-[4rem] rounded-full overflow-hidden">
                      <img src={otherUser?.profileImage?.url}/>
                    </Link>  
                    <div className="flex flex-col gap-[.5rem]">
                      <div className="relative">     
                          <Link to={`/profile/${otherUser?.username}`} onMouseEnter={()=>{setStateIsUserCardOpened(true); setStateUserName(otherUser.username)}} className="font-semibold hover:underline cursor-pointer transition">{otherUser?.username}</Link>

                          {/* Userinfo card  */}
                          <div 
                            onMouseLeave={()=>{setTimeout(()=>setStateIsUserCardOpened(false), 300)}}
                            className={`${stateIsUserCardOpened === true && stateUserName===otherUser?.username ? "flex": "hidden"}  absolute z-[100] top-[1.2rem] left-[-1.5rem]   p-[2rem] rounded-xl w-[25rem] flex-col gap-[1rem]`}
                            style={{backgroundColor: theme.background}}
                            >
                            <Link to={`/profile/${otherUser?.username}`} className="flex gap-[1rem] w-[100%] cursor-pointer">
                              <div className="flex flex-col gap-[.5rem] w-[100%]">
                                <div className="flex flex-col gap-[.6rem] w-[100%]">
                                <span className="font-semibold">{`${otherUser?.firstName} ${otherUser?.lastName}`}</span>
                                <span>{otherUser?.username}</span>
                                <pre>{otherUser?.bio}</pre>
                                <span style={{color: theme.secondaryText}}>{otherUser?.followers?.length} followers </span>
                                </div>
                              </div>
                              <div className=" w-[5rem] h-[4rem] rounded-full overflow-hidden">
                              <img src={otherUser?.profileImage?.url} className="w-[100%] "/>
                              </div>
                            </Link>
                           
    
                            <FollowBtn otherUser={otherUser} theme={theme} user={user} auth={auth} dispatch={dispatch}
                        setStateUserName={setStateUserName} setStateMakingApiCallAfterBtnClick={setStateMakingApiCallAfterBtnClick}
                        setStateApiReqMessage={setStateApiReqMessage}
                        />
    
    
                          </div>
    
                      </div>
    
                      <span style={{color: theme.secondaryText}}>{`${otherUser?.firstName} ${otherUser?.lastName}`}</span>
                      <span>{otherUser?.followers?.length} followers </span>
                      
                    </div>
                  </div>
    
                
                  <div>
                      {
                        stateUserName===otherUser?.username && stateMakingApiCall ? 
    
                        <CircularProgressInfinite message={stateApiReqMessage}/>
                        :
    
                        <FollowBtn otherUser={otherUser} theme={theme} user={user} auth={auth} dispatch={dispatch}
                        setStateUserName={setStateUserName} setStateMakingApiCallAfterBtnClick={setStateMakingApiCallAfterBtnClick}
                        setStateApiReqMessage={setStateApiReqMessage}
                        />
                                            
                      }
    
    
                  </div>
                
                </div>)

                
                }
              </div>
              
              {stateSearchQueryResponse?.users?.length>0  &&
              
              <div className='py-[1rem]'>
              <Divider flexItem orientation="horizontal"  className=" h-[.2rem]" style={{ backgroundColor: theme.borderColor }}/>
              {
                stateMakingApiCall && 
                <CircularProgressInfinite message={"fetching users.."}/>
              }
              </div>
              }


              {/* now i want to show all the threads iff found */}
              <div className="flex flex-col gap-[1rem]">

                {
                  stateSearchQueryResponse?.threads?.length >0 &&
                  stateSearchQueryResponse.threads.map((thread, idx)=><Thread  key={thread._id} threadData={thread} totalItems={stateSearchQueryResponse.threads?.length} idx={idx}               
                />)                                      
                  
                }
              </div>

              
                {
                stateQuery!=="" && stateSearchQueryResponse.threads.length===0 && stateSearchQueryResponse.users.length ===0 &&
                <div className="flex items-center text-center justify-center">
                  <span style={{color:theme.primaryText}} className="font-medium">
                    No Users/Threads found !
                  </span>
                </div>

                }                
              
             
            
            

          


          
          


        
      </main>


    </div>



  );
}