import express from "express";
import fbAuth from "./fbauth";
import userRouter from "./users";
import bucketRouter from "./buckets";

const router = express.Router();

router.use('/auth', fbAuth);
router.use('/user', userRouter);
router.use('/bucket', bucketRouter);
export default router;