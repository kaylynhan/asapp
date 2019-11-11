import User from '../models/user.model.js';
import express from 'express';
const userRoutes = express.Router();

/* Create */
//adds a new user
userRoutes.route('/add').post(function (req, res) {
    let user = new User({ email: req.body.email, password: req.body.password, schedules: null });
    user.save()
        .then(user => {
            res.status(200).json(req.body);
        })
        .catch(err => {
            res.status(400).send(`Failed to sign up user\n${err}`);
        });
});

//add schedule(s) for a user
//pass in user's id and schedule to add
userRoutes.route('/addSchedule').put(function (req, res) {
    User.updateOne(
        { _id: req.body.id },
        {$push:
            { schedules: req.body.schedule }
        }
    )
        .then(user => {
            res.status(200).send('Successfully added schedule');
        })
        .catch(err => {
            res.status(400).send(`Failed to add schedule to ${req.body.id}\n${err}`);
        });
});

/* Read */
//returns data of a user
userRoutes.route('/').get(function (req, res) {
    User.findOne({ _id: req.body.id })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(`Failed to get user ${req.body.id}\n${err}`)
        });
});

/* Update */
//given an id, updates user's password
userRoutes.route('/updatePassword').put(function (req, res) {
    User.updateOne(
        { email: req.body.email },
        {
            $set:
                { password: req.body.password }
        }
    )
    .then(user => {
        res.status(200).send('Successfully changed password');
    })
    .catch(err => {
        res.status(400).send(`Failed to change password\n${err}`);
    });
});

/* Delete */
//deletes a user
userRoutes.route('/remove').delete(function (req, res) {
    User.deleteOne({ _id: req.body.userID })
        .then(user => {
            res.status(200).send(`Successfully deleted user ${req.body.userID}`);
        })
        .catch(err => {
            res.status(400).send(`Failed to delete user ${req.body.userID}\n${err}`);
        });
});

//deletes a schedule of a user
userRoutes.route('/removeSchedule').delete(function (req, res) {
    User.updateOne(
        { _id: req.body.userID },
        {
            $pull:
                { schedules: { _id: req.body.scheduleID } 
            }
        }
    )
        .then(user => {
            res.status(200).send(`Successfully removed schedule ${req.body.scheduleID} 
            of user ${req.body.userID}`);
        })
        .catch(err => {
            res.status(400).send(`Failed to remove ${req.body.scheduleID} 
            of user ${req.body.userID}\n${err}`)
        })
});

export default userRoutes;