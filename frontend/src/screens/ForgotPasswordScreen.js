import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../features/auth/authSlice";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const userForgotPassword = useSelector((state) => state.auth);
  const { isLoading, isError, message } = userForgotPassword;
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    navigate("/forgotpasswordsuccess");
  };

  return (
    <div>
      <form className='login-form' onSubmit={submitHandler}>
        <div>
          <h1>Forgot Password</h1>
        </div>
        {isLoading && <LoadingBox></LoadingBox>}
        {isError && <MessageBox variant='danger'>{message}</MessageBox>}
        <div>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            value={email}
            placeholder='Enter email'
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className='primary' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
