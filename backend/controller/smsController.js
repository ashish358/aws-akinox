import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const sendSMS = async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ success: false, error: "Phone and message are required!" });
    }

    const response = await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886", // Twilio WhatsApp sandbox or verified business number
      to: `whatsapp:+${phone}`,
    });

    res.status(200).json({ success: true, message: "WhatsApp message sent!", sid: response.sid });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
