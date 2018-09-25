var fs = require('fs');
var archiver = require('archiver');

module.exports = {
    
    zip : function() {
        // var archive = archiver('zip');
        var baseDir = './public/';
        var dirNames = ['image','images']; //directories to zip

        var archive = archiver.create('zip', {});
        archive.on('error', function(err){
            throw err;
        });

        var output = fs.createWriteStream('./public/restore' + '/restore.zip'); //path to create .zip file
            output.on('close', function() {
                console.log(archive.pointer() + ' total bytes');
                console.log('archiver has been finalized and the output file descriptor has closed.');
        });
        archive.pipe(output);

        dirNames.forEach(function(dirName) {
        archive.directory(baseDir + dirName, dirName);
        });
        archive.finalize();
    }
}