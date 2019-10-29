import express from "express";

import db from "../db";
import UserHandlers from "../handlers/UserHandlers";

const userRouter = express.Router();
const userHandlers = new UserHandlers(db);

userRouter.get(
    "/my",
    userHandlers.getMyProfile,
    userHandlers.resolveUserBuckets,
    userHandlers.resolveUserItems,
    (req, res) => {
        res.status(200).send(res.locals.user);
        return;
    }
);
userRouter.get(
    "/public/:id",
    userHandlers.getPublicProfile,
    userHandlers.resolveUserBuckets,
    userHandlers.resolveUserItems,
    (req, res) => {
        res.status(200).send(res.locals.user);
        return;
    }
);

userRouter.get("/home", userHandlers.getHomePage, (req, res) => {
    res.status(200).send(res.locals.home);
    return;
});

export default userRouter;
