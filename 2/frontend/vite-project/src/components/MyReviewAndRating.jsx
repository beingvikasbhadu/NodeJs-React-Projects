import axios from "axios"
import { useEffect, useState } from "react"

const MyReviewAndRating=()=>{
    console.log("My Review and Rating re-rendering")
         const [items,setItems]=useState([])
         const [rating,setRating]=useState(0)
         const [review,setReview]=useState("")
         const [reviewsAndRatings,setReviewsAndRatings]=useState([])
         const [isRatingEditable,setIsRatingEditable]=useState(false)
         const [isReviewEditable,setIsReviewEditable]=useState(false)
         const headers={authorization:`Bearer ${localStorage.getItem('jwtToken')}`}

         useEffect(()=>{
            const url1="http://localhost:3000/order-info"
            

            axios.get(url1,{headers}).then((res)=>{
                console.log("order-info:",res);
                const orderInfo=res.data.orderDetail
                orderInfo.map(async (order)=>{
                    const url2="http://localhost:3000/item"
                    const headers={_id:order.item}
                    const item=await axios.get(url2,{headers})
                    console.log("item:",item)
                     setItems([...items,item.data.item])
                })

            axios.get('http://localhost:3000/review-and-rating',{headers}).then((res)=>{
                console.log("reviews and ratings:",res);
                setReviewsAndRatings(res.data.reviewAndRating);
            })
            })

         },[])// when user add review

     return(
        <>
          {
            reviewsAndRatings.map(reviewAndRating=>{
              
                items.map(item=>{
                    if(item._id===reviewAndRating.item)
                    {
                       return(
                        <div key={reviewAndRating.item}>
                            <img src={item.pic}/>
                            <br></br>
                            <h1>{item.heading}</h1>
                            {
                                isRatingEditable ? <>
                                 <label>
                                Rating:
                                <select onChange={async (e)=>{
                                    setRating(e.target.value)
                                }}>
                                    <option value="1" >1</option>
                                    <option value="2" >2</option>
                                    <option value="3" >3</option>
                                    <option value="4" >4</option>
                                    <option value="5" >5</option>
                                </select>
                                <button onClick={async ()=>{
                                    const url="http://localhost:3000/review-and-rating"
                                    const bodyParam={
                                        rating
                                    }
                                    await axios.put(url,bodyParam,{...headers,_id:reviewAndRating._id});
                                    setIsRatingEditable(false)
                                }}>save</button>
                                <button onClick={()=>setIsRatingEditable(false)}>cancel</button>
                            </label>
                                </> :  <label>
                                Rating:{reviewAndRating.rating}
                                <button onClick={()=>setIsRatingEditable(true)}>Edit</button>
                            </label>
                            }
                            {
                                isReviewEditable ? <label>write review:
                                <textarea id="review" name="review" rows="4" cols="50" onChange={(e)=>{
                                    setReview(e.target.value)
                                }} ></textarea>
                                
                                <button onClick={async ()=>{
                                    if(review!="")
                                    {const url="http://localhost:3000/review-and-rating"
                                    const bodyParam={
                                        review
                                    }
                                    await axios.put(url,bodyParam,{...headers,_id:reviewAndRating._id});}
                                    setIsReviewEditable(false)
                                }}>save</button>
                                <button onClick={()=>setIsReviewEditable(false)}>cancel</button>
                          </label> :
                           <label>
                           {reviewAndRating ? `Review:${reviewAndRating.reviw}` :<></> }
                           <button onClick={()=>setIsReviewEditable(true)}>Edit</button>
                       </label>
                            }
                            
                           
                        </div>
                       )
                    }
                })
            })
          }
        </>
     )
}
export default MyReviewAndRating