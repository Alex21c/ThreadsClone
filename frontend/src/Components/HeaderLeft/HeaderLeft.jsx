import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useCallback } from 'react';
import Utils from '../../Utils.mjs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearHandshakeData } from '../../Redux/Slices/handshakeSlice.mjs';
import { clearUserData } from '../../Redux/Slices/userSlice.mjs';
import { clearThreadsData } from '../../Redux/Slices/threadsSlice.mjs';
import { removeJwt } from '../../Redux/Slices/authSlice.mjs';

export default function HeaderLeft(){
  const navigate = useNavigate();
  const theme = useSelector(store=>store.theme);
  const icons = useSelector(store=>store.icons);
  const dispatch = useDispatch();

  const textColor = theme.primaryText;
  const [stateOpenTheLogoutAndThemeChangeMenu, setStateOpenTheLogoutAndThemeChangeMenu] = useState(false);

  function handleMouseLeave(event, icon){
    // console.log('mouse Leave' + new Date().getSeconds());
    try {    
      if(event?.target?.firstChild?.src){
        event.target.firstChild.src = icon;
      }
      event.target.style.backgroundColor = theme.background;      
    } catch (error) {
      console.error(`${process.env.REACT_APP_PRJ_NAME.replaceAll(' ', '')}-ERROR: ${error.message}`);
    }
    
  }
  function handleMouseEnter(event, activeIcon){
    // console.log('mouse enter' + new Date().getSeconds());
    try {
      if(event?.target?.firstChild?.src){
        event.target.firstChild.src = activeIcon;    
      }
      event.target.style.backgroundColor = theme.backgroundHover;      
    } catch (error) {
      console.error(`${process.env.REACT_APP_PRJ_NAME.replaceAll(' ', '')}-ERROR: ${error.message}`);
    }
  }

  function handleMouseEnterSettingsBar(event, borderColorActive){
    // console.log('mouse enter' + new Date().getSeconds());
    try {
      event.target.childNodes.forEach(element=>{
        element.style.borderColor= borderColorActive;   
        event.target.style.backgroundColor = theme.backgroundHover;   
      });    
      
    } catch (error) {
      console.error(`${process.env.REACT_APP_PRJ_NAME.replaceAll(' ', '')}-ERROR: ${error.message}`);
    }
  }
  function handleMouseLeaveSettingsBar(event, borderColor){
    // console.log('mouse leave' + new Date().getSeconds());
    try {
      event.target.childNodes.forEach(element=>{
        element.style.borderColor= borderColor;
        event.target.style.backgroundColor = theme.background;
      })    
      
    } catch (error) {
      console.error(`${process.env.REACT_APP_PRJ_NAME.replaceAll(' ', '')}-ERROR: ${error.message}`);
    }
  }



  const debouncedMouseLeaveSettingsBar = useCallback(Utils.debouce(
    (event, borderColor)=> handleMouseLeaveSettingsBar(event, borderColor), 100),
     [handleMouseLeaveSettingsBar]
  );
  const debouncedMouseEnterSettingsBar = useCallback(Utils.debouce(
    (event, borderColorActive)=> handleMouseEnterSettingsBar(event, borderColorActive), 100),
     [handleMouseEnterSettingsBar]
  );

  const debouncedMouseEnter = useCallback(Utils.debouce(
    (event, activeIcon)=> handleMouseEnter(event, activeIcon), 100),
     [handleMouseEnter]
  );

  const debouncedMouseLeave = useCallback(Utils.debouce(
    (event, icon)=> handleMouseLeave(event, icon), 100), 
    [handleMouseLeave]
  );

  const activeThemeStyle = {
    
    padding: ".2rem .7rem",
    borderRadius: "1rem",
    borderWidth: ".1rem",
    borderColor: theme.borderColor,
    color: theme.primaryText

  }

  // handling user click outside menu logoutAndChangeTheme
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setStateOpenTheLogoutAndThemeChangeMenu(false);
      }
    };

    if (stateOpenTheLogoutAndThemeChangeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [stateOpenTheLogoutAndThemeChangeMenu]);


  function handleReqLogOut(){
    // delete data from local storage and unset redux states
        dispatch(clearHandshakeData());
        dispatch(clearThreadsData());
        dispatch(clearUserData());
        dispatch(removeJwt());
      
    // redirect user to login 
      window.location.href = "/auth/login";
    

     
  }

  return (  
    <header style={{backgroundColor: theme.background}} className='py-[1rem] flex flex-col w-[5rem] h-[100vh] items-center justify-between sticky top-[0] left-[0rem]'>
      <a href="/"  className='cursor-pointer'>
        <img src={icons.logo} alt="logo" className='w-[2.1rem] scale:1 hover:scale-[1.2] transition' />
      </a>

      <div className='flex items-center gap-[1rem] flex-col '>
        <div onClick={()=>navigate('/')}   className="cursor-pointer w-[4rem] h-[4rem] p-[1rem] transition  rounded-md"
        
        onMouseLeave={(event)=>debouncedMouseLeave(event, icons.home)} 
        onMouseEnter={(event)=>debouncedMouseEnter(event, icons.homeActive)}
        >
          <img src={icons.home} alt="icon home" className='w-[100%] '/>        
        </div>

        <div  className="cursor-pointer  w-[4rem] h-[4rem] p-[1rem] transition  rounded-md"
        
        onMouseLeave={(event)=>debouncedMouseLeave(event, icons.search)} 
        onMouseEnter={(event)=>debouncedMouseEnter(event, icons.searchActive)}
        >          
          <img src={icons.search} alt="icon search" className='w-[100%]' />
        </div>

        <div  className="cursor-pointer w-[4rem] h-[4rem] p-[1rem] transition  rounded-md"
        
        onMouseLeave={(event)=>debouncedMouseLeave(event, icons.heart)} 
        onMouseEnter={(event)=>debouncedMouseEnter(event, icons.heartActive)}
        >
          <img src={icons.heart} alt="icon heart" className='w-[100%]' />
        </div>

        <div onClick={()=>navigate('/profile')} className="cursor-pointer  w-[4rem] h-[4rem] p-[1rem] transition  rounded-md"
        onMouseLeave={(event)=>debouncedMouseLeave(event, icons.user)} 
        onMouseEnter={(event)=>debouncedMouseEnter(event, icons.userActive)}
        >
          <img src={icons.user} alt="icon user" className='w-[100%]' />
        </div>
        
      </div>

      <div className='flex flex-col gap-[2rem] items-center'>        
        <div  className="cursor-pointer w-[4rem] h-[4rem] p-[1rem] transition  rounded-md"         
         onMouseLeave={(event)=>debouncedMouseLeave(event, icons.pin)} 
         onMouseEnter={(event)=>debouncedMouseEnter(event, icons.pinActive)} 
        >
          <img src={icons.pin} alt="icon pin" className='w-[100%]'
          />
        </div>
        {
          !stateOpenTheLogoutAndThemeChangeMenu ? 
          <div className="flex flex-col gap-[.3rem] cursor-pointer w-[4rem] h-[4rem] p-[1rem] transition  rounded-md justify-center"
            onClick = {()=>{setStateOpenTheLogoutAndThemeChangeMenu(true)}}
            onMouseEnter={(event)=>debouncedMouseEnterSettingsBar(event, theme.primaryText)} 
            onMouseLeave={(event)=>debouncedMouseLeaveSettingsBar(event, theme.secondaryText)} 
          >
            <div className='border-b border-[.13rem] rounded-full w-[1.5rem]' style={{borderColor: theme.secondaryText}}></div>
            <div className='border-b border-[.13rem] rounded-full w-[1rem]' style={{borderColor: theme.secondaryText}}></div>
          </div>
          :
          <ul ref={menuRef} className=' ml-[9rem] flex flex-col gap-[1rem] items-center  p-[1rem] rounded-xl absolute bottom-[0]'
              style={{backgroundColor: theme.background}}>
            <li className='select-none flex flex-col items-center w-[100%] gap-[.5rem] px-[2rem] p-[1rem] rounded-xl' style={{backgroundColor: theme.backgroundHover}}>
              <div>Appearance</div>
              <div className='text-[1.5rem] flex gap-[1rem] items-center' style={{color:theme.secondaryText}}>
                <i className="hover:scale-[1.1] transition cursor-pointer fa-thin fa-sun-bright"></i>
                <i className="hover:scale-[1.1] transition cursor-pointer fa-thin fa-moon"  style={activeThemeStyle}></i>
              </div>
            </li>

          
            <li className='mt-[.3rem]  border-b-[.15rem] w-[100%]' style={{borderColor: theme.borderColor}}>                                      
            </li>

            <li onClick={()=>handleReqLogOut()} className='select-none cursor-pointer  flex items-center justify-center  w-[100%]  py-[.7rem] px-[1rem] rounded-xl hover:scale-[1.1] transition' style={{backgroundColor: theme.backgroundHover}}>Logout</li>
          </ul>
        }

        

        
        
      </div>


    </header>
  );
}