var express = require('express');
var router = express.Router();
const fs = require('fs');
const mkdir = require('../public/javascripts/directory');
const mysql = require('../public/javascripts/mysql/mysql');
const encrypt = require('../public/javascripts/encryption');
const deleteFile = require('../public/javascripts/deletefile');
const zipFile = require('../public/javascripts/zip');

router.get('/', (req, res) => {
    deleteFile.rmDir('public/restore')
    mkdir.mkDir('public/restore');

    //Profile Images

//     mysql.query('Select path, file_name from image_profileimage where patient_id = "'+req.params.patientid+'"', (error, results) => {
//      if(error)
//         res.status(400).json({message: error.message})
//         else {
//         result.forEach(element => {
//         let imagepath = element.path;
//         let cipher = fs.readFileSync(imagepath, {encoding: 'binary'});
//         let decryption = encrypt.decrypt(cipher);
//         decode_base64(decryption);

//         function decode_base64(base64str) {
          
//             var buffer = Buffer.from(base64str,'base64');
//             mkdir.mkDir('public/images/restore/profileImages');
//             let path = 'public/image/restore/profileImages/' + `${element.file_name}`;
//             //writing image file to profileImage folder
//             fs.writeFileSync(path, buffer, (error) => {
//               if(error) res.status(400).json({message: error.message})  
//             });  
//         }
//     })
// }
// })
            // Physical Exam Images


//     mysql.query('Select path, file_name from image_physicalexam where patient_id = "'+req.query.patientid+'" and visit_id = "'+req.query.visitid+'"', (error, result) => {
//         if(error)
//         res.status(400).json({message: error.message})
//         else {
//         result.forEach(element => {
//             let imagepath = element.path;
//             let cipher = fs.readFileSync(imagepath, {encoding: 'binary'});
//             let decryption = encrypt.decrypt(cipher);
//             decode_base64(decryption);
//             // Function to decode base64
//             function decode_base64(base64str) {
          
//                 var buffer = Buffer.from(base64str,'base64');
//                 let path = 'public/image/physicalExamImages/' + `${element.file_name}`;
//                 //writing image file to physicalImage folder
//                 fs.writeFileSync(path, buffer, (error) => {
//                   if(error) res.status(400).json({message: error.message})  
//                 });  
//             }
//         })
//     }
// })
            // Additional Document Images

//     mysql.query('Select path, file_name from image_additionaldoc where patient_id = "'+req.query.patientid+'" and visit_id = "'+req.query.visitid+'"', (error, result, fields) => {
//         if(error)
//         res.status(400).json({message: error.message})
//         else {
//         result.forEach(element => {
//             let imagepath = element.path;
//             let cipher = fs.readFileSync(imagepath, {encoding: 'binary'});
//             let decryption = encrypt.decrypt(cipher);
//             decode_base64(decryption);
//             // Function to decode base64
//             function decode_base64(base64str){
          
//                 var buffer = Buffer.from(base64str,'base64');
//                 let path = 'public/image/additionalImages/' + `${element.file_name}`;
//                 //writing image file to additionalImage folder
//                 fs.writeFileSync(path, buffer, (error) => {
//                   if(error) res.status(400).json({message: error.message})  
//                 });  
//             }
//         })
//     }
// })
zipFile.zip()
res.sendFile();
    })

module.exports = router;