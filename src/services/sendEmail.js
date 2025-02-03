import { REACT_APP_BACKEND_API_URL, PAGE_URL } from '../config/variables'
import axios from 'axios'

export const sendCreateAccountEmail = async (email, username) => {
    try {
        const html = `
            <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #0F172A; padding: 20px; border-radius: 10px; text-align: center;">
                <table style="width: 100%; background: #1E293B; border-radius: 10px; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <tr>
                    <td style="text-align: center;">
                        <h1 style="color: #F8FAFC;">Welcome to Our Platform! 🎉</h1>
                        <p style="color: #94A3B8; font-size: 16px;">Hi <strong>${username}</strong>,</p>
                        <p style="color: #94A3B8; font-size: 16px;">Your account has been successfully created! We are thrilled to have you on board.</p>
                        <p style="color: #94A3B8; font-size: 16px;">Get started by exploring your dashboard and making the most of our platform.</p>
                        <a href="${PAGE_URL}/Dashboard" style="display: inline-block; padding: 12px 25px; background-color: #7823c4; color: #F8FAFC; text-decoration: none; font-size: 16px; border-radius: 5px; margin-top: 20px;">Go to Dashboard</a>
                        <p style="color: #94A3B8; font-size: 14px; margin-top: 20px;">If you have any questions, feel free to reach out to our support team.</p>
                        <hr style="border: none; border-top: 1px solid #697b94; margin: 20px 0;">
                        <p style="color: #94A3B8; font-size: 14px;">Best Regards, <br> EliteHub Team</p>
                    </td>
                </tr>
                </table>
            </div>
            `;

        await axios.post(`${REACT_APP_BACKEND_API_URL}/api/mailer`, {
            to: email,
            subject: 'Account created successfully',
            html,
        });

    } catch (error) {
        console.error('Error sending email:', error);
    }
};