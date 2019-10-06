import React from 'react';
import {withGlobalProvider} from './GlobalProvider'
import Fade from 'react-reveal/Fade'
import { Link } from "react-router-dom";

const Login = (props) => {
  const { handleChange, username, password, userSignUp, userLogin, logout, history: {push} } = props
  
  const handleLogin = (e) => {
    e.preventDefault()
    userLogin({ username, password })
      .then(()=> push('/art'))
  }
  
  const handleSignup = (e) => {
    e.preventDefault()
    userSignUp({ username, password })
      .then(()=>  push('/art'))
  }

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }

  return (
    <Fade>
      <div className="main-container main-background">
        <div className="login-container">
          <form className="form-set">
            <input onChange={handleChange} 
            type="text" 
            name='username'
            placeholder="Username"
            value={username} /> <br/><br/>
            <input onChange={handleChange} 
            type="text" 
            name='password'
            placeholder="Password"
            value={password} /> <br/><br/>
            <button className="login-button" onClick={handleSignup}>Sign up</button><br/>
            <button className="login-button" onClick={handleLogin}>Log in</button><br/>
            <button className="login-button" onClick={handleLogout}>Log out</button><br/>
          </form>
          <h3 className="welcome">Welcome {props.user.username}!</h3><br/>
          <Link to='/' className='home-button'>HOME</Link>
        </div>
      </div>
    </Fade>
  )
}

export default withGlobalProvider(Login)