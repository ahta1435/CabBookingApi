const express = require("express");
const routes = express.Router();
const mongoose = require('mongoose');
const Rider = require('../models/Rider');
const Driver = require('../models/Driver');
const CreateBooking = require('../models/Booking');
const Booking = require("../models/Booking");


//starting journey 
routes.post('/journeyStart/:riderId/:DriverId',(req,res)=>{

    let riderId = req.params.riderId;
    let driverId = req.params.DriverId

    let x1Cord = req.body.x1; 
    let x2Cord = req.body.x2; 
    let y1Cord = req.body.y1; 
    let y2Cord = req.body.y2;
    let xCordinateDifference = Math.pow(x2Cord,2) - Math.pow(x1Cord,2);
    let yCordinateDifference = Math.pow(y2Cord,2) - Math.pow(y1Cord,2);
    let location = Math.sqrt(xCordinateDifference + yCordinateDifference);

    

    const createBooking = new CreateBooking({
        _id : new mongoose.Types.ObjectId,
        riderId :riderId,
        driverId : driverId,
        endLocation : location,
        isjourneyEnded : false
    });

    createBooking.save().then().catch()

    Rider.findOne({_id:riderId}).exec().then((doc)=>{
        let location = doc.location;
        //marking the rider location same as the Driver location
        let updateObjForDriver = {
            availability  : false,
            endTrip : false,
            havingPassenger : true,
            location : location
        }
        Driver.updateOne({_id:driverId},{$set:updateObjForDriver}).exec().then(
            result => res.status(200).json(result)
        ).catch( err=>res.status(500).json(err));

    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })

    Rider.updateOne({_id:riderId},{$set:{isCurrentlyRiding: true}}).exec().then().catch();

})


//marking the journey as End and making the cab and rider's location same
routes.post('/journeyEnd/:journeyId', async (req,res)=>{

    let journeyId = req.params.journeyId;

    CreateBooking.findOne({_id:journeyId}).exec().then((doc)=>{
        let location = doc.endLocation;
        let driverId = doc.driverId;
        let riderId = doc.riderId;

        //marking the rider location same as the Driver location
        let updateObjForDriver = {
            availability  : true,
            havingPassenger : false,
            location : location
        }
        Driver.updateOne({_id:driverId},{$set:updateObjForDriver}).exec().then().catch();
        Rider.updateOne({_id:riderId},{$set:{location:location,isCurrentlyRiding:false}}).exec().then().catch();

    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });

    CreateBooking.updateOne({_id:journeyId},{$set:{isjourneyEnded: true}}).exec()
    .then(    
        result => res.status(200).json(result)
    ).catch(
        error => res.status(500).json(error)
    )
})


module.exports = routes;