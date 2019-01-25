const firebase = require("firebase");
const config = require("./config.json");

firebase.initializeApp(config.firebase_config);

module.exports = firebase;