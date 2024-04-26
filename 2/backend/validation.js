const zod=require("zod")
const express=require('express')
const app=express()

app.use(express.json())


const registerSchema=zod.object({
    "email":zod.string().email(),
    "name":zod.string(),
    "password":zod.string().min(6),
    "gender":zod.literal("male").or(zod.literal("female")),
    "phone":zod.string().length(10),
    "pic":zod.string(),
    "role":zod.literal("buyer").or(zod.literal("seller")),
})

const loginSchema=zod.object({
    "email":zod.string().email(),
    "password":zod.string().min(6)
})

function loginInputValidation(req,res,next)
{
   const op=loginSchema.safeParse(req.body)
   if(op.success)
    next();
   else
    res.status(404).json({
    msg:"login input format is not correct!"
    })
}


function registerInputValidation(req,res,next)
{
    const op=registerSchema.safeParse(req.body);
    console.log(op)
    if(op.success)
     next()
    else
     res.status(400).json({
    msg:"registration input format is not correct!"
    })
}

module.exports={
    loginInputValidation,
    registerInputValidation
}