const express = require("express");
const routes = express.Router();
const mongoose = require('mongoose');
const Driver = require("../models/Driver");



//register driver
routes.post('/register_driver',(req,res)=>{

    let x1Cord = req.body.x1; 
    let x2Cord = req.body.x2; 
    let y1Cord = req.body.y1; 
    let y2Cord = req.body.y2;
    let xCordinateDifference = Math.pow(x2Cord,2) - Math.pow(x1Cord,2);
    let yCordinateDifference = Math.pow(y2Cord,2) - Math.pow(y1Cord,2);
    let location = Math.sqrt(xCordinateDifference + yCordinateDifference);

    const driver = new Driver({
        _id   :new  mongoose.Types.ObjectId,
        availability  : req.body.availability,
        endTrip : false,
        havingPassenger : false,
        location : location
    });
    driver.save().then(
       result => res.status(200).json(result)
    ).catch(
        error => res.status(500).json(error)
    );
});

routes.post('/makeUnavailable/:driverId',(req,res)=>{

    let driverId = req.params.driverId;
    
    let updateObj = {
        availability  : false,
        endTrip : false,
        havingPassenger :false
    }
    Driver.updateOne({_id:driverId},{$set:updateObj}).exec().then(
        result => res.status(200).json(result)
    ).catch(
        error => res.status(roo).json(error)
    );

})


routes.post('/makeAvailable/:driverId',(req,res)=>{

    let driverId = req.params.driverId;
    let x1Cord = req.body.x1; 
    let x2Cord = req.body.x2; 
    let y1Cord = req.body.y1; 
    let y2Cord = req.body.y2;
    let xCordinateDifference = Math.pow(x2Cord,2) - Math.pow(x1Cord,2);
    let yCordinateDifference = Math.pow(y2Cord,2) - Math.pow(y1Cord,2);
    let location = Math.sqrt(xCordinateDifference + yCordinateDifference);
    
    let updateObj = {
        availability  : false,
        endTrip : false,
        havingPassenger :false,
        location:location

    }
    Driver.updateOne({_id:driverId},{$set:updateObj}).exec().then(
        result => res.status(200).json(result)
    ).catch(
        error => res.status(roo).json(error)
    );
})


module.exports = routes;