import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

const PasswordField = forwardRef((props, refPassword) => {
  const theme = useSelector(store=>store.theme);
  const handleEyeClick = (event) => {
    if (refPassword.current) {
      refPassword.current.type = refPassword.current.type === "password" ? "text" : "password";
    }

    if (event.target.classList.contains('fa-eye')) {
      event.target.classList.remove("fa-eye");
      event.target.classList.add("fa-eye-slash");
    } else {
      event.target.classList.add("fa-eye");
      event.target.classList.remove("fa-eye-slash");
    }
  };
  const styles = {
    backgroundColor: theme.backgroundHover, 
    borderColor: theme.borderColor,
    color: theme.primaryText

  }

  // console.log(refPassword);

  return (
    <div className='relative'>
      <input
        ref={refPassword}
        required
        type="password"
        placeholder='Password *'
        style={styles}
        className=' p-[1rem] rounded-md w-[100%] outline-none  border border-transparent  transition'
      />
      <span
        className="fa-solid fa-eye-slash text-[2rem]"
        style={{position: "absolute", right: "1rem"}}
        onClick={handleEyeClick}
      ></span>
    </div>
  );
});

export default PasswordField;
