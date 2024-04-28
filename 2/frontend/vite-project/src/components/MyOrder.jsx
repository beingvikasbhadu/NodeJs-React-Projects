import axios from "axios"
import { useEffect, useState } from "react"

const MyOrder=()=>{
    console.log("My Order re-rendering!")

    const [orders,setOrders]=useState([])
    const headers={authorization:`Bearer ${localStorage.getItem("jwtToken")}`}
    
    useEffect(()=>{
     const url="http://localhost:3000/order-info"
     axios.get(url,{headers}).then((res)=>{  
        setOrders(res.data.orderDetail)
     })
    },[])// when an order is placed

    return(
        {
             orders.map(async (order)=>{
                const address=await axios.get("http://localhost:3000/address-by-id",{...headers,_id:order.address})
                const item=await axios.get("http://localhost:3000",{...headers,_id:order.item})

                return(

                    <div key={order._id}>
                       <img src={item.pic}></img>
                       <br/>
                       <h1>{item.heading}</h1>
                       <h1>{address.name,address.phone,address.pincode,address.type}</h1>
                       <h1>quantity:{order.quantiry}</h1>
                       <h1>paymentMode:{order.payement_mode}</h1>
                    </div>
                )
            })
        }
    )
}