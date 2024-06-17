import React, { forwardRef } from 'react';

const PasswordField = forwardRef((props, refPassword) => {
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

  // console.log(refPassword);

  return (
    <div className='relative'>
      <input
        ref={refPassword}
        required
        type="password"
        placeholder='Password *'
        className='bg-[#1e1e1e] p-[1rem] rounded-md w-[100%] outline-none focus:border-[#f3f5f726] border border-transparent focus:text-[#f3f5f7] transition'
      />
      <span
        className="fa-solid fa-eye-slash text-[2rem] absolute right-[1rem]"
        onClick={handleEyeClick}
      ></span>
    </div>
  );
});

export default PasswordField;
