var express = require('express');
var router = express.Router();
const fs = require('fs');
const mkdir = require('../public/javascripts/directory');
const mysql = require('../public/javascripts/mysql/mysql');
const encrypt = require('../public/javascripts/encryption');
const deleteFile = require('../public/javascripts/deletefile');
const zipFile = require('../public/javascripts/zip');

router.post('/', (req, res) => {
    deleteFile.rmDir('public/restore')
    // mkdir.mkDir('public/restore');
    // mysql.query('Select profileImage from profileImage where patientID', (error, results) => {
    // result.forEach(element => {
    //     let imagepath = element.image;
    //     let cipher = fs.readFileSync(imagepath, {encoding: 'binary'});
    //     let decryption = encrypt.decrypt(cipher);
    //     decode_base64(decryption);

    //     function decode_base64(base64str) {
          
    //         var buffer = Buffer.from(base64str,'base64');
    //         mkdir.mkDir('public/images/restore/profileImages');
    //         let path = 'public/image/restore/profileImages/' + 'profileImg' + `${i}` + '.jpg';
    //         //writing image file to profileImage folder
    //         fs.writeFileSync(path, buffer, (error) => {
    //           if(error) res.status(400).json({message: err.message})  
    //         });  
    //     }
    // })
    // })
    // mysql.query('Select physicalExam from physicalImage where ', (error, results) => {
    //     result.forEach(element => {
    //         let imagepath = element.image;
    //         let cipher = fs.readFileSync(imagepath, {encoding: 'binary'});
    //         let decryption = encrypt.decrypt(cipher);
    //         decode_base64(decryption);
            
    //         function decode_base64(base64str) {
                      
    //             var buffer = Buffer.from(base64str,'base64');
    //             mkdir.mkDir('public/images/restore/physicalExamImages');
    //             let path = 'public/image/restore/physicalExamImages/' + 'phyImg' + `${i}` + '.jpg';
    //                     //writing image file to physicalImage folder
    //             fs.writeFileSync(path, buffer, (error) => {
    //             if(error) res.status(400).json({message: err.message})  
    //             });  
    //         }
    //     })
    // })
    // mysql.query('Select physicalExam from additionalImage where ', (error, results) => {
    //     result.forEach(element => {
    //         let imagepath = element.image;
    //         let cipher = fs.readFileSync(imagepath, {encoding: 'binary'});
    //         let decryption = encrypt.decrypt(cipher);
    //         decode_base64(decryption);
            
    //         function decode_base64(base64str) {
                      
    //             var buffer = Buffer.from(base64str,'base64');
    //             mkdir.mkDir('public/images/restore/addDocumentImages');
    //             let path = 'public/image/restore/addDocumentImages/' + 'addImg' + `${i}` + '.jpg';
    //                     //writing image file to addDocumentImage folder
    //             fs.writeFileSync(path, buffer, (error) => {
    //             if(error) res.status(400).json({message: err.message})  
    //             });  
    //         }
    //     })
    // })
    // zipFile.zip()
    res.json({
        status: 200,
        message: 'sucess'
    })

})


module.exports = router;