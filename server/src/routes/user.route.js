import User from '../models/user.model.js';
import express from 'express';
const userRoutes = express.Router();

//returns data of a user
userRoutes.route('/').get(function(req, res){
    User.findOne({_id: req.body._id})
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(`Failed to get user ${req.body._id}\n${err}`)
        })
})

//adds a new user
userRoutes.route('/add').post(function(req, res){
    let user = new User({email: req.body.email, password: req.body.password, schedules: null});
    user.save()
        .then(user => {
            res.status(200).json(req.body);
        })
        .catch(err =>{
            res.status(400).send(`Failed to sign up user\n${err}`);
        })
})

//add schedule(s) for a user
//pass in user's email and array of schedule(s) to add
userRoutes.route('/add/schedule').put(function(req, res){
    User.updateOne(
        {email: req.body.email},
        {
           $push: {schedules: {$each: req.body.schedules}}
        }
    )
    .then(user => {
        res.status(200).send('Successfully added schedule(s)');
    })
    .catch(err => {
        res.status(400).send(`Failed to add schedule(s)\n${err}`);
    })
})

//deletes a user
userRoutes.route('/remove').delete(function(req, res){
    User.deleteOne({email: req.body.email})
    .then(user => {
        res.status(200).send(`Successfully deleted user ${req.body.email}`);
    })
    .catch(err => {
        res.status(400).send(`Failed to delete user ${req.body.email}\n${err}`);
    })
})

//given an email, updates email user's password or schedules
//called when reset user password or changing schedules from user page
userRoutes.route('/update').put(function(req, res){
    if (req.body.pasword){
        User.updateOne(
            {email: req.body.email},
            {
                $set: {password: req.body.password}
            }
        )
        .then(user => {
            res.status(200).send('Successfully changed password');
        })
        .catch(err => {
            res.status(400).send(`Failed to change password\n${err}`);
        })
    }
    if (req.body.schedules){
        User.updateOne(
            {email: req.body.email},
            {
                $set: {schedules: req.body.schedules}
            }
        )
        .then(user => {
            res.status(200).send('Successfully updated schedules');
        })
        .catch(err => {
            res.status(400).send(`Failed to update schedules\n${err}`);
        })
    }
})

export default userRoutes;