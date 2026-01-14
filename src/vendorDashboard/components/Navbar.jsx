import React from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler}) => {
  
  return (
    <div className='navSection'>
      <div className='company'>
        Vendor Dashboard
      </div>
      <div className='userAuth'>
        <span onClick={showLoginHandler}>Login /</span>
        <span onClick={showRegisterHandler}>Register</span>
      </div>
    </div>
  )
}

export default Navbar
