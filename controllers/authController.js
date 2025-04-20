const userModel = require('../models/userModel');
const {hashPassword, comparePassword } = require('../helper/authHelper');
const JWT = require('jsonwebtoken');

const registerController = async (req, res) => {
    try{
        const {name , email , password , phone , address, answer} = req.body;
        //validations
        if(!name){
            return res.send({message:'Name is required'})
        }
        if(!email){
            return res.send({message:'Email is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
        }
        if(!phone){
            return res.send({message:'Phone is required'})
        }
        if(!address){
            return res.send({message:'Address is required'})
        }
        if(!answer){
            return res.send({message:'Answer is required'})
        }

        // check user
        const existingUser = await userModel.findOne({email})  // find one document that matches
        // existing user
        if(existingUser){
            return res.status(200).send({
            success: false,
            message: "Email is already registered, Please login"
            })
        }
        //register user
        const hashedPassword = await hashPassword(password) 
        // save
        const newUser = await new userModel({
            name,
            email,
            password:hashedPassword ,
            phone,
            address,
            answer
        }).save();
        // const savedUser = await newUser.save()
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            newUser,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        })
    }
}

// post login
const loginController = async (req,res) =>{
    try{
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid Email or password"
            });
        }
        // check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }
        // email is checked now check password (check if it matches with database or not)
        const match = await comparePassword(password,user.password);  // check password here password is from local and user.password from database
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }
        // token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        })
    } 
}
// forgetPassword Controller
const forgetPasswordController = async (req,res) =>{
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
          res.status(400).send({ message: "Email is required" });
        }
        if (!answer) {
          res.status(400).send({ message: "Answer is required" });
        }
        if (!newPassword) {
          res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Wrong Email Or Answer",
          });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
          success: true,
          message: "Password Reset Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Something went wrong",
          error,
        });
      }
};
// test controller
const testController = async (req, res) => {
    try{
        res.send("Welcome");
    }
    catch(error){
        console.log(error);
        res.send({error})
    }
}

//update profile
const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error While Update profile",
        error,
      });
    }
  };
  
  //orders
  // const getOrdersController = async (req, res) => {
  //   try {
  //     const orders = await orderModel
  //       .find({ buyer: req.user._id })
  //       .populate("products", "-photo")
  //       .populate("buyer", "name");
  //     res.json(orders);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       success: false,
  //       message: "Error While Geting Orders",
  //       error,
  //     });
  //   }
  // };

//orders
  // const getAllOrdersController = async (req, res) => {
  //   try {
  //     const orders = await orderModel
  //       .find({})
  //       .populate("products", "-photo")
  //       .populate("buyer", "name")
  //       .sort({ createdAt: "-1" });
  //     res.json(orders);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       success: false,
  //       message: "Error WHile Geting Orders",
  //       error,
  //     });
  //   }
  // };
  
  //order status
// const orderStatusController = async (req, res) => {
//     try {
//       const { orderId } = req.params;
//       const { status } = req.body;
//       const orders = await orderModel.findByIdAndUpdate(
//         orderId,
//         { status },
//         { new: true }
//       );
//       res.json(orders);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Error While Updateing Order",
//         error,
//       });
//     }
//   };

// module.exports = {registerController , loginController , testController , forgetPasswordController ,updateProfileController ,getOrdersController ,getAllOrdersController,orderStatusController};
module.exports = {registerController , loginController , testController , forgetPasswordController , updateProfileController};