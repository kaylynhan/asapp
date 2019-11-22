import Course from "../models/course.model.js"
import express from 'express';
const courseRoutes = express.Router();

export default courseRoutes;

/* Create */
//given a course json, creates a course
courseRoutes.route('/add').post(function(req, res){
    let course = new Course(
        {
            name: req.body.name,
            department: req.body.department,
            number: req.body.number,
            description: req.body.description,
            prereqs: req.body.prereqs,
            units: req.body.units,
            sections: req.body.sections
        }
    );
    course.save()
        .then(course => {
            res.status(200).send(`Course ${req.body.name} successfully saved`);
        })
        .catch(err =>{
            res.status(400).send(`Failed to save course ${req.body.name}\n${err}`);
        });
});

//given an array of course jsons, creates multiple new courses
courseRoutes.route('/addMany').post(function(req, res){
    Course.insertMany(req.body.courses)
        .then(courses => {
            res.status(200).send(`All courses successfully saved!\n${req.body.courses}`);
        })
        .catch(err => {
            res.status(400).send(`No courses saved, error encountered\n${err}`);
        });
});

//given an array of course jsons, creates multiple new courses
courseRoutes.route('/addMany').post(function(req, res){
    Course.insertMany(req.body.courses)
        .then(courses => {
            res.status(200).send(`All courses successfully saved!\n${req.body.courses}`);
        })
        .catch(err => {
            res.status(400).send(`No courses saved, error encountered\n${err}`);
        });
});

/* Read */
//given a course id, gets the course with all of its info
courseRoutes.route('/').get(function (req, res){
    Course.findOne({_id: req.body.id})
        .then(course => {
            res.status(200).json(course);
        })
        .catch(err => {
            res.status(400).send(`Failed to get course ${req.body.id}\n${err}`);
        });
});

//given a course id, gets just the list of secionts
courseRoutes.route('/sections').get(function (req, res){
    Course.findOne({_id: req.body.id})
        .then(course => {
            res.status(200).json(course.sections);
        })
        .catch(err => {
            res.status(400).send(`Failed to get course ${req.body.id}\n${err}`);
        });
});

//given a course id, gets just the list of secionts
courseRoutes.route('/sections').get(function (req, res){
    Course.findOne({_id: req.body.id})
        .then(course => {
            res.status(200).json(course.sections);
        })
        .catch(err => {
            res.status(400).send(`Failed to get section details of course 
                ${req.body.id}\n${err}`);
        });
});

//Gets an array of all of the courses but without their section details
courseRoutes.route('/overviews').get(function (req,res){
    Course.find({}).select("-sections")
        .then(courses => {
            res.status(200).json(courses);
        })
        .catch(err => {
            res.status(400).send(`Failed to get courses' overviews\n${err}`)
        });
});

/* Update */
//given a course id, updates the content of a course completely, replacing all fields
courseRoutes.route('/update').put(function (req, res){
    Course.updateOne(
        {_id: req.body.id},
        {
            name: req.body.name,
            department: req.body.department,
            number: req.body.number,
            description: req.body.description,
            prereqs: req.body.prereqs,
            units: req.body.units,
            sections: req.body.sections
        }
    );
});

/* Delete */
//given a course id, deletes that course
courseRoutes.route('/remove').delete(function (req, res){
    Course.deleteOne({_id: req.body.id})
    .then(course => {
        res.status(200).send(`Successfully deleted course ${req.body.id}`);
    })
    .catch(err => {
        res.status(400).send(`Failed to delete course ${req.body.id}\n${err}`)
    });
});