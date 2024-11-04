const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"uploads/");
  },
  filename:(req,file,cb) => {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
});

const deleteFile = (filePath) => {
  fs.unlink(filePath,(err)=>{
    if(err){
      console.log("Dosya silinirken sorun oluştu",err);
    }else{
      console.log("Dosya başarıyla silindi");
    }
  })
}

const upload = multer({storage:storage});

module.exports = {upload,deleteFile};