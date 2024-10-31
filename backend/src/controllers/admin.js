const bcrypt = require("bcrypt");
const Users = require("../models/users");
const Roles = require("../models/roles");
const generate_password = require("generate-password");
const {sendNewMail} = require("../helpers/nodemailer");

const {validationResult} = require("express-validator"); //validtor
const validation = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
}

exports.post_new_user = async (req,res) => {
    const {name,surname,email,password} = req.body;

    try {

        //validasyon kontrolü
        const validationError = validation(req,res)
        if(validationError){
        return validationError
        }
    
    
        const existingUsers = await Users.findOne({ where: { email } });
        if (existingUsers) {
        return res.status(400).json({ status: 400, message: "Bu e-posta adresi zaten kayıtlı" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        let roleId;
        
        const userRole = await Roles.findOne({ where: { name: "3. Parti Firma Kullanıcısı" } }); 
        if (userRole) {
        roleId = userRole.id; 
        } else {
        return res.status(500).json({ message: "Kullanıcı rolü bulunamadı" });
        }
        
        const user = await Users.create({
        name,
        surname,
        email,
        password: hashedPassword,
        roleId,
        });
    
        const subject = "Yeni Kullanıcı Kaydı";
        const text = 
        `
            <div>
                <h1>Kullanıcı kaydı başarılı aşağıdaki bilgiler ile giriş yapabilirsiniz</h1>
            </div>
            <div>
                Email: <b>${user.email}</b>
            </div>
            <div>
                Şifre: <b>${password}</b>
            </div>
        `;
        await sendNewMail(user.email, subject, text); 
        res.status(201).json({
        success: true,
        data: user,
        message: "Kayıt başarılı, yeni kullanıcıya e-posta gönderildi.",
        });
    

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}