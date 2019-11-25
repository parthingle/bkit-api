"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var env = "DEV";
exports.default = env === "DEV" ? {
    FB_APP_ID: "765646803828688",
    FB_APP_SECRET: "4a5461b2262bef81703cccb36ac74253",
    DATABASE_URL: "https://buckit-staging-f3d31.firebaseio.com",
    JWT_SECRET: "thisisjohannesbergQQQuwu"
} : {};