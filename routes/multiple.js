var express = require('express');
var router = express.Router();
var multer = require('multer');
const fs = require('fs');
const fileType = require('file-type')
const encrypt = require('../public/javascripts/encryption')
const mysql = require('../public/javascripts/mysql/mysql')

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


router.get('/image', (req, res) => {
    // let imagename = req.params.imagename
    mysql.query('Select image from image', (error, result, fields) => {
        // var a = result;
        var i = 1;
        // console.log(a);
        result.forEach(element => {
            let imagepath = element.image;
            let cipher = fs.readFileSync(imagepath, {encoding: 'binary'});
            let decryption = encrypt.decrypt(cipher);
            decode_base64(decryption);
            // Function to decode base64
            function decode_base64(base64str){
          
                var buffer = Buffer.from(base64str,'base64');
                let path = 'public/image/' + 'file' + `${i}` + '.jpg';
                // console.log(path);
                fs.writeFile(path, buffer, (error) => {
                  if(error) res.status(400).json({message: err.message})  
                });  
            }
            i++;
        })
    })
    fs.readdir('./public/image', (err, data) => {
        var image = []
        data.forEach( element => {
        image.push(fs.readFileSync('./public/image/'+ `${element}`))  
              })
            res.json({
                ima: image
            })
            console.log(image)
            })
            
})

module.exports = router;