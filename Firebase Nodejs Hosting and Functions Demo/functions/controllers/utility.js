const admin = require('./init_admin');
const stream = require('stream').Readable;

module.exports = {
    isEmpty: function(str){
        return (!str || 0 === str.length || !str.trim());
    },
    uploadFile: function(buffer, fileName, callback){
        var file = admin.storage().bucket('zombie-outlaws.appspot.com').file(fileName);
        const readableStream = new stream();
        readableStream.push(buffer);
        readableStream.push(null);
        readableStream.pipe(file.createWriteStream())
        .on('error', function(error) {
            callback(false, error);
        })
        .on('finish', function() {
            callback(true, "File uploaded successfully!");
        });
    }
};