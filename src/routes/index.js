import express from "express";
import fbAuth from "./fbauth";
import userRouter from "./users";

const router = express.Router();

router.use('/auth', fbAuth);
router.use('/user', userRouter);
export default router;