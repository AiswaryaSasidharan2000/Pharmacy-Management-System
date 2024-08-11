exports.constants = {
    email : {
        user : process.env.EMAIL_USERNAME,
        pass : process.env.EMAIL_PASSWORD
    },
    otp : {
        expiry : process.env.OTP_EXPIRATION_TIME || 300
    },
    jwt : {
        secret : process.env.JWT_SECRET || 'secret'
    }
}