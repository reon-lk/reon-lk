const jwt = require("jsonwebtoken");

const tokenGenerator = (email) => {
    const token = jwt.sign({email}, process.env.JWT_KEY, {expiresIn:"3hours"})
    return token;
}

const tokenValidator = (jwtToken) => {
    try{
        const data = jwt.verify(jwtToken, process.env.JWT_KEY);
        return data;
    } catch (error) {
        return false;
    }
}

module.exports.tokenGenerator = tokenGenerator;
module.exports.tokenValidator = tokenValidator;