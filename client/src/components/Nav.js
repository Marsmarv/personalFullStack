import React , { useState } from 'react';
import { Link } from "react-router-dom"
import Fade from 'react-reveal/Fade'

const Nav = () => {
  const [ showMenu, setMenu ] = useState(false)
  const modalDisplay = showMenu ? "show-modal" : "no-display"
  const burgerDisplay = showMenu ? "none" : "one"
  const burgerDisplayTwo = showMenu ? "z" : "two"
  const burgerDisplayThree = showMenu ? "y" : "three"
  return (
    <>
    <Fade left delay={2500}>
      <div className="hamburger-menu" onClick={ () => setMenu(!showMenu) }>
      <div className={`hamburger ${burgerDisplayThree}`}></div>
      <div className={`hamburger ${burgerDisplayTwo}`}></div>
      <div className={`hamburger ${burgerDisplay}`}></div>
      <Fade left when={modalDisplay === "show-modal"} delay={100}>

          <div className={`${modalDisplay}`}>
            <Fade left delay={500}>
            <div className="links">
              <Fade>
                <Link className="hamburger-button" to="/"> Home </Link>
                <Link className="hamburger-button" to="/Login"> Login Page </Link>
                <Link className="hamburger-button" to="/Art"> Art </Link>
                <Link className="hamburger-button" to="/Profile"> Profile Page </Link>
              </Fade>
            </div>
            </Fade>
          </div>

      </Fade>
      </div>
    </Fade>
    </>
  )
}

export default Nav