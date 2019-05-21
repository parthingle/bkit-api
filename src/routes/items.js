import express from "express";
import * as Items from "../db/itemFunctions";

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

export default itemRouter;
