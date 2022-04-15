const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/',{
    dbName: 'apiDesign',
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

const riderRoutes = require('./api/routes/RiderRoutes');
const bookingRoutes = require('./api/routes/BookingRoutes');
const driverRoutes = require('./api/routes/DriverRoutes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


app.use('/rider',riderRoutes);
app.use('/booking',bookingRoutes);
app.use('/driver',driverRoutes);


app.use((req,res,next)=>{
    
    const error = new Error("Not found");
    error.status = 404;
    next(error);   //passing this to next middleware which
                  // handles all kind of errors
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message : error.message
        }
    })
});



module.exports = app;
