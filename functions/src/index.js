"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _fb = require("./auth/fb");

var FB = _interopRequireWildcard(_fb);

var _jwt = require("./auth/jwt");

var JWT = _interopRequireWildcard(_jwt);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add endpoint here to test without JWT
var ignoreAuthCheckPaths = ["/auth/facebook", "/auth/signup"];
var app = (0, _express2.default)();

app.set("port", process.env.PORT || 8080);

app.use((0, _cors2.default)());
app.use((0, _morgan2.default)("dev"));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.get("/status", function (req, res) {
    res.status(200).send({ message: "Listening" });
});

// Facebook authentication and JWT checking
app.use(_passport2.default.initialize());
FB.setStrategy();
app.use(JWT.authenticateUser.unless({ path: ignoreAuthCheckPaths }));

app.use("/", _routes2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    return res.json({ status: err.status || 500, message: "Error!" });
});

module.exports = app;