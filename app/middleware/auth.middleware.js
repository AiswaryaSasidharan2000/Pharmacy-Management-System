const jwt = require('jsonwebtoken');
const {errorResponse} = require('../utils/commonFunctions');
const { constants } = require('../config/app.config');

exports.generateToken = async (payload)=>{
    var token= jwt.sign({ email:payload }, constants.jwt.secret,{ expiresIn: '1h' });
      return token;
}
exports.verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
  
      try {
        const decoded = jwt.verify(req.token, constants.jwt.secret);
        req.user = decoded;
        next();
      } catch (err) {
        return errorResponse(res,"You don't have permission to access /securedpage.php on this server",err)
      }
    } else {
        return errorResponse(res,"You don't have permission to access /securedpage.php on this server")

    }
  };