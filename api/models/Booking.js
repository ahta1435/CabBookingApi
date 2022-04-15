const mongoose = require('mongoose');

const createBooking = mongoose.Schema({
    _id   : mongoose.Schema.Types.ObjectId,
    riderId : {type:String,required:true},
    driverId : { type : String, required:true},
    endLocation : {type:Number,required:true},
    isjourneyEnded : {type:Boolean,required:true}
});

module.exports = mongoose.model("CreateBooking",createBooking);