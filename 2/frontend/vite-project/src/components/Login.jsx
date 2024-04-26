import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login=()=>
{
   console.log("Login re-rendering")

   const navigate=useNavigate()
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")

   function handleChange(e)
   {
    if(e.target.name=="email")
       setEmail(e.target.value)
    else
      setPassword(e.target.value)
   }

   function handleClick(e)
   {
    e.preventDefault()
    console.log(email)
    console.log(password)

    const url="http://localhost:3000/login";
    const bodyParam={
        email,
        password
    }

    axios.post(url,bodyParam).then((res)=>{
        
        localStorage.setItem('jwtToken',res.data.jwtToken)
    }).catch(err=>console.log("err:",err))

   }

   return(
    <>
    <form>
    <input type="text" onChange={handleChange} placeholder="email" name="email"></input>
    <input type="password" onChange={handleChange} placeholder="password" name="password"></input>
    <button type="submit" onClick={handleClick}>Login</button>
    </form>
    <button onClick={()=>{
        navigate('/register')
    }}>register</button>
    </>
   )
}

export default Login