const UserModel = require('../../model/user')

// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const signup = new UserModel({
        email: req.body.email,
        password: req.body.password
    });
    
    await signup.save().then(data => {
        res.send({
            message:"User created successfully!!",
            signup:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.email);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};