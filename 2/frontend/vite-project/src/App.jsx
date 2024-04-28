import {lazy,Suspense, useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { RecoilRoot } from 'recoil'


const Login=lazy(()=>import('./components/Login'))
const Register=lazy(()=>import('./components/Register'))
const Logout=lazy(()=>import( "./components/Logout"))
const Item=lazy(()=>import('./components/Item'))
const MyProfile=lazy(()=>import('./components/MyProfile'))
const ReviewAndRating=lazy(()=>import("./components/ReviewAndRating"))
const MyReviewAndRating=lazy(()=>import("./components/MyReviewAndRating"))
const Home=lazy(()=>import('./components/Home'))
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
       <Route path="/home/*" element={<Suspense fallback={"Loading..."}><Home/></Suspense>}></Route>
       <Route path="/add-item" element={<Suspense fallback={"Loading..."}><Item/></Suspense>}></Route>
       <Route path="/my-profile" element={<Suspense fallback={"Loading..."}><MyProfile/></Suspense>}></Route>
       <Route path="/review-and-rating" element={<Suspense fallback={"Loading..."}><ReviewAndRating/></Suspense>}></Route>
       <Route path="my-review-and-rating" element={<Suspense fallback={"Loading..."}><MyReviewAndRating></MyReviewAndRating></Suspense>}></Route>
     </Routes>
     </RecoilRoot>
     </BrowserRouter>
    </>
  )
}

export default App
