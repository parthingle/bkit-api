import express from "express";
import * as Buckets from "../handlers/bucketHandlers";
import * as Users from "../handlers/userHandlers";

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
