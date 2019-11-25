// import "babel-polyfill";
const app = require("./src/index.js");
const httpServer = require("http").Server(app);
const functions = require("firebase-functions");

httpServer.listen(app.get("port"), () => {
    console.log("Listening on port: ", app.get("port"));
});

export let api = functions.https.onRequest(app);
