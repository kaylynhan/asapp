import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from "./routes/user.route.js";
import courseRoutes from "./routes/course.route.js"

const port = process.env.PORT || 4000;
const app = express();
const uri = 'mongodb://127.0.0.1:27017/asappdb';

app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production'){
    uri ='mongodb+srv://heroku-asapp:thanksgivingchevrolet@asapp-8pzku.mongodb.net/test?retryWrites=true&w=majority'
    app.use(express.static('../client/build/'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use('/users', userRoutes);
app.use('/courses', courseRoutes);

app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});

