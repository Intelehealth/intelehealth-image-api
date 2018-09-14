var express = require('express');
var router = express.Router();
var multer = require('multer');
const fs = require('fs');
const encrypt = require('../public/javascripts/encryption')

var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './public/images/')
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
})

var upload = multer({  storage: storage,
    limits: {fileSize: 10000000, files: 10},
    fileFilter:  (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  
            return callback(new Error('Only Images are allowed !'), false)
        }
    
        callback(null, true);
    } 
}).array('image');


router.post("/", function (req, res) {
   
    upload(req, res, function (err) {
        if (req.files == 0) {
            res.status(400).json({message: 'Please select image to Upload'})
        }else {
            if (err) {
                    res.status(400).json({message: err.message})
                } else {
                    for (const file of req.files) {
                        // let path = 'public/images/' + file.filename;
                        //base 64 encoding
                        var base64 = fs.readFileSync(file.path, { encoding: 'base64' })
                        // AES Encryption
                        var encryption = encrypt.encrypt(base64);
                        // Write on disk
                        fs.writeFile(file.path, encryption, (err) => {
                    if(err)
                    res.status(400).json({message: err.message})
                 });
                }
                res.status(200).json({message: 'Image Uploaded Successfully !'})
            }
        }             
    })
})


module.exports = router;