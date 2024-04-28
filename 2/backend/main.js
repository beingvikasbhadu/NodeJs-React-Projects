const express=require('express')
const app=express()
const cors=require('cors')

app.use(cors())

const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://beingvikasbhadu:YCLy0VJ6JPq118E9@cluster0.jyok8uy.mongodb.net/E-Commerce")

// Import DB schemas
const {User,Item,Category,OrderDetail,CartDetail,Address,ReviewAndRating}=require('./db');

const bcrypt=require("bcrypt")

//
const {getJwtToken,verifyJwtToken,decodeToken, expiryToken}=require('./jwtToken');
const { loginInputValidation, registerInputValidation } = require('./validation');

app.use(express.json())

// Authorizatoin
async function authorizatoin(req,res,next)
{
    console.log("authorization happening!")
    const {email,password}=req.body;
    
  console.log(req.body)
    try{
        const user=await User.findOne({email});
        
        if(!user)
        {
            console.log("user is not found!")
            res.status(401).json({
                msg:"user is not found!"
            })
        }
        else
        {
           
            const passwordMatch=await bcrypt.compare(password,user.password)
            console.log('user:',user)
            console.log(password)
            console.log(passwordMatch)
            if(passwordMatch)
            next();
           else
           { console.log("password not matched!") 
             res.status(401).json({
           msg:"password not matched!"
           })
          }
        }
    }
    catch(err)
    {
        console.log("error in authorization:",err)
        res.status(500).json({
            msg:"database handling error"
        })
    }
}

//
async function getUserId(token)
{
   const email=decodeToken(token);
//    console.log("email:",email)
    const user=await User.findOne({email});
    // console.log("user:",user)
    return user._id;
}

// Login
app.post('/login',loginInputValidation,authorizatoin,(req,res)=>{
    console.log("login kk liye aaye")
      const jwtToken=getJwtToken({email:req.body.email});
      console.log("logged In Successfully!")
      res.status(200).json({
        jwtToken
      })
})


// Register
app.post('/register',registerInputValidation,async (req,res)=>{
    console.log("after register validation")
    const {email,name,password,gender,pic,phone,role}=req.body;
    const hashedPassword=await bcrypt.hash(password,10)
    try{
        await new User({email,name,password:hashedPassword,gender,pic,phone,role}).save();
        console.log("registration successfully!")
        res.status(200).json({
            msg:"registration done!"
        })
    }
    catch(err)
    {
        console.log("error while registration:",err)
        res.status(401).json({
            msg:"registration not done!"
        })
    }
})

// GET: user-info
app.get('/user-info',verifyJwtToken,async (req,res)=>{
    // console.log("req.headers.authorizatoin:",req.headers.authorization)
    const token=req.headers.authorization.split(' ')[1]
    const email=decodeToken(token);
    
    const user=await User.findOne({email});
    res.status(200).json({
        user
    })
})

// GET: order-info
app.get('/order-info',verifyJwtToken,async (req,res)=>{
    console.log(req.headers)
    const token=req.headers.authorization.split(' ')[1];
    
    const user=await getUserId(token);
    const orderDetail=await OrderDetail.find({user});

    res.status(200).json({
        orderDetail
    })
})

// GET: cart-info
app.get('/cart-info',verifyJwtToken,async (req,res)=>{
    const token=req.headers.authorizatoin.split(' ')[1];

    const user=await getUserId(token);
    const cartDetail=await CartDetail.find({user});

    res.status(200).json({
        cartDetail
    })
})

// GET: review-and-rating
app.get('/review-and-rating',verifyJwtToken,async (req,res)=>{
    const token=req.headers.authorization.split(' ')[1];

    const user=await getUserId(token);

    const reviewAndRating=await ReviewAndRating.find({user});

    res.status(200).json({
        reviewAndRating
    })
})

// GET: reviews-and-ratings
app.get('/reviews-and-ratings',async (req,res)=>{
    console.log("req.headers:",req.headers)
    
    const _id=req.headers._id;

    const reviewsAndRatings=await ReviewAndRating.find({item:_id});
  console.log(reviewsAndRatings)
    res.status(200).json({
        reviewsAndRatings
    })
})

// GET: address
app.get('/address',verifyJwtToken,async (req,res)=>{
    const token=req.headers.authorizatoin.split(' ')[1];

    const user=await getUserId(token);

    const address=await Address.find({user});

    res.status(200).json({
        address
    })
})


// GET: address-by-id
app.get('/address-by-id',verifyJwtToken,async(req,res)=>{
     
    const {_id}=req.headers
    const address=await Address.findOne({_id})
    res.status(200).json({
        address
    })
})

// GET: categories
app.get('/categories',async (req,res)=>{
    console.log("in /categories")
     const categories=await Category.find({});
     
     res.status(200).json({
        categories  
     })
})

// GET: items
app.get('/items',async (req,res)=>{
    
    const items=await Item.find({});
    
    res.status(200).json({
        items
    })
})


// GET: item
app.get('/item',async (req,res)=>{
    const {_id}=req.headers;

    const item=await Item.findOne({_id});
    
    res.status(200).json({
        item
    })
})

// GET: category
app.get('/category',async (req,res)=>{
    const {category}=req.headers;

    const categoryDetail=await Category.findOne({heading:category});

    res.status(200).json({
        category:categoryDetail
    })
})

// GET: /user-id
app.get('/user-id',verifyJwtToken,async (req,res)=>{
    
    const token=req.headers.authorization.split(' ')[1];
    
    const user=await getUserId(token);

    res.status(200).json({
        _id:user
    })
})


// GET: password-match 
app.get('/password-check',verifyJwtToken,async (req,res)=>{
    const enteredPassword=req.headers.password;
    const token=req.headers.authorization.split(' ')[1];
 
    const _id=await getUserId(token);
    const  user=await User.findOne({_id});
    const passwordMatch=await bcrypt.compare(enteredPassword,user.password)
    console.log("user:",user.password)
    console.log(enteredPassword)
    console.log(passwordMatch)
    res.status(200).json({
        passwordMatch
    })
})
// POST: order-info
app.post('/order-info',verifyJwtToken,async (req,res)=>{
    const token=req.headers.authorizatoin.split(' ')[1];

    const user=await getUserId(token);

    const {payement_mode,quantity,address,item}=req.body;

    await new OrderDetail({payement_mode,quantity,address,item,user}).save();

    console.log("order detail saved!")
    res.status(200).json({
        msg:"order detail saved!"
    })

})

// POST: cart-info
app.post('/cart-info',verifyJwtToken,async (req,res)=>{
    const token=req.headers.authorizatoin.split(' ')[1];

    const user=await getUserId(token);

    const {quantity,item}=req.body;

   const isCarted=await CartDetail.findOne({item})
   if(isCarted)
    {
        const new_quantity=quantity+isCarted.quantity;
        await CartDetail.updateOne({item,user},{quantity:new_quantity})
    }
    else
    {await new CartDetail({quantity,item,user}).save();
    }

    console.log("cart detail saved!")

    res.status(200).json({
        msg:"cart detail saved!"
    })
})

// POST: review-and-rating
app.post('/review-and-rating',verifyJwtToken,async (req,res)=>{
    // i want one user can submit only one review for one product
    const token=req.headers.authorization.split(' ')[1];

    const user=await getUserId(token);

    const {rating,review,item}=req.body;

    await new ReviewAndRating({rating,review,item,user}).save();

    console.log("review and rating saved!")

    res.status(200).json({
        msg:"review and rating saved!"
    })
})

// POST: address
app.post('/address',verifyJwtToken,async (req,res)=>{
    const token=req.headers.authorizatoin.split(' ')[1];

    const user=await getUserId(token);

    const {name,phone,area,pincode,state,type}=req.body;

    await new Address({name,phone,area,pincode,state,type,user}).save();

    console.log("address saved!")

    res.status(200).json({
        msg:"address saved!"
    })
})

// POST: add-item
app.post('/add-item',verifyJwtToken,async (req,res)=>{
   console.log("/add-item")
    const token=req.headers.authorization.split(' ')[1];

    const seller=await getUserId(token);

    const {heading,description,pic,price,delivery_charge,waranty,category}=req.body;
     console.log("seller:",seller)
     console.log(req.body)
    await new Item({heading,description,pic,price,delivery_charge,waranty,category,seller}).save();

    console.log("item saved!")

    res.status(200).json({
        msg:"item saved!"
    })
})

// PUT: order-info
app.put('/order-info',verifyJwtToken,async (req,res)=>{
   const {_id}=req.query;
   const newData=req.body;

    await OrderDetail.updateOne({_id},newData);

    console.log("order updated!")
    
    res.status(200).json({
        msg:"order updated!"
    })
})

// PUT: cart-info
app.put('/cart-info',verifyJwtToken,async (req,res)=>{
   const {_id}=req.headers;
   const newData=req.body;
   
   await CartDetail.updateOne({_id},newData);

   console.log("cart updated!")
   
   res.status(200).json({
    msg:"cart updated!"
   })
})

// PUT: address
app.put('/address',verifyJwtToken,async (req,res)=>{
    const {_id}=req.headers;
    const newData=req.body;

    await Address.updateOne({_id},newData);
    
    console.log("address updated!");

    res.status(200).json({
        msg:"address updated!"
    })
})

// PUT: review-and-rating
app.put("/review-and-rating",verifyJwtToken,async (req,res)=>{
    const {_id}=req.headers;
    const newData=req.body;

    await ReviewAndRating.updateOne({_id},newData);
    
    console.log("review and rating updated!");

    res.status(200).json({
        msg:"review and rating updated!"
    })
})



// PUT: user-info
app.put("/user-info",verifyJwtToken,async (req,res)=>{
     console.log("update user:",req.body)
    const token=req.headers.authorization.split(' ')[1]
    const _id=await getUserId(token)
    const newData=req.body;
    var jwtToken=token
    if(req.body.email!=undefined)
      {
        // expiry previous token
        expiryToken(token)
       jwtToken=getJwtToken({email:req.body.email})
    
      }
      // hash it
    if(req.body.password!=undefined)
    {
      newData.password=await bcrypt.hash(newData.password,10)
    }
     
    await User.updateOne({_id},newData);
    console.log("newdata:",newData)
    
    console.log("me to ye wala bhej rha:",jwtToken)
    res.status(200).json({
        jwtToken
    })
})

// DELETE: cart-info
app.delete('/cart-info',verifyJwtToken,async (req,res)=>{
    const {_id}=req.headers;

    await CartDetail.deleteOne({_id});
    
    console.log("delete operation on cart executed!")

    res.status(200).json({
        msg:"delete operation on cart executed!"
    })
})

// DELETE: address
app.delete('/address',verifyJwtToken,async (req,res)=>{
    const {_id}=req.headers;

    await Address.deleteOne({_id});
    
    console.log("delete operation on address executed!")

    res.status(200).json({
        msg:"delete operation on address executed!"
    })
})

// DELETE: review-and-rating
app.delete('/review-and-rating',verifyJwtToken,async (req,res)=>{
    const {_id}=req.headers;

    await ReviewAndRating.deleteOne({_id});
    
    console.log("delete operation on review and rating executed!")

    res.status(200).json({
        msg:"delete operation on review and rating executed!"
    })
})



app.use((err,req,res,next)=>{
    console.log("something went wrong!")
    res.status(500).json({
        msg:"something went wrong!"
    })
})

app.listen(3000)