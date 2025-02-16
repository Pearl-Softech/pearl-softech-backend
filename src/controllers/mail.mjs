import nodemailer from "nodemailer";
import "dotenv/config";

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendMail = async ({ type, payload }) => {
    let _html;

    switch (type) {
        case 1:
            _html = html_type_1({ payload });
            break;
        default:
            _html = "Default HTML content"; // Provide default HTML content or handle other types
            break;
    }

    let mailOptions = {
        from: `${payload.companyName} <${payload.companyEmail}>`,
        to: "pearlsoftechorg@gmail.com",
        subject: payload.subject,
        html: _html
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending mail:', error);
    }
};

function html_type_1({ payload }) {
    return `
        <h4>Company Phone Number</h4>
        <p>${payload.companyPhoneNumber}</p>
        <br>
        <h4>Message</h4>
        <p>${payload.message}</p>
        </br>
    `;
}

export { sendMail };
