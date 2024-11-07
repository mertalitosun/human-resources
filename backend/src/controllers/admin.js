const bcrypt = require("bcrypt");
const Users = require("../models/users");
const Roles = require("../models/roles");
const generate_password = require("generate-password");

const {sendNewMail} = require("../helpers/nodemailer");
const validation = require("../middlewares/validation");



exports.get_roles = async (req,res) => {

    try{
        const roles = await Roles.findAll();

        return res.status(200).json({success:true,roles})
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Sunucu Hatası",serverMsg:err.message});
    }
}

exports.put_users = async (req, res) => {
    const authId = req.user.id; 
    const { userId } = req.params;
    const { name, surname, email, roleId } = req.body;

    try {

        const user = await Users.findByPk(userId, { include: Roles });

        
        if (!user) {
            return res.status(404).json({ success: false, message: "Kullanıcı bulunamadı!" });
        }

        if(req.user.role === "Admin"){
            user.name = name || user.name; 
            user.surname = surname || user.surname; 
            user.email = email || user.email; 
            user.roleId = roleId || user.roleId;
    
    
            await user.save(); 
    
            res.status(200).json({ success: true, message: "Kullanıcı başarıyla güncellendi.", data: user });
        }else{
            if(authId != userId){
                return res.status(403).json({success:false,message:"Bu kullanıcıyı güncelleme yetkiniz yok!"});
            }
            user.name = name || user.name; 
            user.surname = surname || user.surname; 
            user.email = email || user.email; 

            await user.save(); 
            return res.status(200).json({ success: true, message: "Kullanıcı bilgileri başarıyla güncellendi.", data: user });
        }
       
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Sunucu Hatası", serverMsg: err.message });
    }
}

exports.get_users_details = async (req,res) => {
    const authId = req.user.id;
    const {userId} = req.params;
    try{

        const user = await Users.findOne({where:{id:userId},include:Roles});
        if(req.user.role === "Admin"){
            return res.status(200).json({success:true,user,message:"Kullanıcı getirildi."});
        }else{
            if(userId == authId ){
                return res.status(200).json({success:true,user,message:"Kullanıcı getirildi."})
            }else{
                return res.status(403).json({success:false,message:"Bu işlem için yetkili değilsiniz!"})
            }
        }
        
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Sunucu Hatası",serverMsg:err.message})
    }
}
exports.get_users = async (req,res) => {

    try{
        const users = await Users.findAll({include:Roles});

        return res.status(200).json({success:true,users,message:"Kullanıcılar Listesi"})
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Sunucu Hatası",serverMsg:err.message})
    }
}

exports.post_users = async (req,res) => {
    const {name,surname,email,roleId} = req.body;

    try {
        const password = generate_password.generate({length:10,numbers:true})
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

exports.delete_users = async (req,res) => {
    const {userId} = req.params;

    try{
        const user = await Users.findByPk(userId,{include:{model:Roles}});

        if(!user){
            return res.status(404).json({success:false,message:"Kullanıcı bulunamadı!"});
        }

        if(user.role.name === "Admin"){
            return res.status(403).json({success:false,message:"Admin rolüne sahip kullanıcılar silinemez"});
        }

        await user.destroy();
        res.status(200).json({success:true,message:"Kullanıcı başarıyla silindi"});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Sunucu Hatası",serverMsg:err.message});
    }
}