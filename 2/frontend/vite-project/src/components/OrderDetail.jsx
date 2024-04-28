import axios from "axios"
import { useState } from "react"

const OrderDetail=(props)=>{

    console.log("OrderDetail re-rendering")

    const [quantity,setQuantity]=useState(1)

    const headers={authorization:`Bearer ${localStorage.getItem('jwtToken')}`}
    return(
        <>
        <h1>{props.heading}</h1>
        <img src={props.pic}></img>
        <h2>{props.description}</h2>
        <button >Rate & Review</button>
        <button onClick={()=>{
            const bodyParam={
                quantity,
                item:props._id
            }
            axios.post('http://localhost:3000/cart-info',bodyParam,{headers})
        }}>Add to Cart</button>
        <input type="number" onChange={(e)=>setQuantity(e.target.value)}></input>
        <button>Buy</button>
        </>
    )
}

export default OrderDetail