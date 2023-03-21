import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/auth/authSlice";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ForgotPasswordSuccesScreen from "./screens/ForgotPasswordSuccesScreen";

function App() {
  const userSignin = useSelector((state) => state.auth);
  const { user } = userSignin;
  console.log(user);

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(logout());
  };

  return (
    <BrowserRouter>
      <div className='grid-container'>
        <header className='row'>
          <div>
            <Link className='brand' to='/'>
              E-Shop
            </Link>
          </div>
          <div>
            {user ? (
              <div className='dropdown'>
                <Link to='#'>
                  {user.name} <i className='fa fa-caret-down'></i>{" "}
                </Link>
                <ul className='dropdown-content'>
                  <li>
                    <Link to='/orderhistory'>Order History</Link>
                  </li>
                  <li>
                    <Link to='#signout' onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to='/signin'>Sign In</Link>
            )}
          </div>
        </header>

        <main>
          <Routes>
            <Route path='/signin' element={<SigninScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
            <Route
              path='/forgotpasswordsuccess'
              element={<ForgotPasswordSuccesScreen />}
            />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/' element={<HomeScreen />} exact></Route>
          </Routes>
        </main>
        <footer className='row center'>All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
