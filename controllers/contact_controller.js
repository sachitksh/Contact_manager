//desc get all contacts
//route get/api/contatcs
//access public
const async_handler=require('express-async-handler');
const Contact=require('../models/contactModel');

const getcontact = async_handler(async(req,res)=>{

    const contacts=await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts);
    
  
});
const createcontact = async_handler(async(req,res)=>{
    console.log("the request body is:",req.body);
    const {name,email,phone}=req.body;
    if(!name|| !email || !phone)
    {
        res.status(400);
        throw new Error("all fields ar mandatory")
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });

    res.status(201).json(contact);
});

const updatecontact = async_handler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not found");
    }
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("user dont have permission to update other users contact ")
    }


    const updated_contact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updated_contact)
})

const deletecontact = async_handler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not found");
    }
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("user dont have permission to delete other users contact ")
    }
    await contact.deleteOne();
    res.status(200).json(contact);
});

const showcontact = async_handler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not found");
    }
    res.status(200).json(contact);
})


module.exports={getcontact,createcontact,updatecontact,deletecontact,showcontact};