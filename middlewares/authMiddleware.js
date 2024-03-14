// this file is only to check the given person is user or admin

const JWT = require('jsonwebtoken')
const userModel = require('../models/userModel');

//Protected Routes token base
const requireSignIn = async (req, res, next) => {
    try {
      const decode = JWT.verify(    // JWT has a verify function to verify
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };
// middleware is basically to provide security until we use next func it will display the same page
// here for security we are using JWT token 

// admin access
const isAdmin = async (req, res, next) => {
    try{
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "UnAuthorized access"
            });
        }
        else{
            next();
        }
    }
    catch(error){
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
          });
    }
}

module.exports = {requireSignIn , isAdmin};