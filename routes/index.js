var express = require('express');
var router = express.Router();
const multer = require('multer')
const fileType = require('file-type')
const fs = require('fs')
const encrypt = require('../public/javascripts/encryption')


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './public/images/')
    },
  filename: function(req, file, callback) {
      console.log(file.filename);
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
router.post('/images/upload', (req, res) => {
  
  upload(req, res, function (err) {
      
      if (err) {
          res.status(400).json({message: err.message})

      } else {
          let path = 'public/images/' + `${req.file.filename}`
          console.log(path);
          //base 64 encoding
          var base64 = fs.readFileSync(`${path}`, { encoding: 'base64' })
          // AES Encryption
          var encryption = encrypt.encrypt(base64);
          // Write on disk
              fs.writeFile(`${path}`, encryption, (err) => {
                  if(err)
                  res.status(400).json({message: err.message})
               });
         
          res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
      }
  })
})


// API to fetch image
router.get('/image/:imagename', (req, res) => {
  let imagename = req.params.imagename
  let imagepath ='public/images/' + imagename

  // To read AES string
  let cipher = fs.readFileSync(imagepath, {encoding: 'binary'});
  // AES decryption
  let decryption = encrypt.decrypt(cipher);
  
  decode_base64(decryption);
  // Function to decode base64
  function decode_base64(base64str){

      var buffer = Buffer.from(base64str,'base64');
      let path = 'public/image/' + 'file.jpg'
      fs.writeFile(path, buffer, (error) => {
        if(error){
          res.status(400).json({message: err.message})
        }else{
          var image = fs.readFileSync(path);
          let mime = fileType(image).mime;
          res.writeHead(200, {'Content-Type': mime })
          res.end(image, 'binary')
          console.log('File created from base64 string!');
          return true;
        }
      });
    
    }
})

module.exports = router;
