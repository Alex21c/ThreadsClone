import banner from '../../Assests/Images/Login/kindOfBanner.png';
import { useSelector } from 'react-redux';

export default function LoginForm(){
  const theme = useSelector(store => store.theme);
  return (
    <div className='' style={{color: theme.primaryText}}>
      <h2 className='font-medium text-[1.2rem]'>Log in</h2>
      
    </div>
  );
}