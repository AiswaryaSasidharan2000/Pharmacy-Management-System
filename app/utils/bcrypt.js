const bcrypt = require('bcryptjs');

exports.hashPassword = (password)=>{
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
     return bcrypt.hashSync(password, salt);
}; 

exports.passwordCompare = (password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword)
};