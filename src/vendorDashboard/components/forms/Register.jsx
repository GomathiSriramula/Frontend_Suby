import React,{useState} from 'react'
import API_URL from '../../data/apiPath';

const Register = ({showLoginHandler}) => {

  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError] =  useState("");
  const [loading,setLoading] = useState(false);


  const handleSubmit = async(event)=>{
  event.preventDefault();
  try{
    const response = await fetch(`${API_URL}/vendor/register`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({username,email,password})
    });

const data =await response.json();
if(response.ok)
{
  console.log(data);
  setUsername("");
  setEmail("");
  setPassword("");
  alert('Vendor registered Success ✅')
  showLoginHandler()
}

  }catch(error)
  {
    console.error("Registration failed",error);
    alert("Registration failed")
  }
  }


  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>Vendor Register</h2>
        <label>Username </label>
        <input type="text" name="username" value={username} onChange={(event)=>{
          setUsername(event.target.value)
        }} placeholder='enter your username'/>
        <label>Email </label>
        <input type="text" value={email} name="email"
         onChange={(event)=>{
          setEmail(event.target.value)
        }}  
        placeholder="enter your email" />
        <label>Password </label>
        <input type="password" value={password} name="password" onChange={(event)=>{
          setPassword(event.target.value)
        }}
         placeholder="enter your password" />
        <div className="btnSubmit">
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register;
