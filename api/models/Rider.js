const mongoose = require('mongoose');

const RiderSchema = mongoose.Schema({
    _id   : mongoose.Schema.Types.ObjectId,
    isCurrentlyRiding : {type:Boolean,required:true},
    location : { type : Number, required:true}
});

module.exports = mongoose.model("Rider",RiderSchema);