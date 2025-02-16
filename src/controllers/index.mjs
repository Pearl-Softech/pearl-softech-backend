import "dotenv/config";
import { generateJWT } from "./jwt.mjs";
import { sendMail } from "./mail.mjs";

// Validation functions
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Adjust regex according to your phone number format
    return phoneRegex.test(phoneNumber);
};

const login = async (req, res) => {
    const { key } = req.body;
    if (!key) {
        return res.status(400).json({ type: "error", message: 'Key is required', payload: null });
    }
    if (key !== process.env.KEY) {
        return res.status(400).json({ type: "error", message: 'Invalid key', payload: null });
    }

    const jwtToken = generateJWT();
    res.status(200).json({ type: "success", message: 'Login successful', payload: jwtToken });
};

const businessMail = async (req, res) => {
    const { companyName, companyEmail, companyPhoneNumber, subject, message } = req.body;

    // Check for missing fields
    if (!companyName || !companyEmail || !companyPhoneNumber || !subject || !message) {
        return res.status(400).json({ type: "error", message: 'All fields are required', payload: null });
    }

    // Validate email and phone number
    if (!isValidEmail(companyEmail)) {
        return res.status(400).json({ type: "error", message: 'Invalid email format', payload: null });
    }
    if (!isValidPhoneNumber(companyPhoneNumber)) {
        return res.status(400).json({ type: "error", message: 'Invalid phone number format', payload: null });
    }

    const payload = {
        companyName,
        companyEmail,
        companyPhoneNumber,
        subject,
        message,
    };
    try {
        await sendMail({ type: 1, payload });
        return res.status(200).json({ type: "success", message: 'Mail sent successfully', payload: null });
    } catch (error) {
        return res.status(500).json({ type: "error", message: 'Failed to send mail: Internal server error', payload: null });
    }
};

export { login, businessMail };
