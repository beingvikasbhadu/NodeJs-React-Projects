const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const model=mongoose.model;

// User
const userSchema=new Schema({
   email:{
    type:String,
    required:true,
    unique:true
   },
   name:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   gender:{
    type:String,
    enum:['male','female'],
    required:true
   },
   pic:{
    type:String,
    default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAACUCAMAAAAH411kAAAAM1BMVEXk5ueutLfb3t+nrrHn6eqrsbSyuLvh4+TS1dfJzc+4vcDV2Nrq7O3N0NLFycvAxceiqKxqmYakAAAFDUlEQVR4nO2d2XbjIAxAWQTYgKH//7UDbtpJUzsNIFvyTO9b+uR7BGIVFeJYAIRTYakEVX9dFhBqyVK/6U+kXxT1V/UAzoUktZEPaG1TcOJSMSpRme13lXeM9rO6kA+EZPW2yi1CMoWL+IBKdicsdz42qUj9pT8DMPsfXdYG5xf2KQ5cli/JFB2ZFW+dGH5uZHc+NnBubTC/rrLqmIVvdCA1BObmk9jmtvQ0LW+juer0yKw6HJm7ZHjqwNLcZz512KUCCN0yRSfw0gH36pi5hZG8htH42mxmV8dTC9wT5yGZOuzwmRSAGnMpWD5tDcba2RqczMUGluHQFGYuOuOhqYnAUWus4IRGSh5jqMMITe05HDanYMJwqToTh+C0L2p2bDJ9zwFlcWQKDMac/rnzI3qhdhEuo9nQNzXMhiYNtY0InSvOLfRELOOwMlrFZGobjydToLZBDE1pasQdRyF2m7pBQGsz4doQLwswk0BNA7QL6owpUxbUpDaAm9KkpI0N4kygYmhtULtNsSGVwbbRvza/Nv+DDa6MNLRzgX8qQyPsQH+Bdi4g8HYFVjytzejBzVeoZ52Y2wL0e1DqDdWGeCsaeSVNK4O8y2GJbcSC2HEM+a2OkVsPj1BvcuDu3ErynVvEfQ76XXUBE96JB/U2dG1qWFM1w+IGBFZT0zO1iah3ubDyAI97XTjzaAY5oAITTnBYHLAXHYzgkJ9EfYDScyyPXiNqcBBCw0VGgBsODoux5sbQjds1NExSwDsxDy0MTOIkU2ipVPmGZSYj3EBw3liMm1/oP51+43DN7pHeTEC+4tym734n1/Konuuqhsnl1C2m5sxm+cqUUbRtIWo8zz5zA1TLfNpwL/gEN71evTo53jK1sljlver1L2h/iUJ2EGG3Gv+vi71KEXv5zOmpj9GWfuusASjZTe9MdbT2gX31+gMQYdo8DbGLixdzWYlRhNnbO3ya6l+vCsQYnQphmkJQrvy6YlQ+gW9Qf1EP63c7pUpYSlw+KD+Uck5cyKp0//q60Jxyzr72mvooQqEmgNJzfM5pXqbgBPdWt4pMqUrcFB4HHXP7a7HyeQ4KuCq9Z7ASjO8OmyNodapJzvFLcjGqxa+N6gWRe6XS/HwKwEgIopvtSwHZlfJMhKrKxutVrWjNYq1T5mM4J4VGy5l2vfPkJa4eaoCIXiMDF5JBvc8l19fIFoJFXHHJIx3/iVDxOXeqUJZjLz9e1a5j/HxmRoCQh44EXvE5KyFEd6zL6iP9csakB+KMfAd6zye7wwfUiFwS+ZSDw1MCc0wi28b4I7MBOI89wPygIw/cqWp6hg9HR6djkhuI5cxW9oE+pLWBGztE78YccGcF1Mld5k7HTMgzHTi/y9z7zKgTUVoZ5JcjY/t5JjZ4OtSRqZiE1Hc4yKDpgOIgg1RpBEiPVo2DcpWdaNDcwAzPCqD3hdQDMHZwzga4VXaDGD9kM/aoKD56GVmORuTi1HEGug5ibQ0SQ23tlP2MNubethaRn3dBwXbeaMUtsMOit5R68F3ho+hbiuLVPOHSVz+BUlVzBD3B4dlrKqanWg/3HQREjG+/245WxolPe3kLBOpv3qe9+tCxbWiyo5DqzIONZlpXoaAYh0aa1NjUcF9HxKbx1XLEt3iPoPFdT9bdprkAaaQK7QQapwO4T6Ti01ZUzTsJtD58w3nsrDS9Heny3b+x5EhbhajiTlNL27hkzos2m2vyBy99T3fwCZ8fAAAAAElFTkSuQmCC"
   },
   phone:{
    type:String,
    required:true,
    unique:true
   },
   role:{
    type:String,
    enum:['buyer','seller'],
    required:true
   }
})

const User=new model('User',userSchema)


// Category
const categorySchema=new Schema({
    heading:{
        type:String,
        required:true,
        unique:true
    },
    pic:{
        type:String,
        required:true,
        unique:true
    }
})

const Category=new model('Category',categorySchema)


// Item
const itemSchema=new Schema(
    {
        heading:{
            type:String,
            required:true,
            unique:true
        },
        description:{
            type:String,
            required:true,
        },
        pic:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        delivery_charge:{
            type:String,
            default:0
        },
        waranty:{
            type:String,
            default:0 // in year
        },
        seller:{
            type:mongoose.Types.ObjectId, // it's referncing other model
            ref:'User', // that model is "User",
            required:true
        },
        category:{
            type:mongoose.Types.ObjectId,
            ref:'Category',
            required:true
        }
    }
)

const Item=new model('Item',itemSchema)



// Address
const addressSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    area:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    state:{
        type:String,
        enum:[
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal"
        ],
        required:true
    },
    type:{
        type:String,
        enum:['home','work'],
        required:true
    }
})

const Address=new model('Address',addressSchema)

// Order Detail
const orderDetailSchema=new Schema({
         user:{
            type:mongoose.Types.ObjectId,
            ref:'User',
            required:true
         },
         address:{
            type:mongoose.Types.ObjectId,
            ref:'Address',
            required:true
         },
         payment_mode:{
            type:String,
            enum:['cash','online'],
            required:true
         },
         quantity:{
            type:Number,
            default:1
         },
         item:{
            type:mongoose.Types.ObjectId,
            ref:"Item",
            required:true
         }
         
})

const OrderDetail=new model('OrderDetail',orderDetailSchema)

// Cart Detail

const cartDetailSchema=new Schema({
    quantity:{
        type:Number,
        default:1
    },
    item:{
        type:mongoose.Types.ObjectId,
        ref:"Item",
        required:true
    },
     user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
     }
})

const CartDetail=new model("CartDetail",cartDetailSchema)

// Reviews and Ratings
const reviewAndRatingSchema=new Schema({
    item:{
        type:mongoose.Types.ObjectId,
        ref:"Item",
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        default:""
    }
})

const ReviewAndRating=new model("ReviewAndRating",reviewAndRatingSchema)

module.exports={
    User,
    Item,
    Category,
    OrderDetail,
    CartDetail,
    ReviewAndRating,
    Address
}




