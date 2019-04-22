import express from 'express';
import fbAuth from './fbauth'

const router = express.Router()

router.use('/auth', fbAuth)
export default router