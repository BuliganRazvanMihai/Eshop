import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../features/auth/authSlice";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;
  const { search } = useLocation();
  let navigate = useNavigate();

  const redirect = search ? search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.auth);
  const { user, isLoading, isError, isSuccess } = userRegister;

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
      name,
      email,
      password,
    };

    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(userData));
    }
  };
  useEffect(() => {
    if (isSuccess || user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user, isSuccess]);

  return (
    <div>
      <form className='login-form' onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {isLoading && <LoadingBox></LoadingBox>}
        {isError && <MessageBox variant='danger'>{isError}</MessageBox>}
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Enter name'
            value={name}
            required
            onChange={onChange}
          ></input>
        </div>
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
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            placeholder='Enter confirm password'
            value={confirmPassword}
            required
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label />
          <button className='primary' type='submit'>
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
