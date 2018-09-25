const fs = require('fs');

   module.exports = {

    mkDir : function (directory) {  
        try {
            fs.statSync(directory);
            console.log('folder exist')
        } catch(e) {
            fs.mkdirSync(directory);
            console.log('folder created')
        }
        // try {
        //     fs.statSync('./public/images/' + `${patientid}` + '/' + `${visitid}`);
        //     console.log('folder exist')
        //   } catch(e) {
        //     fs.mkdirSync('./public/images/' + `${patientid}` + '/' + `${visitid}`);
        //     console.log('visit folder created')
        //   }
    }
}
