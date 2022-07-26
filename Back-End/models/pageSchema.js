const mongoose = require("mongoose");

//schema for page
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