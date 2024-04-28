import { Suspense, useEffect, useMemo, useState,lazy } from "react"
import axios from 'axios'
import { RecoilRoot, useRecoilValue } from "recoil"
import { itemAtom } from "../store/atoms/Item"
import { BrowserRouter,Routes,Route, useNavigate } from "react-router-dom"

const ItemCardSmallList=lazy(()=>import('./ItemCardSmallList'))

const Search=({setIsClicked})=>{
    console.log("Search re-redering")

    const navigate=useNavigate()
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
    setIsClicked(true)
    navigate('./searched-items')
   }

   return (<>
<form className="max-w-md mx-auto">   
    <label  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" />
            </svg>
        </div>
        <input type="search" onChange={handleChange} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products..." required />
        <button type="submit" onClick={handleClick} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
                {/* {
                filteredItems.length ?
                    <div className="z-10 w-full bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {
                             filteredItems.slice(0,5).map((item)=>{
                                return(
                                    <li key={item._id} >
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.heading}</a>
                                </li>
                                )
                             })
        
                        }
                    </ul>
                </div>:<></>
                } */}

</form>

<RecoilRoot>
     <Routes>
        <Route path='/searched-items' element={<Suspense fallback={"Loading..."}><ItemCardSmallList items={filteredItems}></ItemCardSmallList></Suspense>}></Route>
     </Routes>
     </RecoilRoot>
   </>
   )
     
}

export default Search