const fs = require('fs')

module.exports = {
    rmDir : function(dirPath) {
        console.log(dirPath);
        var files = fs.readdirSync(dirPath); 
        console.log(files.length);
            if (files.length > 0)
                for (var i = 0; i < files.length; i++) {
                     var filePath = dirPath + '/' + files[i];
                        if (fs.statSync(filePath).isFile())
                            fs.unlinkSync(filePath);
                        else
                        rmDir(filePath);
                    }
                }
};