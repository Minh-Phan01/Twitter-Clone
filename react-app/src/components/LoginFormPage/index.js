import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleSubmitDemo = (e) => {
    e.preventDefault();
    <Redirect to="/" />;
    return dispatch(sessionActions.demoLoginThunk());
  };

  return (
    <>
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className='login-form'>
      <h1 className="log-in-header">Log In</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        
        <label className="email-header">
          Email
          <input
            className="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="password-header">
          Password
          <input
            className="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
    
           
        <button className='login-button' type="submit">Log In</button>
        <button onClick={handleSubmitDemo} className="demo-btn">
              Demo User
            </button>
      </form>
    </div>
    </>
  );
}

export default LoginFormPage;
