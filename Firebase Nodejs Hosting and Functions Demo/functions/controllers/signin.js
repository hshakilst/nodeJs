const firebase = require('./init_firebase');
const admin = require('./init_admin');

module.exports = {
    signin: function (user, callback) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

        firebase.auth().signInWithEmailAndPassword(user.email.toString().trim(), user.pass.toString().trim())
            .then(function (firebaseUser) {

                if (firebaseUser.user.emailVerified === true) {
                    if (firebaseUser.user.uid === "IUcqqitlkAcoJo9y2G4ElEcsdTw2") {
                        admin.auth().setCustomUserClaims(firebaseUser.user.uid, {
                            admin: true
                        }); //setting admin privilege
                    }

                    return firebaseUser.user.getIdToken()
                        .then(function (idToken) {
                            const expiresIn = 60 * 60 * 24 * 5 * 1000;

                            admin.auth().createSessionCookie(idToken, {
                                    expiresIn
                                })
                                .then(function (sessionCookie) {
                                    callback(true, sessionCookie);
                                })
                                .catch(function (error) {
                                    callback(false, error.message);
                                });
                        })
                        .catch(function (error) {
                            callback(false, error.message);
                        });
                } else {
                    return callback(flase, "Please verify your email address!");
                }
            })
            .then(function () {
                firebase.auth().signOut();
            })
            .catch(function (error) {
                callback(false, error.message);
            });


    },
    verifySessionCookie: function (cookie, callback) {
        admin.auth().verifySessionCookie(cookie, true)
            .then(function (decodedToken) {

                admin.auth().getUser(decodedToken.uid).then((userRecord) => {

                    if (userRecord.customClaims) {
                        if(userRecord.customClaims.admin === true){
                            callback(true, "Admin");
                        }
                    } else {
                        callback(true, decodedToken.uid);
                    }
                });

            })
            .catch(function (error) {
                if (error.code === "auth/argument-error") {
                    callback(false, "Cookie is missing or inavalid!");
                } else if (error.code === "auth/session-cookie-revoked") {
                    callback(false, "Session cookie is revoked!");
                } else {
                    callback(false, error);
                }
            });
    }
};