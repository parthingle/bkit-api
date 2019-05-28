import express from "express";
import fbAuth from "./fbauth";
import userRouter from "./user";
import bucketRouter from "./bucket";
import itemRouter from "./item";
import homeRouter from "./home";

const router = express.Router();

router.use("/auth", fbAuth);
router.use("/user", userRouter);
router.use("/bucket", bucketRouter);
router.use("/item", itemRouter);
router.use("/home", homeRouter);
export default router;
