import express from "express";

import db from "../db";
import ItemHandlers from "../handlers/ItemHandlers";

const itemRouter = express.Router();
const itemHandlers = new ItemHandlers(db);

itemRouter.get("/:id", itemHandlers.getItem, (req, res) => {
    res.status(200).send(res.locals.item);
    return;
});

// We are no longer using this feature
// itemRouter.post("/", itemHandlers.newItem, (req, res) => {
//     res.status(200).send(res.locals.newItem.id);
//     return;
// });

itemRouter.post("/buck", itemHandlers.buckItem, (req, res) => {
    res.status(200).send({ message: "item bucked!" });
});

itemRouter.post("/unbuck/:id", itemHandlers.unbuckItem, (req, res) => {
    res.status(200).send({ message: "item unbucked!" });
});

itemRouter.get("/coords/:id", itemHandlers.getCoords, (req, res) => {
    res.status(200).send(res.locals.data);
});
export default itemRouter;
