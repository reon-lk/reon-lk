const mongoose = require("mongoose");

//schema for counter
const userCounterSchema = {
    countername: {
      type: String,
    },
    seq: {
      type: Number,
    },
};

// User Schema
const userSchema = {
    uId: Number,
    firstName:{
        type:'string',
        required:true,
        min:4,
        max:255
    },
    lastName:{
        type:'string',
        required:true,
        min:4,
        max:255
    },
    email:{
        type:'string',
        required:true,
        unique:true
    },
    password:{
        type:'string',
        required:true
    },
    role:{
        type:'string',
        required:true
    },
    statuses:{
        type:'string',
        required:true
    },
    isPage:{
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
};


// const adminSchema = {
//     username:{
//         type:'string',
//         required:true,
//         min:4,
//         max:255
//     },
//     email:{
//         type:'string',
//         required:true,
//         unique:true
//     },
//     password:{
//         type:'string',
//         required:true
//     },
//     role:{
//         type:'string',
//         required:true
//     },
//     statuses:{
//         type:'string',
//         required:true
//     }
// };


module.exports.userCounterModel = mongoose.model("counter", userCounterSchema);
module.exports.userModel = mongoose.model("User", userSchema);