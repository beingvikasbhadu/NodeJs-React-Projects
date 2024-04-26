import axios from "axios";
import { useEffect, useState } from "react";


const MyProfile=()=>{
    console.log("My Profile is re-rendering!")

    const [isEmailEditable,setIsEmailEditable]=useState(false);
    const [isPhoneEditable,setIsPhoneEditable]=useState(false);
    const [isNameEditable,setIsNameEditable]=useState(false)
    const [isPasswordEditable,setIsPasswordEditable]=useState(false)
    const [isGenderEditable,setIsGenderEditable]=useState(false)
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [name,setName]=useState("")
    const [gender,setGender]=useState("")
    const [currUser,setCurrUser]=useState({})
    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [passwordMatch,setPasswordMatch]=useState(true)
    const [user,setUser]=useState({})

    const headers={authorization:`Bearer ${localStorage.getItem('jwtToken')}`}
    const url="http://localhost:3000/user-info"

    useEffect(()=>{
            const url="http://localhost:3000/user-info"
            
            const headers= {authorization:`Bearer ${localStorage.getItem('jwtToken')}`}

            console.log("now use effect run")
            axios.get(url,{headers}).then( (res)=>{
                console.log("user:",res.data.user);
                const u=res.data.user;
                setEmail(u.email)
                setPhone(u.phone)
                setGender(u.gender)
                setName(u.name)
                 setCurrUser(res.data.user)
            }).catch(err=>console.log("error:",err));
            
    },[user])

    return(
        <>
        {
            isEmailEditable ? (
                    <div>
                    <label>
                        Email:<input value={email}  onChange={(e)=>{
                           setEmail(e.target.value)
                        }}></input>
                    </label>
                    <button name="save" onClick={ ()=>{
                       
                        axios.put(url,{email},{headers}).then((res)=>{
                            localStorage.removeItem('jwtToken')
                            localStorage.setItem('jwtToken',res.data.jwtToken)
                            setIsEmailEditable(false)
                            setUser(u=>({...u,email}))
                        
                        }
                        )
                           
                    }}>Save</button>

                    <button name="cancel" onClick={()=>
                         {
                            setEmail(currUser.email)
                        setIsEmailEditable(false)}}
                        >Cancel</button>
                </div>
            ) : (
                <div>
                <span>Email: {currUser.email}</span>
                <button name="Edit" onClick={()=>{
                    setIsEmailEditable(true)
                }}>Edit</button>
            </div>
            )
        }

          {
            isPhoneEditable ? (
                <div>
                <label>
                    phone:<input value={phone}  onChange={(e)=>{
                            setPhone(e.target.value)
                        }}></input>
                </label>
                <button name="save" onClick={async()=>{
                   
                    axios.put(url,{phone},{headers}).then(()=>{
                        setUser(u=>({...u,phone}))
                        setIsPhoneEditable(false)})
                }}>Save</button>
                <button name="cancel" onClick={()=>{
                    setPhone(currUser.phone)
                    setIsPhoneEditable(false)
                }}>Cancel</button>
            </div>
            ) : (
                <div>
                <span>Phone: {currUser.phone}</span>
                <button name="Edit" onClick={()=>setIsPhoneEditable(true)}>Edit</button>
            </div>
            )
        }

         {
            isNameEditable ? (
                <div>
                <label>
                    name:<input value={name}  onChange={(e)=>{
                            setName(e.target.value)
                        }}></input>
                </label>
                <button name="save" onClick={()=>{
                    
                     axios.put(url,{name},{headers}).then(()=>{
                        console.log("name saved!")
                        setUser(u=>({...u,name}))
                        setIsNameEditable(false)}
                    )
                }}>Save</button>
                <button name="cancel" onClick={()=>{
                    setName(currUser.name)
                    setIsNameEditable(false)}}>Cancel</button>
            </div>
            ) : (
                <div>
                <span>Name: {currUser.name}</span>
                <button name="Edit" onClick={()=>setIsNameEditable(true)}>Edit</button>
            </div>
            )
        }

         {
            isPasswordEditable ? (
                <div>
                <label>
                   Old Password:<input type="password"  onChange={(e)=>{
                             setOldPassword(e.target.value)
                        }}></input>
                   <br/>
                   New Password:<input type="password"  onChange={(e)=>{
                      setNewPassword(e.target.value)
                   }}/>
                   <br/>
                   Confirm Password: <input type="password"  onChange={(e)=>{
                    setConfirmPassword(e.target.value)
                    setPasswordMatch(e.target.value==newPassword)
                   }}/>
                </label>

                { (passwordMatch ?
                    <button name="save" onClick={async()=>{
                    
                    const res= await axios.get('http://localhost:3000/password-check',{headers:{
                        password:oldPassword,
                        authorization:`Bearer ${localStorage.getItem('jwtToken')}`
                    }});
                    if(res.data.passwordMatch)
                    {console.log("adf")
                        axios.put(url,{password:newPassword},{headers}).then(()=>{
                            setUser(u=>({...u,newPassword}))
                            setIsPasswordEditable(false)})
                    }  
                }}>Save</button> : <p>Password not matched</p>)}
                <button name="cancel" onClick={()=>setIsPasswordEditable(false)}>Cancel</button>
            </div>
            ) : (
                <div>
                <span>Password:</span>
                <button name="Edit" onClick={()=>setIsPasswordEditable(true)}>Edit</button>
            </div>
            )
        }

        {
            isGenderEditable ? (
                <div>
                    <label>
                        <input type="radio"  value="male" checked={gender=="male"}  onChange={(e)=>{
                            setGender(e.target.value)
                        }}></input>
                        Male
                    </label>
                    <label>
                        <input type="radio"  value="female" checked={gender=="female"}  onChange={(e)=>{
                            setGender(e.target.value)
                        }}></input>
                        Female
                    </label>
                    <button name="save" onClick={async ()=>{
                        
                         axios.put(url,{gender},{headers}).then(()=>{
                            setUser(u=>({...u,gender}))
                            setIsGenderEditable(false)})
                    }}>Save</button>
                    <button name="cancel" onClick={()=>{
                        setGender(currUser.gender)
                        setIsGenderEditable(false)}}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>Gender: {currUser.gender}</p>
                    <button name="edit" onClick={()=>setIsGenderEditable(true)}>Edit</button>
                </div>
            )
        }
        </>
        

    )

}

export default MyProfile