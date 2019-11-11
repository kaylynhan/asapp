import Course from "../models/course.model.js"
import express from 'express';
const courseRoutes = express.Router();

export default courseRoutes;

/* Create */
//Creates a course
courseRoutes.route('/add').post(function(req, res){
    let course = new Course(
        {
            name: req.body.name,
            units: req.body.units,
            description: req.body.units,
            prereqs: req.body.units,
            section_list: req.body.section_list
        }
    );
    course.save()
        .then(course => {
            res.status(200).send(`Course ${req.body.name} successfully saved`);
        })
        .catch(err =>{
            res.status(400).send(`Failed to sign up user\n${err}`);
        });
});

//Creates multiple new courses
courseRoutes.route('/addMany').post(function(req, res){
    Course.insert(req.courses)
        .then(courses => {
            res.status(200).send('All courses successfully saved!');
        })
        .catch(err => {
            res.status(400).send(`Error when attempting to save courses\n${err}`)
        });

});

/* Read */
//Gets a course with all of its info
courseRoutes.route('/').get(function (req, res){
    Course.findOne({_id: req.body.id})
        .then(course => {
            res.status(200).json(course);
        })
        .catch(err => {
            res.status(400).send(`Failed to get course ${req.body._id}\n${err}`);
        });
});

//Gets a course's section dlist
courseRoutes.route('/sections').get(function (req, res){
    Course.findOne({_id: req.body.id})
        .then(course => {
            res.status(200).json(course.section_list);
        })
        .catch(err => {
            res.status(400).send(`Failed to get section details of course 
                ${req.body.id}\n${err}`);
        });
});

//Gets all of the courses but without their section details
courseRoutes.route('/overviews').get(function (req,res){
    Course.find({}).select("-section_list")
        .then(courses => {
            res.status(200).json(courses);
        })
        .catch(err => {
            res.status(400).send(`Failed to get courses' overviews\n${err}`)
        });
});

/* Update */
//Updates the content of a course
courseRoutes.route('/update').put(function (req, res){
    Course.updateOne(
        {_id: req.body.id},
        {
            name: req.body.name,
            units: req.body.units,
            description: req.body.units,
            prereqs: req.body.units,
            section_list: req.body.section_list
        }
    );
});

/* Delete */
//Deletes a course
courseRoutes.route('/remove').delete(function (req, res){
    Course.deleteOne({_id: req.body.id})
    .then(course => {
        res.status(200).send(`Successfully deleted course ${req.body.id}`);
    })
    .catch(err => {
        res.status(400).send(`Failed to delete course ${req.body.id}\n${err}`)
    });
});