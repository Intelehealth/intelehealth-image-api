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
    }
}
