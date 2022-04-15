const express = require("express");
const routes = express.Router();
const mongoose = require('mongoose');
const Rider = require('../models/Rider');
const Driver = require('../models/Driver');



//get the cabs for current User
routes.get('/getCabs/:riderId',(req,res)=>{
    let id = req.params.riderId;  
   
    Rider.findOne({_id:id,isCurrentlyRiding:{$ne:true}}).exec().then((doc)=>{
        let distance = doc.location ;
        Driver.find({location:{$lte:distance},havingPassenger:{$ne:true}}).exec().then((doc)=>{
            if(doc.length>0){
                res.status(200).json(doc);
            }else{
                res.status(404).json(err);
            }
        })
      
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
});

//route to register rider
routes.post('/register_rider',(req,res)=>{
    
    let x1Cord = Number(req.body.x1); 
    let x2Cord = Number(req.body.x2); 
    let y1Cord = Number(req.body.y1); 
    let y2Cord = Number(req.body.y2);
    let xCordinateDifference = Math.pow(x2Cord,2) - Math.pow(x1Cord,2);
    let yCordinateDifference = Math.pow(y2Cord,2) - Math.pow(y1Cord,2);
    let location = Math.sqrt(xCordinateDifference + yCordinateDifference);

    const rider = new Rider({
        _id   : new mongoose.Types.ObjectId,
        isCurrentlyRiding : Boolean(req.body.isCurrentlyRiding),
        location : location
    });
    rider.save().then(
       result => res.status(200).json(result)
    ).catch(error=>console.log(error));
})

module.exports = routes;