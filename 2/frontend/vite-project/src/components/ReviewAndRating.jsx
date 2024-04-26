import axios from "axios";
import { useEffect, useMemo, useState } from "react"

const ReviewAndRating=()=>{
   console.log("review-and-rating re-redering")

   const [review,setReview]=useState("")
   const [rating,setRating]=useState(1);
   const [currReviewAndRating,setCurrReviewAndRating]=useState({})
   const [reviewsAndRatings,setReviewsAndRatings]=useState([])
   const item="66275b6f512228e66e480cd4"
   const headers={
    authorization:`Bearer ${localStorage.getItem('jwtToken')}`}

   useEffect(()=>{
    const url="http://localhost:3000/reviews-and-ratings"
    headers._id=item;
    axios.get(url,{headers}).then((res)=>{
        setReviewsAndRatings(res.data.reviewsAndRatings)
    })
   },[currReviewAndRating])

    function averageRating(reviewsAndRatings)
    {
        const count=reviewsAndRatings.length;
        if(count==0)
        return "No Rating availabe"
        const sum= reviewsAndRatings.reduce((acc,currVal)=>{
                return acc+=currVal.rating
            },0);
        return sum/count;
    }

    function countRating(reviewsAndRatings,val)
    {
       return reviewsAndRatings.reduce((acc,currVal)=>{
            if(currVal.rating==val) acc+=1;
            return acc;
        },0)
    }

   const avgRating=useMemo(()=>{
    console.log("average rating calculating")
      return averageRating(reviewsAndRatings);
    },[reviewsAndRatings])

  const cntRating5=useMemo(()=>{
    return countRating(reviewsAndRatings,5)
  },[reviewsAndRatings])
 
  const cntRating4=useMemo(()=>{
    console.log("rating 4 calulating")
    return countRating(reviewsAndRatings,4)
  },[reviewsAndRatings])

  const cntRating3=useMemo(()=>{
    return countRating(reviewsAndRatings,3)
  },[reviewsAndRatings])

  const cntRating2=useMemo(()=>{
    return countRating(reviewsAndRatings,2)
  },[reviewsAndRatings])

  const cntRating1=useMemo(()=>{
    return countRating(reviewsAndRatings,1)
  },[reviewsAndRatings])
   
  return(
    <>
    <div>average Rating: {avgRating}</div>
    <div>
        <div>
            5: {
                    cntRating5
                }
        </div>

        <div>
            4: {
                    cntRating4
                }
        </div>

        <div>
            3: {
                    cntRating3
                }
        </div>

        <div>
            2: {
                    cntRating2
                }
        </div>

        <div>
            1: {
                    cntRating1
                }
        </div>
    </div>
     <div>
        <label>
            Give Rating:
            <select onChange={(e)=>{
                setRating(e.target.value)
            }} required>
                <option>choose rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </label>
     </div>
     <div>
        <label>write review:</label><br></br>
     <textarea id="review" name="review" rows="4" cols="50" onChange={(e)=>{
        setReview(e.target.value)
     }}></textarea>
     </div>
     <button onClick={async()=>{

        const res=await axios.get("http://localhost:3000/review-and-rating",{headers})
        console.log("1:",res.data.reviewAndRating)
       const isReviewed=res.data.reviewAndRating.find(obj=>obj.item==item)
       if(!isReviewed)
        {const url="http://localhost:3000/review-and-rating";
        const bodyParam={
            review,
            rating,
            item
        }
        console.log("bodyParam:",bodyParam)
        axios.post(url,bodyParam,{headers}).then((res)=>{
            console.log("response:",res)
            setCurrReviewAndRating({rating,review,item})
        })
    }
    else
    {
        console.log("you already reviewed this item")
    }

     }}>Submit</button>
    </>
  )
}

export default ReviewAndRating