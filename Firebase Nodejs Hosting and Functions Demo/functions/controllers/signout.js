const admin = require('./init_admin');

module.exports = {
    signout: function(sessionCookie, callback){
        admin.auth().verifySessionCookie(sessionCookie).then((decodedClaims) => {
          return admin.auth().revokeRefreshTokens(decodedClaims.sub);
        }).then(() => {
            callback(true, "Token revoked successfully!");
        }).catch((error) => {
            if (error.code === "auth/argument-error") {

                callback(false, "Cookie is missing or inavalid!");
            }
            else if (error.code === "auth/session-cookie-revoked") {
                callback(false, "Session cookie is revoked!");
            }
            else {
                callback(false, error);
            }
        });
    }
};