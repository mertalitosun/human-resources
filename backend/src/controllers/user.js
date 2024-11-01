const Documents = require("../models/documents");
const Users = require("../models/users");
const Workers = require("../models/workers");

const validation = require("../middlewares/validation");



exports.put_workers = async (req, res) => {
    const userId = req.user.id;
    const { workerId } = req.params;
    const { name, surname,email, identity_no } = req.body;

    try {
        const worker = await Workers.findOne({where:{id:workerId, addedById:userId},include:{model:Users,as:"AddedBy"}});

        if (!worker) {
            return res.status(404).json({ success: false, message: "İşçi bulunamadı!" });
        }


        worker.name = name || worker.name; 
        worker.surname = surname || worker.surname; 
        worker.identity_no = identity_no || worker.identity_no; 
        worker.email = email || worker.email; 

       

        await worker.save();

        res.status(200).json({ success: true, message: "İşçi başarıyla güncellendi.", data: worker });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Sunucu Hatası", serverMsg: err.message });
    }
}

exports.delete_workers = async (req,res) => {
    const userId = req.user.id
    const {workerId} = req.params;
    try{
        const worker = await Workers.findOne({where:{id:workerId, addedById:userId}});

        if(!worker){
            return res.status(404).json({success:false,message:"İşçi bulunamadı!"})
        }
        
        await worker.destroy();
        res.status(200).json({success:true,message:"İşçi başarıyla silindi"});
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Sunucu Hatası",serverMsg:err.message})
    }
}

exports.post_workers = async (req,res) => {
    const userId = req.user.id
    const {name,surname,email,identity_no} = req.body;

    try {

        //validasyon kontrolü
        const validationError = validation(req,res)
        if(validationError){
        return validationError
        }
    
    
        const existingWorkers = await Workers.findOne({ where: { identity_no,email } });
        if (existingWorkers) {
        return res.status(400).json({ status: 400, message: "Bu işçi zaten kayıtlı" });
        }
    
        
        const worker = await Workers.create({
        name,
        surname,
        email,
        identity_no,
        addedById:userId
        });
    
        res.status(201).json({
        success: true,
        data: worker,
        message: "Kayıt başarılı!",
        });
    

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

exports.get_workers = async (req,res) => {
    const userId = req.user.id
    try{
        const workers = await Workers.findAll({where:{addedById:userId}});

        return res.status(200).json({success:true,workers,message:"İşçiler Listesi"})
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Sunucu Hatası",serverMsg:err.message})
    }
}