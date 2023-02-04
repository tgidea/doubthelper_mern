const jwt = require("jsonwebtoken");
const path = require('path');
const rasta = path.join(__dirname,'../config.env');
require('dotenv').config({ path: rasta });
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
    try {
        let credential = req.headers.authorization;
        if (!credential) {
            return res.status(400).send({message : "not authenticated."})            
        }
        else {
            credential = credential.split(" ")[1];          
            let decodedData = jwt.verify(credential, secret);            
            req.userId = decodedData?.id;
            next();
        }
    } catch (error) {
        console.log("Some error occur in token");
        res.status(400).send({message:"Not authorized"})
        
    }
};

module.exports = auth;
