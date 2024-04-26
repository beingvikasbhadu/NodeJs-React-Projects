import {lazy,Suspense} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { RecoilRoot } from 'recoil'
const Search=lazy(()=>import('./components/Search')) 
const Login=lazy(()=>import('./components/Login'))
const Register=lazy(()=>import('./components/Register'))
const Logout=lazy(()=>import( "./components/Logout"))
const Item=lazy(()=>import('./components/Item'))
const Categories=lazy(()=>import('./components/Categories'))
const MyProfile=lazy(()=>import('./components/MyProfile'))
const ReviewAndRating=lazy(()=>import("./components/ReviewAndRating"))

function App() {
  console.log("App re-rendering")
  return(
    <>
     <BrowserRouter>
     <RecoilRoot>
     <Routes>
       <Route path="/login" element={<Suspense fallback={"Loading..."}><Login/></Suspense>}/>
       <Route path="/register" element={<Suspense fallback={"Loading..."}><Register/></Suspense>}/>
       <Route path="/logout" element={<Suspense fallback={"Loading..."}><Logout/></Suspense>}></Route>
       <Route path="/search" element={<Suspense fallback={"Loading..."}><Search/></Suspense>}></Route>
       <Route path="/add-item" element={<Suspense fallback={"Loading..."}><Item/></Suspense>}></Route>
       <Route path="/categories" element={<Suspense fallback={"Loading..."}><Categories/></Suspense>}></Route>
       <Route path="/my-profile" element={<Suspense fallback={"Loading..."}><MyProfile/></Suspense>}></Route>
       <Route path="/review-and-rating" element={<Suspense fallback={"Loading..."}><ReviewAndRating/></Suspense>}></Route>
     </Routes>
     </RecoilRoot>
     </BrowserRouter>
    </>
  )
}

export default App
