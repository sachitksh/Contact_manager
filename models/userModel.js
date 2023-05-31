const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please fill the User name']
    },
    email:{
        type:String,
        required:[true,'Please fill the email address'],
        unique:[true,"Email address already in use"]
    },
    password:{
        type:String,
        required:[true,'Please fill the password']
    }
    
},{
    timestamps:true,
})

module.exports=mongoose.model("User", userSchema);