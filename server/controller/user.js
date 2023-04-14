const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
const path = require('path');
const rasta = path.join(__dirname,'../config.env');
require('dotenv').config({ path: rasta });

const UserModal = require("../modals/user.js");

const secret = process.env.SECRET;

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (password.length < 2) res.status(500).json({ message: "Password not match" });
        const oldUser = await UserModal.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const credential = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, credential });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const credential = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "24h" });

        res.status(201).json({ result, credential });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log("Error occured in controller/user");
    }
};
const signUpGoogle = async (req, res) => {
    try {
        const { credential } = req.body;
        var decodedHeader = jwt_decode(credential);
        const {email, name} = decodedHeader;
        const oldUser = await UserModal.findOne({ email });
        if (oldUser){                        
            const credential = jwt.sign( { email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" } );                        
            return res.status(200).json({result:oldUser,credential});
        } 
        else{
            const result = await UserModal.create({ email,password : "_", name });
            const credential = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
            res.status(201).json({ result, credential });
        }
    } catch (error) {

        // console.log(error);
        res.status(500).json({ message: "Something went wrong" });

    }
};

module.exports = { signin, signup, signUpGoogle };