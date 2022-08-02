const mongoose = require("mongoose");
// //schema for vehicle

const vehicleSchema = mongoose.Schema({
    vId:Number,
    pId:{
        type:Number,
        
    },
    category:{
        type:'string',
        required:true,
    },
    vehicleType:{
        type:'string',
        required:true,
    },
    seats:{
        type:'string',
        required:false
    },
    location:{
        type:'string',
        required:true,
    },
    vehicleName:{
        type:'string',
        required:true,
        
    },
    
   
    statuses:{
        type:'string',
        required:true
    },
    statusComment:{
        type:'string',
        required:true
    },
    createDate:{
        type:'string',
        required:true
    },
    updateDate:{
        type:'string',
        required:true
    }
});
//schema for page

// const Vehicle = require("../models/vehicleSchema")
const pageSchema = {
    pId:Number,
    uId:{
        type:Number,
        unique:true
    },
    pageName:{
        type:'string',
        required:true,
        min:4,
        max:255
    },
    phone:{
        type:'string',
        required:true,
        unique:true
    },
    vehicles:{
        type:[vehicleSchema] 
    },
    link:{
        type:"string",
        required:true,
        min:4,
        max:255,
        unique:true
    },
    statuses:{
        type:'string',
        required:true
    },
    statusComment:{
        type:'string',
        required:true
    },
    createDate:{
        type:'string',
        required:true
    },
    updateDate:{
        type:'string',
        required:true
    }
}






module.exports.pageModel = mongoose.model("Page", pageSchema);

module.exports.vehicleModel = mongoose.model("Vehicle", vehicleSchema);