const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({success:false,message:"Oturum açmalısınız"}); 
  }

  jwt.verify(token, "humanResourcesJwtToken", (err, user) => {
    if (err) {
      return res.status(403).json({success:false,message:err.message});
    }
    req.user = user; 
    next(); 
  });
};

const isRole = (role) => {
  return (req,res,next) => {
    if(req.user.role !== role){
      return res.status(403).json({success:false,message:"Bu işlem için yetkili değilsiniz"})
    }
    next();
  }
}

module.exports = {isAuth,isRole};
