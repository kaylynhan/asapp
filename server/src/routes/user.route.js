import User from '../models/user.model.js';
import express from 'express';
const userRoutes = express.Router();

/* Create */
//given an email and password, adds a new user
userRoutes.route('/add').post(function (req, res) {
    let user = new User({ email: req.body.email, password: req.body.password, schedules: []});
    user.save()
        .then(user => {
            res.status(200).json(`Successfully signed up user with email ${req.body.email}`);
        })
        .catch(err => {
            res.status(400).send(`Failed to sign up user with email ${req.body.email}\n${err}`);
        });
});

//given a user id and schedule, adds schedule to user's schedules
//Considered post bc not idempotent
userRoutes.route('/addSchedule').post(function (req, res) {

    User.updateOne(
        { _id: req.body.id },
        {$push:
            { schedules: req.body.schedule }
        }
    )
        .then(user => {
            res.status(200).send(`Successfully added schedule to ${req.body.id}`);
        })
        .catch(err => {
            res.status(400).send(`Failed to add schedule to ${req.body.id}\n${err}`);
        });
});

/* Read */
//given a user id, returns data of a user
userRoutes.route('/').get(function (req, res) {
    User.findOne({ _id: req.body.id })
        .then(user => {
            if (user === null){
                throw('No user with that id exists!')
            }
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(`Failed to get user with id ${req.body.id}\n${err}`)
        });
});

//given an email, returns password and id of a user
userRoutes.route('/idpassword').get(function (req, res) {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null){
                throw('No user with that email exists!')
            }
            res.status(200).json({
                _id: user._id,
                password: user.password
            });
        })
        .catch(err => {
            res.status(400).send(`Failed to get user with email ${req.body.email}\n${err}`)
        });
});

//given an email, returns whether or not it's already used (true or false)
userRoutes.route('/check').get(function (req, res) {
    User.count({email: req.body.email})
    .then( count => {
        if (count > 0){
            res.status(200).send(true);
        }else{
            res.status(200).send(false);
        }
    })
    .catch(err => {
        res.status(400).send(`Unable to check if ${req.body.email} is already in database \n${err}`);
    })
})

/* Update */
//given a user id, updates user's password
userRoutes.route('/updatePassword').put(function (req, res) {
    User.updateOne(
        { _id: req.body.id },
        {
            password: req.body.password
        }
    )
    .then(user => {
        res.status(200).send(`Successfully changed password of ${req.body.id}`);
    })
    .catch(err => {
        res.status(400).send(`Failed to change password of ${req.body.id}\n${err}`);
    });
});


//given a user id and schedule id, removes schedule
userRoutes.route('/removeSchedule').put(function (req, res) {
    User.updateOne(
        { _id: req.body.userID },
        {
            $pull: { 
                schedules: { _id: req.body.scheduleID } 
            }
        }
    )
    .then(user => {
        res.status(200).send(`Successfully removed schedule ${req.body.scheduleID} 
        of user ${req.body.userID}`);
    })
    .catch(err => {
        res.status(400).send(`Failed to remove ${req.body.scheduleID} 
        of user ${req.body.userID}\n${err}`);
    })
});

//given user id, schedule id and string for label, updates the label of a schedule
userRoutes.route('/label').put(function (req, res){
    User.updateOne(
        { _id: req.body.userID, 'schedules._id': req.body.scheduleID },
        {
           $set: {'schedules.$.label': req.body.label}
        }
    )
    .then(user => {
        res.status(200).send(`Successfully updated label of schedule ${req.body.scheduleID} of user ${req.body.userID}`);
    })
    .catch(err => {
        res.status(400).send(`Failure to update label of schedule ${req.body.scheduleID} of user ${req.body.userID}\n${err}`)
    })
});

//given user id, schedule id and string for footnotes, updates the footnotes of a schedule
userRoutes.route('/footnotes').put(function (req, res){
    User.updateOne(
        { _id: req.body.userID, 'schedules._id': req.body.scheduleID },
        {
           $set: {'schedules.$.footnotes': req.body.footnotes}
        }
    )
    .then(user => {
        res.status(200).send(`Successfully updated footnotes of schedule ${req.body.scheduleID} of user ${req.body.userID}`);
    })
    .catch(err => {
        res.status(400).send(`Failure to update footnotes of schedule ${req.body.scheduleID} of user ${req.body.userID}\n${err}`)
    })
});

/* Delete */
//given a user id, deletes the user
userRoutes.route('/remove').delete(function (req, res) {
    User.deleteOne({ _id: req.body.id })
        .then(user => {
            res.status(200).send(`Successfully deleted user ${req.body.id}`);
        })
        .catch(err => {
            res.status(400).send(`Failed to delete user ${req.body.id}\n${err}`);
        });
});



export default userRoutes;