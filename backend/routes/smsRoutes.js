import express from "express";
import { sendSMS } from "../controller/smsController.js";

const router = express.Router();

router.post("/send-sms", sendSMS);

export default router;
