
const speakeasy = require('speakeasy');
const User = require('../../models/user');
const {hashPassword,passwordCompare} = require("../../utils/bcrypt");
const userPassword = require('../../models/userpassword');
const  transporter = require('../../utils/sendMail');
const { constants } = require('../../config/app.config');

exports.registerUser = async (userData)=>{
    const user = await User.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        adress: userData.adress,
        phone: userData.phone,
        imageUrl: userData.imageUrl,
    });
    const hash = hashPassword(userData.password)
    const password = await userPassword.create({
        password: hash,
        createdBy: userData.createdBy,
        userId: user.id,
    });

    return {
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        imageUrl: user.imageUrl,
    }
}
exports.loginUser = async (userData) => {
    try {
        const user = await User.findOne({
            where: { email: userData.email },
            include: [{
                model: userPassword,
                attributes: ['password', 'createdBy']
            }]
        });
        if (!user || !user.user_password) {
            throw new Error('User not found');
        }

        const isPasswordValid = await passwordCompare(userData.password, user.user_password.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');

        }
        const otp = speakeasy.totp({
            secret: user.email, 
            encoding: 'base32',
            step : constants.otp.expiry
        });
        // const token = await generateToken(user.email)
        await this.sendOtpToMail(user.email,otp,user.firstName)
        return {
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,

        };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.verifyOtp = async(email, otp) => {
    try {
        const verified = speakeasy.totp.verify({
            secret : email,
            encoding : 'base32',
            token : otp,
            step : constants.otp.expiry
        });

        if (verified) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


exports.sendOtpToMail = async(email,otp,user) =>{
  const options  ={
    from:"admin@test.com",
    to:email,
    subject:" Your One-Time Password (OTP) for Login",
    html: `<p>Hi, ${user}! </p>
    <p>We have received a request for login to your account. To proceed, please use the following One-Time Password (OTP).</p>
    <br>OTP:${otp}.
    <p> Please enter this OTP within the next 5 minutes to complete your login. If you did not initiate this request, please contact our support team immediately at support@pharmacy.com</p>
    <br>Thank you for choosing !`,
  }
  await transporter.sendMail(options)
      
}


