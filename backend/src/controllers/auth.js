const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const Roles = require("../models/roles");

exports.post_register = async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    const existingUsers = await Users.findOne({ where: { email } });

    if (existingUsers) {
      return res.status(400).json({ status: 400, message: "Bu e-posta adresi zaten kayıtlı" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const allUsers = await Users.findAll();
    let roleId;

    if (allUsers.length === 0) {
      const adminRole = await Roles.findOne({ where: { name: "Admin" } });
      if (adminRole) {
        roleId = adminRole.id; 
      } else {
        return res.status(500).json({ message: "Admin rolü bulunamadı" });
      }
    } else {
      const userRole = await Roles.findOne({ where: { name: "3. Parti Firma Kullanıcısı" } }); 
      if (userRole) {
        roleId = userRole.id; 
      } else {
        return res.status(500).json({ message: "Kullanıcı rolü bulunamadı" });
      }
    }
    
    const user = await Users.create({
      name,
      surname,
      email,
      password: hashedPassword,
      roleId,
    });

    res.status(201).json({
      success: true,
      data: user,
      message: "Kayıt Başarılı",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.post_login = async (req,res) => {
  const {email,password} = req.body;

  const user = await Users.findOne({where:{email}});

  if(!user){
    return res.status(401).json({
      success:false,
      message:"Girilen e-posta adresine kayıtlı kullanıcı bulunamadı"
    })
  }

  const match = await bcrypt.compare(password,user.password);

  if(!match){
    return res.status(401).json({
      success:false,
      message:"Hatalı Parola!"
    })
  }

  const token = jwt.sign({id:user.id},"humanResourcesJwtToken",{expiresIn:"1h"});
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 })
  res.status(200).json({
    success:true,
    message:"Giriş Başarılı",
  })
};

exports.get_logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
      success:true,
      message:"Çıkış Başarılı",
  })
};