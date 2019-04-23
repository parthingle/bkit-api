import express from "express";
import * as Buckets from "../db/bucketFunctions";
import * as Users from "../db/userFunctions";

const bucketRouter = express.Router();

bucketRouter.get("/get/:id", 
    Buckets.getBucket, 
    Buckets.resolveBucketItems,
    (req, res) => {
        if (res.locals.Buckets === null) {
            res.status(400).send({message: "Bucket not found!"});
        } else {
            res.status(200).send(res.locals.Bucket);
        }
        return;
})

export default bucketRouter;