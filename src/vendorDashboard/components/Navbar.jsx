import React from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler,showLogout,logoutHandler}) => {

  const firmName = localStorage.getItem('firmName');
  
  return (
    <div className='navSection'>
      <div className='company'>
        {firmName ? `${firmName} Dashboard` : 'Vendor Dashboard'}
       
      </div>
      <div className='userAuth'>
        {!showLogout?<>
         <span onClick={showLoginHandler}>Login /</span>
        <span onClick={showRegisterHandler}>Register</span>
        </> : <span onClick={logoutHandler}>Logout</span> }
      
        
      </div>
    </div>
  )
}

export default Navbar
