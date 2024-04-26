import { useNavigate } from "react-router-dom"

const Logout=()=>{
    console.log("Logout re-rendering")
    const navigate=useNavigate()
    return(
        <>
        <button onClick={()=>{
            localStorage.removeItem('jwtToken')
            navigate('/login')
        }}>Logout</button>
        </>
    )
}

export default Logout
