import express from "express";
import fbAuth from "./fbauth";
import userRouter from "./users";
import bucketRouter from "./buckets";
import itemRouter from "./items";

const router = express.Router();

router.use("/auth", fbAuth);
router.use("/user", userRouter);
router.use("/bucket", bucketRouter);
router.use("/item", itemRouter);
export default router;
