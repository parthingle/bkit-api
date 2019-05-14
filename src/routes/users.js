import express from "express";
import * as Users from "../db/userFunctions";
import db from "../config/firebase";

const userRouter = express.Router();

userRouter.get(
    "/my",
    Users.getMyProfile,
    Users.resolveUserBuckets,
    Users.resolveUserItems,

    (req, res) => {
        res.status(200).send(res.locals.user);
        return;
    }
);
userRouter.get(
    "/public/:id",
    Users.getPublicProfile,
    Users.resolveUserBuckets,
    Users.resolveUserItems,

    (req, res) => {
        res.status(200).send(res.locals.user);
        return;
    }
);

export default userRouter;
