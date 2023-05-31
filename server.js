const express= require("express");
const dotenv =require("dotenv").config();
const app=express();
const port =process.env.PORT||5000;
const errorHandler=require('./middleware/errorhandler');
const { connect } = require("http2");
const connectDb=require("./config/dbConnection");
connectDb();



app.use(express.json());
app.use('/api/contacts',require("./routes/contactRoutes"));
app.use('/api/users',require("./routes/userRoutes"));
app.use(errorHandler);




app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
})