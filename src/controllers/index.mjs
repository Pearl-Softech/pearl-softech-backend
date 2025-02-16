import "dotenv/config";
import { generateJWT } from "./jwt.mjs";
import { sendMail } from "./mail.mjs";

const login = async (req, res) => {
    const { key } = await req.body;
    if (key !== process.env.KEY) {
        return res.status(400).json({ type: "error", message: 'Invalid key', payload: null });
    }

    const jwtToken = generateJWT();
    res.status(200).json({ type: "success", message: 'Login successful', payload: jwtToken });
};

const businessMail = async (req, res) => {
    const { companyName, companyEmail, companyPhoneNumber, subject, message } = await req.body; // Corrected this line
    const payload = {
        companyName,
        companyEmail,
        companyPhoneNumber, // Corrected this line
        subject,
        message,
    };
    try {
        await sendMail({ type: 1, payload });
        return res.status(200).json({ type: "success", message: 'Mail sent successfully', payload: "null" });
    } catch (error) {
        return res.status(500).json({ type: "error", message: 'Failed to send mail', payload: "null" });
    }
};

export { login, businessMail };
