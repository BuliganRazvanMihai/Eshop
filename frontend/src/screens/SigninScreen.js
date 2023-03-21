import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const { search } = useLocation();
  let navigate = useNavigate();

  const redirect = search ? search.split("=")[1] : "/";
  const userSignin = useSelector((state) => state.auth);
  const { user, isLoading, isError, isSuccess } = userSignin;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess || user) {
      navigate(redirect);
    }
  }, [navigate, redirect, isSuccess, user]);

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {isLoading && <LoadingBox></LoadingBox>}
        {isError && <MessageBox variant='danger'>{isError}</MessageBox>}
        <div>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter email'
            value={email}
            required
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter password'
            value={password}
            required
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label />
          <button className='primary' type='submit'>
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            Forgot Password?
            <Link to={`/forgotpassword`}>Click here</Link>
          </div>
        </div>
        <div>
          <label />
          <div>
            New customer?
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
