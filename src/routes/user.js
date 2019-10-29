import express from "express";

import UserHandlers from "../handlers/UserHandlers";

const userRouter = express.Router();

userRouter.get(
    "/my",
    UserHandlers.getMyProfile,
    UserHandlers.resolveUserBuckets,
    UserHandlers.resolveUserItems,
    (req, res) => {
        res.status(200).send(res.locals.user);
        return;
    }
);
userRouter.get(
    "/public/:id",
    UserHandlers.getPublicProfile,
    UserHandlers.resolveUserBuckets,
    UserHandlers.resolveUserItems,
    (req, res) => {
        res.status(200).send(res.locals.user);
        return;
    }
);

userRouter.get("/home", UserHandlers.getHomePage, (req, res) => {
    res.status(200).send(res.locals.home);
    return;
});

export default userRouter;
