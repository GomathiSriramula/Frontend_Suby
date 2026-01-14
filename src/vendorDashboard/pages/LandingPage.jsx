import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
 
  const [showLogin,setShowLogin] = useState(false);
  const [showRegister,setShowRegister] = useState(false);
  const [showFirm,setShowFirm] = useState(false);
  const [showProduct,setShowProduct] = useState(false);
  const [showWelcome,setShowWelcome] = useState(false);

  const showLoginHandler = ()=>
  {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
  }

  const showWelcomeHandler= ()=>{
    setShowWelcome(true);
    setShowProduct(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
  }

  const showRegisterHandler = ()=>{
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
     setShowWelcome(false);
  }

  const showFirmHandler = ()=>{
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(true);
    setShowProduct(false);
     setShowWelcome(false);
  }

  const showProductHandler=()=>{
    setShowProduct(true);
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
     setShowWelcome(false);
  }

  return (
    <div>
      <section className='landingSection'></section>
      <Navbar showLoginHandler ={showLoginHandler} showRegisterHandler={showRegisterHandler} />
      <div className="collectionSection">
        <SideBar showFirmHandler={showFirmHandler}
         showProductHandler={showProductHandler}/>
       {showLogin && <Login  showWelcomeHandler={showWelcomeHandler}/>}
       {showRegister && <Register showLoginHandler={showLoginHandler} />}
       {showFirm && <AddFirm />}
       {showProduct && <AddProduct />}
       {showWelcome && <Welcome/>}
       <AllProducts />
      </div>
      

    </div>
  )
}

export default LandingPage
