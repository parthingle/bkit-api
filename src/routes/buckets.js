import express from "express";
import * as Buckets from "../db/bucketFunctions";
import * as Users from "../db/userFunctions";

const bucketRouter = express.Router();

bucketRouter.get(
    "/:id",
    Buckets.getBucket,
    Buckets.resolveItems,
    (req, res) => {
        res.status(200).send(res.locals.bucket);
        return;
    }
);

export default bucketRouter;
