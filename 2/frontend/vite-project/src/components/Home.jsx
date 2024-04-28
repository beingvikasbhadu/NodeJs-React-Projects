import { lazy, useState } from "react"

const Categories=lazy(()=>import('./Categories'))
const Search=lazy(()=>import('./Search'))


const Home=()=>{

    const [isClicked,setIsClicked]=useState(false)
    return(
        <div>
             <Search setIsClicked={setIsClicked}></Search>
        {isClicked ? <></> : <Categories></Categories>}
    </div>
    )
}

export default Home