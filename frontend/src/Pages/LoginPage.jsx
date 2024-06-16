import { useEffect } from "react";
import qrCode from '../Assests/Images/Login/qrCodeDownloadApp.png';
import './LoginPage.css';
import { darkTheme, lightTheme } from "../Redux/Slices/themeSlice.mjs";
import { useSelector } from "react-redux";
import MuiModalHavingQrCodeForAppDownload from "../Components/MUI/MuiModalHavingQrCodeForAppDownload/MuiModalHavingQrCodeForAppDownload";
import { useDispatch } from "react-redux";
import { openMuiModalHavingQrCodeForAppDownloadSlice } from "../Redux/Slices/muiModalHavingQrCodeForAppDownloadSlice.mjs";
import LoginForm from "../Components/LoginForm/LoginForm";

export default function LoginPage(){
  const pageName = "Login";
  useEffect(()=>{
    document.title=pageName
  }, []);

  const theme = useSelector((store)=> store.theme);
  const dispath=useDispatch();
  
  return (
    <>
    <h1 className="displayNone">{pageName} Page</h1>
    <div id='loginPageWrapper' className={`relative flex flex-col p-[1rem]  bg-[${theme.background}] text-[${theme.secondaryText}]`} >    
        <MuiModalHavingQrCodeForAppDownload/>
        <div className="mt-[15rem] flex flex-col items-center">
          <LoginForm/>
        </div>
        <footer className={` flex absolute bottom-[1rem] right-[0] w-[100%] justify-center  text-[${theme.secondaryText}]`}>
          <div >
            <ul className="flex gap-[1rem] text-[.8rem]">
              <li>&copy; {new Date().getFullYear()}</li>
              <li><a href="#" className="hover:underline hover:cursor-pointer">Threads Terms</a></li>
              <li><a href="#" className="hover:underline hover:cursor-pointer">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline hover:cursor-pointer">Cookies Policy</a></li>
              <li><a href="#" className="hover:underline hover:cursor-pointer">Report a problem</a></li>
            </ul>
          </div>

          <div className="w-[13rem] p-[1rem] flex flex-col gap-[.5rem] items-center absolute bottom-[0] right-[0] ">
            <span >Scan to get the app</span>
            
            <div style={{borderColor: theme.text}} className={`p-[.8rem] border  rounded-xl bg-[#181818] cursor-pointer  overflow-hidden hover:scale-[1.1] transition`}>
              <img src={qrCode} className="w-[100%]" onClick={()=>{dispath(openMuiModalHavingQrCodeForAppDownloadSlice())}}/>
            </div>          
          </div>
        </footer>
        
   
    </div>
    </>
  );
}