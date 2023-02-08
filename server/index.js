// by using type : module in package.json

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('./connection');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');
const commentRoutes = require('./routes/comment');
const app = express();

app.use(bodyParser.json({ limit: "3mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }));

app.use((err, req, res, next) => {
	if (err.type == "entity.too.large") {
		return res.status(413).send({ message: "Enitiy too large" });
	}
	next();
});


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/comment', commentRoutes);

app.use('/', (req, res) => { res.status(200).send("Server running successfully") })

app.listen(PORT, () => { console.log(`Listening to port ${PORT}👌😃`) });