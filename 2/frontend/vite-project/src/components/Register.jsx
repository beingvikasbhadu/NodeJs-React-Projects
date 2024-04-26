import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register=()=>
{

    console.log("Register re-rendering")
    
    const navigate=useNavigate()

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [role,setRole]=useState("")
    const [gender,setGender]=useState("")
    const [pic,setPic]=useState("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAwwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAIDB//EAC4QAQACAQIEBQMDBQEAAAAAAAABAgMEEQUhMVESIkFxkRMyUmFicjM0QpKxI//EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREC/9oADAMBAAIRAxEAPwD9EAdGQAAAAABMVva0VpWbTPTZNMdst4pTradoaDRaOmmxxH3W252S1Vbg4TnvG+S1ccdusuqvB8O3mteZWRsxqq23B8M/be0e7k1HC8uOvixz447bc18j2XajKWrNZ2tymPSRf8Q0ddTj3pEReOcT3UExNZmto2tE82pRACoAAAAAAAAAAAAAAAiOcxEeqVVzwbT1jHOaa85naFpEPnpqRjw0pHpV9WFQkQACQQpuMaeKWjNWNotyn3XTm4hjjJpMldt+W8LBm4COiJa1EhAqAAAAAAAAAAAAD6abadRjj90Pm96adtRimenihKrUwlEc0sKAAAAPGSN6THeHt5vtFJmekQDKz1mP1RumeczP6vMtREhHQaQAAAAAAAAAAAAOnOBJVabS5Pq4KXj1h9lLwXU+CZwXmec71XMOapAAAAcvEsn09HkmZ6xtDpnoouLaqM2aKUnyVj5lYK+N45SnqbDWIAKgAAAAAAAAAAAAACazMTE1naY9YXvDtbXUUilp/wDSOv6qFNbTS0WrMxMesMWK1cdEqHDxbNSYi9YvHxLsrxfB61tE+yKsieisvxjDX7a2t7w4svE9TkiYiYpHaI5rg7eJ676dfpYZ3vMc57Qpd+UQmZmbTvMz3mUNSIAKgAAAAAAAAAAAAG6Y59OcioHdpuF5cu1snkrPys8HDsGKPsi095Z0Z+OiGqrix16UrHtCfDX8Y+E0ZSXmJ2a7w17R8I8Nfxj4NVkt07tZ4a/jHweGv4x8GjKbnRq5pWY+2vw+dtLgt1w4/wDWF1MZg3X+XhemvHlr4J71cOo4RmpG+K0ZI7dJXRXCbVtSZi8TEx1iUKAAgAAAAAABznlHUV6x47ZLeGld5Xmg0FcERe/PJt8J4dpI0+OLT99o57+juYtEJBFAAAAAAAAEbJAcus0ePU05xteOloUGfFfBlnHkjaY9e8NS5OIaWNVhmP8AOvOsrKM6JneJmJ6x1jshtAAQAAAAl38K0v1s31LR5Mc/MuBpOHYfoaSlZjzTG9veWaroSDKgAAAAAAAAAAAAAKPjOn+nmjNWPLfr7q5oOLU8WhyT618zPw1ylAGkAAAAe8MeLLSve0NTDNaKN9Xhj90NMz0sAGVAAAAAAAAAAAAAAfHWV8Wlyx+yWYhqdRz0+T+E/wDGWj0a5SgDSAAAAOjQf3uH+TSgxVgAigAAAAAAAAAAAAAPGb+jk/jLKV6Qka5ABpAAR//Z")
    const [phone,setPhone]=useState("")

    function handleChange(e)
    {
        if(e.target.name=="name")
          setName(e.target.value)
        else
        if(e.target.name=="email")
        setEmail(e.target.value)
        else
        if(e.target.name=="password")
        setPassword(e.target.value)
        else
        if(e.target.name=="pic")
        setPic(e.target.value) 
        else 
        if(e.target.name=="phone")
        setPhone(e.target.value)
    }

    function handleClick(e)
    {
        
        e.preventDefault()
        const url="http://localhost:3000/register"
        const bodyParam={
            name,
            email,
            password,
            gender,
            pic,
            phone,
            role
        }
        console.log(bodyParam)
        axios.post(url,bodyParam).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log("error:",err)
        })
    }
    return(
        <>
        <form>
        <input type="text" placeholder="name" name="name" onChange={handleChange}></input>
        <input type="text" placeholder="email" name="email" onChange={handleChange}></input>
        <input type="password" placeholder="password" name="password" onChange={handleChange}></input>
        <input type="url" placeholder="pic" name="pic" onChange={handleChange}></input>
        <input type="tel" placeholder="phone" name="phone" onChange={handleChange}></input>
        <label>
            <input type="radio" name="role" value="buyer" onChange={(e)=>{
                if(e.target.checked)
                 setRole(e.target.value)
            }} required/>
           Buyer
        </label>
        <label>
            <input type="radio" name="role" value="seller" onChange={(e)=>{
                if(e.target.checked)
                setRole(e.target.value)
            }} required/>
           Seller
        </label>
        <br></br>
        <label>
        <input type="radio" name="gender" value="male" onChange={(e)=>{
               if(e.target.checked)
                 setGender(e.target.value)
        }} required/>
          Male
        </label>
        <label>
            <input type="radio" name="gender" value="female" onChange={(e)=>{
                 if(e.target.checked)
                 setGender(e.target.value)
            }} />
            Female
        </label>
         <br></br>
        <button type="submit" onClick={handleClick}>register</button>
        </form>
        <button onClick={()=>{
            navigate('/login')
        }}>Login</button>
        </>
    )
}

export default Register