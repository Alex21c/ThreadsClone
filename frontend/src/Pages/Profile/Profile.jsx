import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderLeft from "../../Components/HeaderLeft/HeaderLeft";
import MuiTabForProfilePage from "../../Components/MUI/MuiTabsForProfilePage/MuiTabForProfilePage";
import { useDispatch } from "react-redux";
import { closeTheMuiSnackbar } from "../../Redux/Slices/muiSnackbarSlice.mjs";
import { fetchUser } from "../../Redux/Slices/userSlice.mjs";

export default function Profile(){
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector(store=>store.auth);
  const theme = useSelector(store=>store.theme);
  const user = useSelector(store=>store.user);

  
  useEffect(()=>{
    document.title=process.env.REACT_APP_PRJ_NAME + " (Profile)";
    if(!auth.authorization){
     return navigate('/auth/login');
    }
    
    if(Object.keys(user.data).length ===0 ){
      // fetch user data
      dispatch(fetchUser(auth));
    }

  }, []);


  return (
    <div className="flex " style={{backgroundColor: theme.background, color: theme.primaryText}}>
      <HeaderLeft/>      
      <main className=" w-[100%] p-[1rem]">
        <div className="flex flex-col items-center gap-[1rem] w-[100%] ">
          <h2>Profile</h2>
          <MuiTabForProfilePage/>
        </div>
      </main>


    </div>

  );
}

