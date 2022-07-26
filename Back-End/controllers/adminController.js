const express = require("express");

const userSchema = require("../models/userSchema");
const pageSchema = require("../models/pageSchema");
const userVerify = require("../helpers/userVerify");

const {tokenGenerator} = require("../helpers/token");

// admin aproval for myPage http request 
exports.userPage = async (req, res) => {
    try{
        const jwtToken = req.cookies.jwt;
        const adminValid = await userVerify.adminVerify(jwtToken);

        const userPage = await pageSchema.pageModel.findOne({uId:userValid.uId})

        const utcTimestamp = new Date().getTime();
        pageSchema.pageModel.findOneAndUpdate({pId: userPage.uId}, {$set:{"statuses":"1", "statusComment":"Admin approved!" + adminValid.uId, "updateDate":utcTimestamp}}, {new: true}, (err, doc) => {
            res.send(`Admin Approved Successfull!!`); // redirect to hire page (/hire)
            // res.send('This is !');
        })
    } catch (error){
        res.send(`Something went wrong!` + error); // redirect to home page (/)
    }
}