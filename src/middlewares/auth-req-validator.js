const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            data: {},
            error: "Email or password missing in request"
        });
    }
    next();
}

module.exports ={
    validateUserAuth,
}