import banner from '../../Assests/Images/Login/kindOfBanner.png';
import { useSelector } from 'react-redux';

export default function LoginForm(){
  const theme = useSelector(store => store.theme);
  const classInputFocus = {

  }
  return (
    <div className='flex flex-col items-center gap-[1rem]' style={{color: theme.secondaryText}}>
      <h2 className='font-medium text-[1.2rem]' style={{color: theme.primaryText}} >Log in</h2>
      <form className='flex flex-col gap-[.5rem]'>
        <input type="text" placeholder='Username, phone or email' className='bg-[#1e1e1e] p-[1rem] rounded-md w-[20rem] outline-none focus:outline-[#f3f5f726] focus:text-[#f3f5f7] transition' />
        <input type="password" placeholder='Password' className='bg-[#1e1e1e] p-[1rem] rounded-md w-[20rem] outline-none focus:outline-[#f3f5f726] focus:text-[#f3f5f7] transition' />
    
        
        <button className='bg-white p-[1rem] rounded-xl font-medium'>Log in</button>
        <a href="/auth/forgot-password" className='text-center mt-[.7rem] hover:underline transition'>Forgot Password?</a>
        <div className='border-[#f3f5f726] border-b-[.1rem] relative h-[1rem] mb-[1rem]'>
          <span className='absolute bg-[#101010] top-[.2rem] left-[42%] w-[3rem] text-center'>or</span>
        </div>
        <a href="/auth/create-a-new-account" className='text-center mt-[.7rem] hover:underline text-[1.2rem] font-medium'  style={{color: theme.primaryText}}>Create a new account</a>
      </form>
    </div>
  );
}