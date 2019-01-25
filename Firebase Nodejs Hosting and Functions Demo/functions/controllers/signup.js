const firebase = require('./init_firebase');
const admin = require('./init_admin');
const utility = require('./utility');

module.exports = {
    sign_up: function (user, callback) {
        firebase.auth().createUserWithEmailAndPassword(user.email.toString().trim(), 
        user.pass.toString().trim())
            .then(function (firebaseUser) {
                firebaseUser.user.sendEmailVerification()
                    .then(function () {
                        callback(true, "An email has been sent to " + firebaseUser.user.email + ". Please verify your email address.")
                    })
                    .catch(function (error) {
                        callback(false, error.message);
                    });
            })
            .catch(function (error) {
                callback(false, error.message);
            });


    }
};