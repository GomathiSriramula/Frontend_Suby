import React, { useState, useEffect } from 'react'
import API_URL from '../data/apiPath';

const Welcome = () => {
  const [vendorName, setVendorName] = useState('Vendor');
  const [firmName, setFirmName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [statsData, setStatsData] = useState({
    totalProducts: 0,
    firmStatus: 'Not Added'
  });

  useEffect(() => {
    loadWelcomeData();

    // Listen for storage changes (logout from another tab or same tab)
    const handleStorageChange = () => {
      loadWelcomeData();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadWelcomeData = async () => {
    try {
      const loginToken = localStorage.getItem('loginToken');
      const vendorId = localStorage.getItem('vendorId');
      const firm = localStorage.getItem('firmName');

      // Check if user is logged in
      if (!vendorId || !loginToken) {
        setIsLoggedIn(false);
        setVendorName('Vendor');
        return;
      }

      setIsLoggedIn(true);
      setFirmName(firm || '');

      // Fetch vendor details
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`, {
        method: 'GET',
        headers: { token: loginToken }
      });

      const vendorData = await vendorResponse.json();
      if (vendorData.username) {
        setVendorName(vendorData.username);
      }

      // Check firm status
      if (vendorData.vendorFirmId) {
        setStatsData(prev => ({
          ...prev,
          firmStatus: 'Active'
        }));

        // Fetch products count
        const productsResponse = await fetch(
          `${API_URL}/product/${vendorData.vendorFirmId}/products`,
          { method: 'GET' }
        );

        const productsData = await productsResponse.json();
        if (productsData.products) {
          setStatsData(prev => ({
            ...prev,
            totalProducts: productsData.products.length
          }));
        }
      }
    } catch (error) {
      console.error('Error loading welcome data:', error);
    }
  };

  // Landing page view (not logged in)
  if (!isLoggedIn) {
    return (
      <div className='welcomeSection'>
        <div className='welcomeContainer'>
          <div className='welcomeHeader'>
            <div className='welcomeIcon'>🚀</div>
            <h1 className='welcomeTitle'>Vendor Dashboard</h1>
            <p className='welcomeSubtitle'>Manage your restaurants...</p>
          </div>

          <div className='welcomeContent'>
            <div className='welcomeMessage'>
              <p>Welcome to your vendor management platform! Login or register to get started managing your restaurants, products, and analytics.</p>
            </div>

            <div className='quickActions'>
              <div className='actionItem'>
                <span className='actionIcon'>🔓</span>
                <p>Login to Account</p>
              </div>
              <div className='actionItem'>
                <span className='actionIcon'>📝</span>
                <p>Create Account</p>
              </div>
              <div className='actionItem'>
                <span className='actionIcon'>💼</span>
                <p>Manage Business</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Personalized welcome view (logged in)
  return (
    <div className='welcomeSection'>
      <div className='welcomeContainer'>
        <div className='welcomeHeader'>
          <div className='welcomeIcon'>👋</div>
          <h1 className='welcomeTitle'>Welcome, <span className='vendorName'>{vendorName}</span>!</h1>
          <p className='welcomeSubtitle'>Your Vendor Dashboard</p>
        </div>

        <div className='welcomeContent'>
          <div className='statsGrid'>
            <div className='statCard firmCard'>
              <div className='statIcon'>🏢</div>
              <div className='statInfo'>
                <p className='statLabel'>Firm Status</p>
                <p className='statValue'>{firmName || 'No Firm'}</p>
              </div>
            </div>

            <div className='statCard productCard'>
              <div className='statIcon'>📦</div>
              <div className='statInfo'>
                <p className='statLabel'>Total Products</p>
                <p className='statValue'>{statsData.totalProducts}</p>
              </div>
            </div>

            <div className='statCard statusCard'>
              <div className='statIcon'>✅</div>
              <div className='statInfo'>
                <p className='statLabel'>Account Status</p>
                <p className='statValue'>Active</p>
              </div>
            </div>
          </div>

          <div className='welcomeMessage'>
            <p>Start by managing your firm and products through the sidebar menu. You can add products, view analytics, and manage your business efficiently.</p>
          </div>

          <div className='quickActions'>
            <div className='actionItem'>
              <span className='actionIcon'>📝</span>
              <p>Add Firm and Products</p>
            </div>
            <div className='actionItem'>
              <span className='actionIcon'>📊</span>
              <p>View Your Analytics</p>
            </div>
            <div className='actionItem'>
              <span className='actionIcon'>👤</span>
              <p>Manage Your Profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
