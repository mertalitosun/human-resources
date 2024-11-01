const Documents = require("../models/documents");
const Users = require("../models/users");
const Workers = require("../models/workers");

const validation = require("../middlewares/validation");

exports.post_workers = async (req,res) => {
    const {name,surname,identity_no} = req.body;

    try {

        //validasyon kontrolü
        const validationError = validation(req,res)
        if(validationError){
        return validationError
        }
    
    
        const existingWorkers = await Workers.findOne({ where: { identity_no } });
        if (existingWorkers) {
        return res.status(400).json({ status: 400, message: "Bu işçi zaten kayıtlı" });
        }
    
        
        const worker = await Workers.create({
        name,
        surname,
        identity_no,
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