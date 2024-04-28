const jwt=require("jsonwebtoken")
const password="123456"


const tokenBlackList=new Set()

function expiryToken(token)
{
    tokenBlackList.add(token)
}

function getJwtToken(payload)
{
    try{
        const token=jwt.sign(payload,password) // during login; payload would be email
        return token;
    }
    catch(err)
    {
        console.log("error while getToken:",err)
        return null;
    }
}

async function verifyJwtToken(req,res,next)
{
    console.log("req:headers:",req.headers)
    const token=req.headers.authorization.split(' ')[1]
    if(tokenBlackList.has(token))
    {
        console.log("token is black-listed")
        res.status(500).json({
            msg:"token is expired"
        })
        return;
    }
    // console.log(req.headers.authorization)
   try{
   
    const verified=await jwt.verify(token,password);
    if(verified)
      next();
    else
     {
        console.log("token is not verified!")
        res.status(500).json({
     msg:"token is not verified"
    })
    } 
   }
   catch(err)
   { 
    console.log("error while verifying token,",err)
    res.status(500).json({
        msg:"error while verifying token"
    })
   }
}

function decodeToken(token)
{
    const email=jwt.verify(token,password,(err,decodeToken)=>{
        if(err)
        {
            console.log("error:",err)
            return null
        }
        else
        {
            console.log("decoded Token:",decodeToken.email)
        return decodeToken.email;
        }
    });
    return email
    
}

module.exports={
    getJwtToken,
    verifyJwtToken,
    decodeToken,
    expiryToken
}