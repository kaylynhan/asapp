import User from "../models/user.model.js";
import express from 'express';
const userRoutes = express.Router();

//returns all data of all users
userRoutes.route('/').get(function(req, res){
    User.find(function(err, users){
        if (err){
            console.log(err);
        } else {
            res.json(users)
        }
    });
})

//adds a new user
userRoutes.route('/add').post(function(req, res){
    let user = new User({email: req.body.email, password: req.body.password});
    user.save()
        .then(user => {
            res.status(200).json(req.body);
        })
        .catch(err =>{
            res.status(400).send('failed to sign up user');
        })
})

export default userRoutes;