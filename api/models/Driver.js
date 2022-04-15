const mongoose = require('mongoose');

const DriverSchema = mongoose.Schema({
    _id   : mongoose.Schema.Types.ObjectId,
    availability  : { type : Boolean , required : true},
    endTrip : { type : Boolean , required : true},
    havingPassenger : {type : Boolean , required:true},
    location : { type : Number, required:true}
});

module.exports = mongoose.model("Driver",DriverSchema);