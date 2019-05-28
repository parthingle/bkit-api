import express from "express";

const homeRouter = express.Router();

homeRouter.get(
    "/",
    (req, res, next) => {
        req.auth.id;
    },
    (req, res) => {
        res.status(200).send(res.locals.item);
        return;
    }
);

export default homeRouter;
