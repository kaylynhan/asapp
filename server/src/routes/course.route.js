import Course from "../models/course.model.js"
import express from 'express';
const courseRoutes = express.Router();


/* Read */

//give an array of course ids in params, gets an array of those courses
courseRoutes.route('/getMany').get(function (req, res){
    Course.find({
        '_id': { $in: req.query.ids}
    })
        .then(courses => {
            res.status(200).json(courses);
        })
        .catch(err => {
            res.status(400).send(`Failed to get courses of given ${len(req.query.ids)} IDs
            \n${err}`);
        });

})

//Gets an array of all of the courses but without their section details
courseRoutes.route('/allOverviews').get(function (req,res){
    Course.find({}).select("-sections")
        .then(courses =>{
            res.status(200).json(courses); 
        })
        .catch(err => {
            res.status(400).send(`Failed to get courses' overviews\n${err}`)
        });
});

export default courseRoutes;
