const { sucessResponse, errorResponse } = require('../../utils/commonFunctions');
const userService = require('../user/user.service');


   exports.userRegister = async (req, res) => {
    try {

        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            imageUrl: req.body.imageUrl,
            password: req.body.password,
            createdBy: req.body.createdBy,
            userId: req.body.userId,
        };
        const user = await userService.registerUser(userData);

        sucessResponse(res, "Registered successfully", user
        );

    } catch (error) {
        errorResponse(res, "Something Went Wrong", error)
    }
};
exports.userLogin = async(req,res)=>{
    try {
        const userData ={
            email :req.body.email,
            password:req.body.password,
        }
        const user = await userService.loginUser(userData);
    res.cookie("cookie",user.token,{   
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    })
        sucessResponse(res,"Otp Sent Successfully",user)
    } catch (error) {
        console.log(error);
        errorResponse(res, "Something Went Wrong", error)
    }
    
};

exports.verifyLoginOtp = async(req,res) => {
    try {
        const { email, otp } = req.body;

        const isVerify = await userService.verifyOtp(email, otp);
        if(isVerify) {
            sucessResponse(res, 'Otp Verification Successful')
        } else {
            errorResponse(res, 'Oops, Check your Otp again');
        }  
    } catch (error) {
        console.log(error);
        errorResponse(res, "Something Went Wrong", error)
    }
}

exports.userLogout = async(req,res)=>{
    
    try {
        res.cookie("cookie","",{maxAge:0});
        sucessResponse(res,"Logout Successfully")
    } catch (error) {
        errorResponse(res, "Something Went Wrong", error)
    }
}
