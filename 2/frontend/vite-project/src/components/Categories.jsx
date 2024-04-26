import { useRecoilState } from "recoil"
import { categoriesAtom } from "../store/atoms/Categories"
import axios from "axios";
import { useEffect } from "react";

const Categories=()=>{
   console.log("Categories re-rendering")

   const [categories,setCategories]=useRecoilState(categoriesAtom);

   useEffect(()=>{
    const url="http://localhost:3000/categories"

    axios.get(url).then((res)=>{
        console.log(res.data);
        setCategories(res.data.categories)
    }).catch(err=>console.log("error:",err));
   },[])

   return(
    <>
    {
        <div style={{
            border:"2px solid black",
            display:"flex",
            flexDirection:"row"
        }}>
        {
            categories.map((category)=>{
                return(
                    <div key={category._id} style={{
                        border:"2px solid red",
                        margin:"5px",
                        padding:"5px"
                    }}>
                    <div>
                   <img src={category.pic}></img>
               </div>
               <div>
                   <h1>
                       {category.heading}
                   </h1>
               </div>
               </div>
                )
            })
        }
        </div>     
    }
    </>
   )
}

export default Categories