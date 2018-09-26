const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const encrypt = require('../public/javascripts/encryption');
const mysql = require('../public/javascripts/mysql/mysql');
const deleteFile = require('../public/javascripts/deletefile');

var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './public/images/additionalImages/')
    },
    filename: function(req, file, callback) {
        callback(null, req.body.patientid + "_" + file.originalname);
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
                    var a = { 
                        visit_id : req.body.visitid,
                        patient_id : req.body.patientid,
                        path : file.path
                       }
                       mysql.query('Insert into image_additionaldoc SET ?', a, (err, results, fields) =>{
                        if (err) 
                        res.status(400).json({message: err.message})
                      })
                 });
                }
                res.status(200).json({message: 'Image Uploaded Successfully !'})
            }
        }             
    })
})

router.get('/image', (req, res) => {
    // let imagename = req.params.imagename
    deleteFile.rmFile('public/image/additionalImages')
    mysql.query('Select path from image_additionaldoc where patient_id = "'+req.query.patientid+'" and visit_id = "'+req.query.visitid+'"', (error, result, fields) => {
        // var a = result;
        var i = 1;
        console.log(result);
        result.forEach(element => {
            let imagepath = element.path;
            let cipher = fs.readFileSync(imagepath, {encoding: 'binary'});
            let decryption = encrypt.decrypt(cipher);
            decode_base64(decryption);
            // Function to decode base64
            function decode_base64(base64str){
          
                var buffer = Buffer.from(base64str,'base64');
                let path = 'public/image/additionalImages/' + 'addImg' + `${i}` + '.jpg';
                //writing image file to additionalImage folder
                fs.writeFileSync(path, buffer, (error) => {
                  if(error) res.status(400).json({message: err.message})  
                });  
            }
            i++;
        })
        //reading all the file from additionalImages folder
        fs.readdir('./public/image/additionalImages', (err, data) => {
            var image = []
            data.forEach( element => {
                image.push('http://localhost:3000/image/additionalImages/' + `${element}`)
            })
            res.status(200).json({images: image})  
        })
    })          
})


module.exports = router;