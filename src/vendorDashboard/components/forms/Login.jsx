/*import React,{useState} from "react";
import API_URL from '../../data/apiPath';


const Login = ({showWelcomeHandler}) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const loginHandler = async(e)=>{
e.preventDefault();

try{

const response = await fetch(`${API_URL}/vendor/login`,
  {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({email,password})
  })
  const data = await response.json();

  if(response.ok)
  {
    alert("Login success ✅");
    setEmail("");
    setPassword("");
    localStorage.setItem('loginToken',data.token);
    showWelcomeHandler();
  }
  const vendorId= data.vendorId;
  console.log(vendorId);
  
 const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);

  const vendorData = await vendorResponse.json();

  if(vendorResponse.ok)
  {
    const vendorFirmId = vendorData.vendorFirmId;
    const vendorFirmName = vendorData.vendor.firm[0].firmName;
    console.log(vendorFirmId);
    localStorage.setItem('firmId',vendorFirmId);
    localStorage.setItem('firmName',vendorFirmName);
   // window.location.reload();//to update the state in LandingPage.jsx
  }
 
}catch(error){
console.error(error);
 alert("Login Failed ❌❌");
}
  }


  return (
    <div className="loginSection">
      
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
        <label>Email </label>
        <input type="text" name="email" value={email} onChange={(e)=>
        setEmail(e.target.value)
        }  placeholder="enter your email" /><br />
        <label>Password </label>
        <input type="password" name="password" value={password} 
        onChange={(e)=>
          setPassword(e.target.value)
        }
        placeholder="enter your password" /><br />
        <div className="btnSubmit">
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
*/

import React, { useState } from "react";
import API_URL from "../../data/apiPath";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // ❌ Stop if login failed
      if (!response.ok) {
        alert(data.message || "Invalid login ❌");
        return;
      }

      // ✅ Login successful
      alert("Login success ✅");

      localStorage.setItem("loginToken", data.token);
      const vendorId = data.vendorId;

      // 🔥 Fetch vendor & firm details
      const vendorResponse = await fetch(
        `${API_URL}/vendor/single-vendor/${vendorId}`
      );

      const vendorData = await vendorResponse.json();

      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName =
       vendorData.vendorFirmName;

        localStorage.setItem("firmId", vendorFirmId);
        localStorage.setItem("firmName", vendorFirmName);
        window.location.reload(); // to update the state in LandingPage.jsx
      }

      // reset form
      setEmail("");
      setPassword("");

      // redirect to dashboard
      showWelcomeHandler();
    } catch (error) {
      console.error(error);
      alert("Server error ❌ Please try again");
    }
  };

  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your password"
          required
        />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
