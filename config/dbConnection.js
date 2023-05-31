const mongoose=require("mongoose");


const connectDb = async ()=>{
    try{
        const password = encodeURIComponent("sachit@123");
        const connect = await mongoose.connect(`mongodb+srv://admin:${password}@sachitcluster.m4l5ove.mongodb.net/mycontacts_backend?retryWrites=true&w=majority`);
        console.log("Databaseconnected:",connect.connection.host,connect.connection.name)
    }
    catch(err){
        console.log(err);
        process.exit(1);

    }

};
module.exports=connectDb;