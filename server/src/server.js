import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from "./routes/user.route.js";
import courseRoutes from "./routes/course.route.js"

const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/asappdb', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use('/users', userRoutes);
app.use('/courses', courseRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

