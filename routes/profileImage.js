var express = require('express');
var router = express.Router();
const multer = require('multer')
const fileType = require('file-type')
const fs = require('fs')
const encrypt = require('../public/javascripts/encryption');
const mysql = require('../public/javascripts/mysql/mysql');


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './public/images/profileImages/')
    },
  filename: function(req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }   
})

var upload = multer({ 
  storage: storage,
  limits: {fileSize: 10000000, files: 1},
  fileFilter:  (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {

          return callback(new Error('Only Images are allowed !'), false)
      }
  
      callback(null, true);
  } 
}).single('image');


// Api to upload image
router.post('/profileimage/upload', (req, res) => {
 
  upload(req, res, function (err) {
    // var id = req.body.patientid;
      if (err) {
          res.status(400).json({message: err.message})

      } else {
        //   let path = 'public/images/' + `${req.file.filename}`
          //base 64 encoding
          var base64 = fs.readFileSync(req.file.path, { encoding: 'base64' })
          // AES Encryption
          var encryption = encrypt.encrypt(base64);
          // Write on disk
          
              fs.writeFile(req.file.path, encryption, (err) => {
                  if(err)
                  res.status(400).json({message: err.message})
               });
               console.log("hi", req.body.patientid);
               var a = { 
                // patientName = req.body.patientid,
                // patientId = id,
                // patientUuid = uuid,
                image: req.file.path
               }
              //  console.log(req.body.patientid);
              mysql.query('Insert into image SET ?', a, (err, results, fields) =>{
              if (err) 
              res.status(400).json({message: err.message})
            })
          res.status(200).json({message: 'Profile Image Uploaded Successfully !', path: req.file.path})
      }
  })
})


// API to fetch image
router.get('/image/:imagename', (req, res) => {
  let imagename = req.params.imagename
  let imagepath ='public/images/profileImages/' + imagename + '.jpg';
  // To read AES string
  let cipher = fs.readFileSync(imagepath, {encoding: 'binary'});
  // AES decryption
  let decryption = encrypt.decrypt(cipher);
  
  decode_base64(decryption);
  // Function to decode base64
  function decode_base64(base64str) {

      var buffer = Buffer.from(base64str,'base64');
      let path = 'public/image/profileImage/' + 'file.jpg'
      fs.writeFile(path, buffer, (error) => {
        if(error){
          res.status(400).json({message: err.message})
        }else{
          var image = fs.readFileSync(path);
          let mime = fileType(image).mime;
          res.writeHead(200, {'Content-Type': mime })
          res.end(image, 'binary')
          console.log('File created from base64 string!');
          fs.unlinkSync(path);
          return true;
        } 
      });
    }
    
})

module.exports = router;
