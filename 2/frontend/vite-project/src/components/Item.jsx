import {  useEffect} from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { itemAtom } from "../store/atoms/Item"
import { categoriesAtom } from "../store/atoms/Categories"

const Item=()=>{
    console.log("Item re-redering")

    const [item,setItem]=useRecoilState(itemAtom)
  
    const [categories,setCategories]=useRecoilState(categoriesAtom)

    useEffect(()=>{
            const url1="http://localhost:3000/user-id";
            const headers= {authorization:`Bearer ${localStorage.getItem('jwtToken')}`}
      
            axios.get(url1,{headers}).then((res)=>{
                console.log("seller:",res.data._id)
                setItem(prevItem=>({...prevItem,seller:res.data._id}))
            }).catch(err=>console.log("error occured:",err))

            const url2="http://localhost:3000/categories";
           axios.get(url2).then((res)=>{
            console.log("categories:",res)
            setCategories(res.data.categories)}
           ).catch(err=>console.log("error:",err))
    },[])

  
    function handleChange(e)
    {
        const name=e.target.name;
        const value=e.target.value;

        if(name=="heading")
        setItem(prevItem=>({...prevItem,heading:value}))
        else
        if(name=="description")
        setItem(prevItem=>({...prevItem,description:value}))
        else
        if(name=="pic")
        setItem(prevItem=>({...prevItem,pic:value}))
        else
        if(name=="price")
        setItem(prevItem=>({...prevItem,price:value}))
        else
        if(name=="delivery_charge")
        setItem(prevItem=>({...prevItem,delivery_charge:value}))
        else
        if(name=="waranty")
        setItem(prevItem=>({...prevItem,waranty:value}))
        if(name=="category")
        { console.log("category_id:",value)
            setItem(prevItem=>({...prevItem,category:value}))}
    }
   
    function handleClick(e)
    {
        e.preventDefault()

        const url="http://localhost:3000/add-item";
        const headers= {authorization:`Bearer ${localStorage.getItem('jwtToken')}`}
        const bodyParam=item;
        console.log("item:",item)
        axios.post(url,bodyParam,{headers}).then((res)=>{
            console.log(res)
        }).catch(err=>console.log("error:",err))
    }

    return(
        <>
        <form>
            <input type="text" placeholder="heading" name="heading" onChange={handleChange} required/>
            <input type="text" placeholder="description" name="description" onChange={handleChange} required/>
            <input type="url" placeholder="pic" name="pic" onChange={handleChange} required/>
            <input type="number" placeholder="price" name="price" onChange={handleChange} required/>
            <input type="number" placeholder="delivery_charge" name="delivery_charge" onChange={handleChange} required/>
            <input type="number" placeholder="waranty" name="waranty" onChange={handleChange} required/>
            <select name="category" onChange={handleChange} required>
            <option value="">Select a category</option>
                {categories.map((category)=>{
                    return(
                        <option key={category._id} value={category._id} name="">{category.heading}</option>
                    )
                })}
            </select>
            <button type="submit" onClick={handleClick}>Add Item</button>
        </form>
        </>
    )
}


export default Item