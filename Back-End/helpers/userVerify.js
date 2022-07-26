// const nodeBase64 = require('nodejs-base64-converter');

const {tokenValidator} = require("./token");
const userSchema = require("../models/userSchema");

const userVerify = async (jwtToken, next) => {
    const valid = await tokenValidator(jwtToken);
    if(!valid){
        return("Access Denied!");
    }else{
        const existingUser = await userSchema.userModel.findOne({email:valid.email});
        if (existingUser.role == 1){
            return("You are an admin!!"); // redirect to admin portal (/admin)
        }else{
            return(existingUser)
            next();
        }
    }
};

const checkPage = async (jwtToken) => {
    const existingUser = await this.userVerify(jwtToken);

    if (existingUser.isPage == 1){
        return("You already have REON page!"); // redirect to user page for owner page (/user/myPage)
        // next();
    }else{
        // return("You don't have REON page! Go to '/myPage/create' for create new Page"); // redirect to create page for owner page (/mypage/create)
        next();
    }
    // return(userVerify);
    // const base64Url = userVerify.split('.')[1];
    // const decoded = nodeBase64.decode(base64Url);
    // const email = decoded.split('"')[3];

    // const existingUser = await User.userModel.findOne({email:email});

    // next(existingUser);
}



module.exports.userVerify = userVerify;
module.exports.checkPage = checkPage;

