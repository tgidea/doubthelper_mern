// const Poll = require('../modals/Poll');
// const mongoose = require('mongoose');
// const { populate } = require("../modals/user");


// const getVoteDetails = async (req,res) => {
//     try{
//         const postId = req.params.id;
//         const postDetails = await Poll.findById(postId);

//         if(userDetails)return res.status(200).send({"error":false,"name":userDetails.name, "email":userDetails.email})
//         return res.status(400).send({"error":true,"message":"Invalid User"});
//     }catch(error){
//         res.status(500).send({"error":false, "message":"Internal Server Error"});
//     }
// }

// module.exports = { getUserDetails };


