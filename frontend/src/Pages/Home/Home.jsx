import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderLeft from "../../Components/HeaderLeft/HeaderLeft";

export default function Home(){
  const navigate = useNavigate();
  const auth = useSelector(store=>store.auth);
  const icons = useSelector(store=>store.icons);
  const theme = useSelector(store=>store.theme);

  
  useEffect(()=>{
    document.title=process.env.REACT_APP_PRJ_NAME;
    if(!auth.authorization){
      navigate('/auth/login');
    }
  }, []);


  return (
    <div className="flex justify-between" style={{backgroundColor: theme.background, color: theme.primaryText}}>
      <HeaderLeft/>
      <main>
        Home
      </main>

      <div className="p-[1rem] self-end">
         <div className='flex items-center gap-[1rem] flex-col '>
          <div  className="flex items-center justify-center cursor-pointer  border-[.1rem] w-[5.5rem] h-[4.5rem] p-[1.8rem] transition  rounded-2xl hover:scale-[1.1]"
          style={{borderColor: theme.borderColor, backgroundColor: theme.backgroundHover}}
          >
            <img src={icons.createAPost} alt="icon home" className='w-[2rem] '/>        
          </div>
        </div> 
      </div>
    </div>

  );
}