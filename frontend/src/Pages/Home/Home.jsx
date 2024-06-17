import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Home(){
  const navigate = useNavigate();
  const auth = useSelector(store=>store.auth);
  
  useEffect(()=>{
    if(!auth.authorization){
      navigate('/auth/login');
    }
  }, []);


  return (
    <>
    Home
    </>
  );
}