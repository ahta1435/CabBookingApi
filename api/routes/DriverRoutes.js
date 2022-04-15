const express = require("express");
const routes = express.Router();
const mongoose = require('mongoose');
const Driver = require("../models/Driver");



//register driver
routes.post('/register_driver',(req,res)=>{

    console.log(req.body);

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
        result =>{
            message : "Driver has been Created"
        }
    ).catch(error=>console.log(error));
});

routes.post('/makeUnavailable/:driverId',(req,res)=>{

    let driverId = req.params.driverId;
    
    let updateObj = {
        availability  : false,
        endTrip : false,
        havingPassenger :false
    }
    Driver.updateOne({_id:driverId},{$set:updateObj}).exec().then().catch();

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
    Driver.updateOne({_id:driverId},{$set:updateObj}).exec().then().catch();

})


module.exports = routes;