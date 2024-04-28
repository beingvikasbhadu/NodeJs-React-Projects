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
    <div className="flex justify-between">
    {
        categories.map(category=>{
           return (<div key={category._id} className=" m-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg" src={category.pic} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category.heading}</h5>
        </a>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Check It Out!
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor"  d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>)
        })
    }
    </div>
   )
}

export default Categories