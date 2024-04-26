import { useEffect, useMemo, useState } from "react"
import axios from 'axios'
import { useRecoilValue } from "recoil"
import { itemAtom } from "../store/atoms/Item"

const Search=()=>{
    console.log("Search re-redering")

   const [inputField,setInputField]=useState("")
   const [items,setItems]=useState([])
   const [filteredItems,setFilteredItems]=useState([])
   const item=useRecoilValue(itemAtom)

   useEffect(()=>{
    const url="http://localhost:3000/items";
    axios.get(url).then((res)=>{
        console.log("before setItems")
        setItems(res.data.items);
        console.log("items:",res.data.items);
    }).catch(err=>console.log("error:",err))
   },[item])

   
   useMemo(()=>{
    if(inputField)
    {console.log("useMemo triggered!",inputField)
    const val=items.filter(item=>item.heading.toLowerCase().includes(inputField.toLowerCase()));
    setFilteredItems(val)}
   },[inputField,items])

   function handleChange(e)
   {
    setInputField(e.target.value);

   }
   
   function handleClick(e)
   {
    e.preventDefault()
    console.log("search button clicked!")
   }

   return (<>
   <form>
   <input type="text" onChange={handleChange}></input>
   <button type="submit" onClick={handleClick}>search</button>
   </form>
   {
    filteredItems.map((item)=>{
       return(
        <div key={item._id} >
            {item.heading}
        </div>
       )
    })
   }
   </>
   )
     
}

export default Search