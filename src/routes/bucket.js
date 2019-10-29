import express from "express";

import db from "../db";
import BucketHandlers from "../handlers/BucketHandlers";

const bucketRouter = express.Router();
const bucketHandlers = new BucketHandlers(db);

bucketRouter.get(
    "/:id",
    bucketHandlers.getBucket,
    bucketHandlers.resolveItems,
    (req, res) => {
        res.status(200).send(res.locals.bucket);
        return;
    }
);

export default bucketRouter;
