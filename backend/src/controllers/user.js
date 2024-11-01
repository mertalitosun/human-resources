const Documents = require("../models/documents");
const Users = require("../models/users");
const Workers = require("../models/workers");
const Sequelize = require("sequelize")
const validation = require("../middlewares/validation");



exports.post_documents = async (req,res) => {
    const authId = req.user.id; 
    const documents = req.files
    const {workerId} = req.body;
    let documentRecords = []; 
    try {

        if (documents && documents.length > 0) {
            documentRecords = documents.map((document) => ({
                name: document.filename,
                type: document.fieldname,
                path: document.path,
                uploadedById: authId,
                workerId,
            }));

            const createdDocuments = await Documents.bulkCreate(documentRecords);

            return res.status(201).json({success: true,message: "Belgeler başarıyla yüklendi.",data: createdDocuments});
        } else {
            return res.status(400).json({success: false,message: "Yüklenmiş belge bulunamadı."});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Sunucu Hatası", serverMsg: err.message });
    }
}

exports.get_documents = async (req, res) => {
    const {workerId} = req.params;
    try {
        const documents = await Documents.findAll({
            where: { workerId }, 
            include: [
                {
                    model: Workers,
                },
                {
                    model: Users,
                    as: "UploadedBy",
                },
                {
                    model: Users,
                    as: "ApprovedBy",
                }
            ]
        });
        return res.status(200).json({ success: true, documents, message: "İşçi belgeleri başarıyla getirildi." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Sunucu Hatası", serverMsg: err.message });
    }
}

exports.put_workers = async (req, res) => {
    const userId = req.user.id;
    const { workerId } = req.params;
    const { name, surname,email, identity_no } = req.body;

    try {
        const worker = await Workers.findOne({where:{id:workerId},include:{model:Users,as:"AddedBy"}});

        if (!worker) {
            return res.status(404).json({ success: false, message: "İşçi bulunamadı!" });
        }

        if(worker.addedById != userId){
            return res.status(404).json({ success: false, message: "Bu işçiyi güncellemeye yetkiniz yok!" });
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
        const worker = await Workers.findOne({where:{id:workerId}});

        if(!worker){
            return res.status(404).json({success:false,message:"İşçi bulunamadı!"})
        }
        if(worker.addedById != userId){
            return res.status(404).json({ success: false, message: "Bu işçiyi silmeye yetkiniz yok!" });
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
    
    
        const existingWorkers = await Workers.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { identity_no: identity_no }, 
                    { email: email }              
                ]
            }
        });
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

        if(req.user.role === "Admin" || req.user.role === "İnsan Kaynakları"){

            const workers = await Workers.findAll();
            return res.status(200).json({success:true,workers,message:"İşçiler Listesi"})
        }else{
            const workers = await Workers.findAll({where:{addedById:userId}});
            return res.status(200).json({success:true,workers,message:"İşçiler Listesi"})
        }
       
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Sunucu Hatası",serverMsg:err.message})
    }
}