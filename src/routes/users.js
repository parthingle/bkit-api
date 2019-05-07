import express from "express";
import * as Users from "../db/userFunctions";
import db from "../config/firebase";

const userRouter = express.Router();

userRouter.get(
    "/my",
    Users.getMyProfile,
    Users.resolveUserBuckets,
    Users.resolveUserBucketItems,

    (req, res) => {
        if (res.locals.User === null) {
            res.status(404).send("User not found!");
        } else {
            res.status(200).send(res.locals.User);
        }
        return;
    }
);
userRouter.get(
    "/public/:id",
    Users.getPublicProfile,
    Users.resolveUserBuckets,
    Users.resolveUserBucketItems,

    (req, res) => {
        if (res.locals.User === null) {
            res.status(404).send("User not found!");
        } else {
            res.status(200).send(res.locals.User);
        }
        return;
    }
);

export default userRouter;
