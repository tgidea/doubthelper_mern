const mongoose = require('mongoose');
const Userdoubthelper = require('../modals/user');
const Roomdoubthelper = require('../modals/Room');

const generateSpace = async (req,res) => {
    try{        
        const user = await Userdoubthelper.findOne({_id : mongoose.Types.ObjectId(`${req.userId}`)});
        if(user.discussionSpace.length >= 2){
            return res.send(user.discussionSpace);
        }
        else{
            const newSpace = new Roomdoubthelper({
                user : req.userId,
                posts : []
            })
            await newSpace.save();
            user.discussionSpace.push(newSpace._id);
            await user.save();            
            res.status(201).send([...user.discussionSpace]);
        }
    } catch(error) {
        // console.log(error);
        res.status(500).sendd({message: "Something went wrong"})
    }
}
module.exports = {generateSpace}
