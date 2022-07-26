const express = require("express");

const userSchema = require("../models/userSchema");
const pageSchema = require("../models/pageSchema");
const userVerify = require("../helpers/userVerify");


const {hashGenerate} = require("../helpers/hashing");
const {hashValidator} = require("../helpers/hashing");
const {tokenGenerator} = require("../helpers/token");

// User signup http request 
exports.userRegister = async (req, res) => {
    try{
        const existingUser = await userSchema.userModel.findOne({email:req.body.email});
        if(existingUser){
            res.send(`Email address already exists!`);
        } else{
            const utcTimestamp = new Date().getTime();
            const hashPassword = await hashGenerate(req.body.password);
            userSchema.userCounterModel.findOneAndUpdate( { countername: "userCounter" }, { $inc: { seq: 1 } }, { new: true }, (err, cd) => {
                let seqId;
                if (cd == null) {
                    const newValue = new userSchema.userCounterModel({ countername: "userCounter", seq: 1 });
                    newValue.save();
                    seqId = 1;
                } else {
                    seqId = cd.seq;
                }
                const user = new userSchema.userModel({
                    uId:seqId,
                    firstName:req.body.firstname,
                    lastName:req.body.lastname,
                    email:req.body.email,
                    password:hashPassword,
                    role:"0",
                    statuses:"1", // statuses=0(blocked), statuses=1(active)
                    isPage:"0",
                    createDate:utcTimestamp,
                    updateDate:utcTimestamp
                });
                user.save();
                res.send(`User Create Successfull!`); // redirect to home page (/)
            });
        }
    } catch (error){
        res.send(`Something went wrong!` + error); // redirect to home page (/)
    }
};

// Admin register http request
// this is for super admin
exports.adminRegister = async (req, res) => {
    try{
        const existingUser = await userSchema.userModel.findOne({email:req.body.email});
        if(existingUser){
            res.send(`Email address already exists!`);
        } else{
            const utcTimestamp = new Date().getTime();
            const hashPassword = await hashGenerate(req.body.password);
            userSchema.userCounterModel.findOneAndUpdate( { countername: "userCounter" }, { $inc: { seq: 1 } }, { new: true }, (err, cd) => {
                let seqId;
                if (cd == null) {
                    const newValue = new userSchema.userCounterModel({ countername: "userCounter", seq: 1 });
                    newValue.save();
                    seqId = 1;
                } else {
                    seqId = cd.seq;
                }
                const user = new userSchema.userModel({
                    uId:seqId,
                    firstName:req.body.firstname,
                    lastName:req.body.lastname,
                    email:req.body.email,
                    password:hashPassword,
                    role:"1",
                    statuses:"1", // statuses=0(blocked), statuses=1(active)
                    isPage:"0",
                    createDate:utcTimestamp,
                    updateDate:utcTimestamp
                });
                user.save();
                res.send(`New admin Create Successfull!`); // redirect to admin portal (/admin)
            });
        }
    } catch (error){
        res.send(`Something went wrong!!` + error); // redirect to admin portal (/admin)
    }
};

// User, admin signin http request
exports.signin = async (req, res) => {
    try{
        const existingUser = await userSchema.userModel.findOne({email:req.body.email});
        if(!existingUser){
            res.send("Email is invalid!");
        }else{
            const checkUser = await hashValidator(req.body.password, existingUser.password);
            if(!checkUser){
                res.send("Password is invalid");
            } else {
                if(existingUser.statuses == 0){
                    res.send("Your Account is blocked! Contact us if you want to recover your account"); // redirect to home page (/)
                }else{
                    const userName = existingUser.firstName;
                    const token = await tokenGenerator(existingUser.email);
                    if(existingUser.role == 0){
                        res.cookie("jwt", token, {httpOnly:true});
                        res.send(userName + ` Login successful! Your Token is ` + token); // redirect to hire page (/hire)
                    }else {
                        res.cookie("jwt", token, {httpOnly:true});
                        res.send(userName + ` Login successful! You are a admin. Your Token is ` + token); // redirect to admin portal (/)
                    }
                }
            }
        }        
    } catch (error) {
        res.send(error);
    }
};

// logout http request
exports.logout = (req, res) => {
    res.clearCookie('jwt', {httpOnly: true});
    res.send('Logout Successfull!'); // redirect to home page (/)
    // res.redirect('/');
};

// check myPage Status http request
exports.myPage = async (req, res) => {
    try{
        const jwtToken = req.cookies.jwt;
        const userValid = await userVerify.userVerify(jwtToken);
        if (userValid.isPage == 1){
            res.send("You already have REON page!<br>" + userValid); // redirect to user page for owner page (/user/myPage)
        }else{
            res.send("You don't have REON page! Go to '/myPage/create' for create new Page"); // redirect to create page for owner page (/mypage/create)
            // res.redirect("/user/myPage/create");
        }
    }catch(error){
        res.send(error);
    }
};

// create myPage http request
exports.createMyPage = async(req, res) => {
    try{
        const utcTimestamp = new Date().getTime();
        const jwtToken = req.cookies.jwt;
        const userValid = await userVerify.userVerify(jwtToken);
        userSchema.userCounterModel.findOneAndUpdate( { countername: "pagecounter" }, { $inc: { seq: 1 } }, { new: true }, (err, cd) => {
            let seqId;
            if (cd == null) {
                const newValue = new userSchema.userCounterModel({ countername: "pagecounter", seq: 1 });
                newValue.save();
                seqId = 1;
            } else {
                seqId = cd.seq;
            }
            const page = new pageSchema.pageModel({
                pId:seqId,
                uId:userValid.uId,
                pageName:req.body.pageName,
                phone:req.body.phone,
                link:"new Link 4",
                statuses:"0",
                statusComment:"User Create",
                createDate:utcTimestamp,
                updateDate:utcTimestamp
            });
            
                page.save();
                userSchema.userModel.findOneAndUpdate({uId: userValid.uId}, {$set:{"isPage":"1", "updateDate":utcTimestamp}}, {new: true}, (err, doc) => {
                    res.send(`Your page create successfull! Please wait for admin approval`); // redirect to hire page (/hire)
                    // res.send('This is !');
                })
        })
    }catch(error){
        res.send(error);
    }
};