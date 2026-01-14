import React, { useState, useEffect } from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler,showLogout,logoutHandler,showWelcomeHandler}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firmName, setFirmName] = useState('');
  
  // Check auth status on every render and when showLogout changes
  useEffect(() => {
    updateAuthStatus();
  }, [showLogout]);

  // Also check on component mount
  useEffect(() => {
    updateAuthStatus();
    
    // Check auth status periodically (every 500ms) for real-time updates
    const interval = setInterval(updateAuthStatus, 500);
    
    return () => clearInterval(interval);
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      updateAuthStatus();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateAuthStatus = () => {
    const loginToken = localStorage.getItem('loginToken');
    const firm = localStorage.getItem('firmName');
    
    setIsLoggedIn(!!loginToken);
    setFirmName(firm || '');
  };

  const handleCompanyClick = () => {
    if (isLoggedIn && showWelcomeHandler) {
      showWelcomeHandler();
    }
  };
  
  return (
    <div className='navSection'>
      <div className='company' onClick={handleCompanyClick} style={{ cursor: isLoggedIn ? 'pointer' : 'default' }}>
        {isLoggedIn && firmName ? `${firmName} Dashboard` : 'Vendor Dashboard'}
      </div>
      <div className='userAuth'>
        {!isLoggedIn ? (
          <>
            <span onClick={showLoginHandler} className='authLink'>Login</span>
            <span className='separator'>/</span>
            <span onClick={showRegisterHandler} className='authLink'>Register</span>
          </>
        ) : (
          <span onClick={logoutHandler} className='logoutLink'>Logout</span>
        )}
      </div>
    </div>
  )
}

export default Navbar
