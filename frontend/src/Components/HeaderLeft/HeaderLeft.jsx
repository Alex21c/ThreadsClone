import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useCallback } from 'react';
import Utils from '../../Utils.mjs';
export default function HeaderLeft(){
  const theme = useSelector(store=>store.theme);
  const icons = useSelector(store=>store.icons);
  const textColor = theme.primaryText;
  

  function handleMouseLeave(event, icon){
    // console.log('mouse Leave' + new Date().getSeconds());
    try {    
      event.target.firstChild.src = icon;
      event.target.style.backgroundColor = theme.background;      
    } catch (error) {
      console.error(`${process.env.REACT_APP_PRJ_NAME.replaceAll(' ', '')}-ERROR: ${error.message}`);
    }
    
  }
  function handleMouseEnter(event, activeIcon){
    // console.log('mouse enter' + new Date().getSeconds());
    try {
      event.target.firstChild.src = activeIcon;    
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


  return (  
    <header style={{backgroundColor: theme.background}} className='py-[1rem] flex flex-col w-[5rem] h-[100vh] items-center justify-between'>
      <a href="/"  className='cursor-pointer'>
        <img src={icons.logo} alt="logo" className='w-[2.1rem] scale:1 hover:scale-[1.2] transition' />
      </a>

      <div className='flex items-center gap-[1rem] flex-col '>
        <div  className="cursor-pointer w-[4rem] h-[4rem] p-[1rem] transition  rounded-md"
        
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

        <div  className="cursor-pointer  w-[4rem] h-[4rem] p-[1rem] transition  rounded-md"
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

        <div className="flex flex-col gap-[.3rem] cursor-pointer w-[4rem] h-[4rem] p-[1rem] transition  rounded-md justify-center"
          onMouseEnter={(event)=>debouncedMouseEnterSettingsBar(event, theme.primaryText)} 
          onMouseLeave={(event)=>debouncedMouseLeaveSettingsBar(event, theme.secondaryText)} 
        >
          <div className='border-b border-[.13rem] rounded-full w-[1.5rem]' style={{borderColor: theme.secondaryText}}></div>
          <div className='border-b border-[.13rem] rounded-full w-[1rem]' style={{borderColor: theme.secondaryText}}></div>
        </div>
        
      </div>


    </header>
  );
}