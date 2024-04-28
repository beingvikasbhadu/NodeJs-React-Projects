import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

console.log("m to upar wala hun!")
const Login=()=>
{
   console.log("Login re-rendering")

   const navigate=useNavigate()
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")

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

    console.log(bodyParam)
    axios.post(url,bodyParam).then((res)=>{
        
        localStorage.setItem('jwtToken',res.data.jwtToken)
        navigate('/my-profile')
        
    }).catch(err=>console.log("err:",err))

   }

   return(
    <>
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)} />
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <div className="text-center md:text-left">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit" onClick={handleClick}>Login</button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Do not have an account? <a className="text-red-600 hover:underline hover:underline-offset-4" href="#" onClick={()=>navigate('/register')}>Register</a>
        </div>
      </div>
    </section>
        
    </>
   )
}
export default Login


