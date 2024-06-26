import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Thread from '../../Thread/Thread';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MuiModalCreateNewThread from '../MuiModalCreateNewThread/MuiModalCreateNewThread';
import { openMuiModalCreateNewThread } from '../../../Redux/Slices/muiModalCreateNewThreadSlice.mjs';
import { fetchRepliesMadeByCurrentUser } from '../../../Redux/Slices/replySlice.mjs';
import { fetchThreadsCreatedByCurrentUser } from '../../../Redux/Slices/threadsSlice.mjs';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function MuiTabForProfilePage({wantOnlySelfReplyLatestOne=false}) {
  const [value, setValue] = React.useState(0);
  const theme = useSelector(store=>store.theme);
  const user = useSelector(store=>store.user);
  const auth = useSelector(store=>store.auth);  
  const replies = useSelector(store=>store.replies);
  const threads = useSelector(store=>store.threads);
  const dispatch = useDispatch()
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(()=>{
    if(threads?.threadsCreatedByCurrentUser?.length === 0){
      dispatch(fetchThreadsCreatedByCurrentUser(auth))
    }

    if(replies?.repliesMadeByCurrentUser?.length === 0){
      dispatch(fetchRepliesMadeByCurrentUser(auth))
    }

  }, [])
  

  function handleReqCreateThreadBtnClicked(){
    dispatch(openMuiModalCreateNewThread());  
    
  }
  

  return (
    <Box sx={{ width: '40rem', backgroundColor: theme.backgroundHover, borderColor: theme.borderColor, color: theme.primaryText}}    
    className = "border-[.1rem] rounded-tl-2xl rounded-tr-2xl p-[1rem] pb-[0] w-[40rem] min-h-[91vh] border-b-[0] m-[auto] mt-[1rem]"   
    >
      <MuiModalCreateNewThread/>
      <Box>
        <div className="flex justify-between">
          <div className='flex flex-col gap-[1rem]'>
            <div className='flex flex-col gap-[0rem]'>
              <h3 className='font-bold text-[1.5rem] hover:underline transition cursor-pointer'>{`${user?.data?.firstName} ${user?.data?.lastName}`}</h3>
              <span>{user?.data?.username}</span>
            </div>

            <span>{user?.data?.bio}</span>

            <span  style={{color: theme.secondaryText}}  className=' hover:underline transition cursor-pointer'>{user?.data?.followers?.length} follower{user?.data?.followers?.length === 1 ? "": "s"}</span>

          </div>
          <div className='w-[5rem] overflow-hidden'> 
            <img src = {user?.data?.profileImage?.url || process.env.REACT_APP_DEFAULT_USER_PROFILE_IMAGE_URL} className='w-[100%] rounded-full'/>
          </div>
        </div>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
        <Tabs value={value} onChange={handleChange} aria-label="Profile Tabs"
          textColor ="inherit"
          variant="fullWidth"
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.primaryText, // Customize the indicator color here
            },
          }}
        >
          <Tab label="Threads" {...a11yProps(0)} 
            sx={{
              color: value === 0 ? theme.primaryText : theme.secondaryText,
              '&.Mui-selected': {
                color: theme.primaryText             
              },
            }}

          />
          <Tab label="Replies" {...a11yProps(1)} 
            sx={{
              color: value === 1 ? theme.primaryText : theme.secondaryText,
              '&.Mui-selected': {
                color: theme.primaryText
              },
            }}        
          />          
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {
          threads?.threadsCreatedByCurrentUser?.length >0 ?
           threads?.threadsCreatedByCurrentUser?.filter((thread)=>thread.replyBelongsToThisThreadID === null)
           .map((thread, idx)=><Thread  key={thread._id} threadData={thread} totalItems={threads?.threadsCreatedByCurrentUser?.length} idx={idx}
            wantOnlySelfReplyLatestOne={wantOnlySelfReplyLatestOne}
           />)

           :
           <div className="flex flex-col gap-[1rem]">
            <span>
              hello {user.data.firstName}, you haven't created any threads yet !
            </span>

            <button onClick={()=> handleReqCreateThreadBtnClicked()} className="p-[1rem] border-[.2rem] rounded-xl" style={{borderColor: theme.borderColor, backgroundColor: theme.backgroundHover}  }>
              Create Yours first Thread !
            </button>
           </div>
        }
        
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      {
          replies?.repliesMadeByCurrentUser?.length >0 ?
          replies?.repliesMadeByCurrentUser.map((thread, idx)=><Thread  key={thread._id} threadData={thread} totalItems={replies?.repliesMadeByCurrentUser?.length} idx={idx}
          wantToSeeReplyBelongsToThisThreadID={true}
          />)

          :
          <div className="flex flex-col gap-[1rem]">
           <span>
             hello {user.data.firstName}, you haven't made any replies yet !
           </span>

          </div>
        }        
      </CustomTabPanel>
    </Box>
  );
}
