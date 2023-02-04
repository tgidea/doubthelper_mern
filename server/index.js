// by using type : module in package.json

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('./connection');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');
const apiRoutes = require('./routes/api');
const app = express();

app.use(bodyParser.json({limit : "3mb", extended:true}));
// app.use(bodyParser.json({extended:false}));
app.use(bodyParser.urlencoded({limit : "3mb", extended:true}));
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/api', apiRoutes);

app.use('/',(req,res)=>{res.status(200).send("Server running successfully")})

app.listen(PORT , () => {console.log(`Listening to port ${PORT}👌😃`)});