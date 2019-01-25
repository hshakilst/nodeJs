const admin = require('../controllers/init_admin');


module.exports = {
    getInfo: function (uid, callback){
        admin.auth().getUser(uid)
        .then(function(userInfo){
            callback(true, userInfo);
        })
        .catch(function(error){
            callback(false, error);
        });
    },
    updateInfo: function(uid, user, callback){
        admin.auth().updateUser(uid, user)
        .then(function(userInfo){
            callback(true, userInfo);
        })
        .catch(function(error){
            callback(false, error);
        });
    },
    uploadProfilePic: function(uid, photo, callback){
        
    }
};