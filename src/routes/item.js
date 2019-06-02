import express from "express";
import * as Items from "../handlers/itemHandlers";

const itemRouter = express.Router();

itemRouter.get(
    "/:id",
    Items.getItem,

    (req, res) => {
        res.status(200).send(res.locals.item);
        return;
    }
);

itemRouter.post(
    "/",
    Items.newItem,

    (req, res) => {
        res.status(200).send(res.locals.newItem.id);
        return;
    }
);

itemRouter.post(
    "/buck/:id",
    Items.buckItem,

    (req, res) => {
        res.status(200).send({ message: "item bucked!" });
    }
);
export default itemRouter;
