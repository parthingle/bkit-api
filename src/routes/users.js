import express from "express";
import * as Users from "../db/userFunctions";

const userRouter = express.Router()

userRouter.get("/my/:id", Users.getMyProfile, (req, res) => {
    if (req.User === null) {
        res.status(404).send("User not found!");
    } else {
        res.status(200).send(req.User);
    }
    return;
});

userRouter.get("/public/:id", Users.getPublicProfile, (req, res) => {
    if (req.User === null) {
        res.status(404).send("User not found!");
    } else {
        res.status(200).send(req.User);
    }
    return;
})

export default userRouter;