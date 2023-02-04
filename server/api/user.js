const User = require('../modals/user');
const mongoose = require('mongoose');
const { populate } = require("../modals/user");


const getUserDetails = async (req,res) => {
    try{
        const id = req.params.id;
        const userDetails = await User.findById(id);
        if(userDetails)return res.status(200).send({"error":false,"name":userDetails.name, "email":userDetails.email})
        return res.status(400).send({"error":true,"message":"Invalid User"});
    }catch(error){
        res.status(500).send({"error":false, "message":"Internal Server Error"});
    }
}

module.exports = { getUserDetails };


