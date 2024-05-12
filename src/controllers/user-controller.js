const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(500).json({
            success: true,
            message: "Successfully created a User",
            data: response,
            error: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer");
        return res.status(201).json({
            success: false,
            message: "Something went wrong",
            data: {},
            error: error
        });
    }
}


const signin = async(req,res) =>{
    try {
        const response = await userService.signin(req.body.email, req.body.password);
        return res.status(500).json({
            success: true,
            message: "Successfully signed in",
            data: response,
            error: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer");
        return res.status(201).json({
            success: false,
            message: "Something went wrong",
            data: {},
            error: error
        });
    }
}

const isAuthenticated = async(req,res) =>{
    try {
        const token = req.headers["x-access-token"];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            message: "User is Authenticated and token is valid",
            data: response,
            error: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer");
        return res.status(201).json({
            success: false,
            message: "Something went wrong",
            data: {},
            error: error
        });
    }
}

module.exports = {
    create,
    signin,
    isAuthenticated,
};