

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export async function sendCertificateEmail(toEmail, pdfBuffer) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        //user: process.env.EMAIL_USER,
        user: 'fayazahamed7333@gmail.com',
        //pass: process.env.EMAIL_PASS, // App password
        pass: 'sujbcmcdbqionngp', // App password
      },
    });

    const mailOptions = {
      //from: `"Tree Plantation" <${process.env.EMAIL_USER}>`,
      from: `"Tree Plantation" <fayazahamed7333@gmail.com>`,
      to: toEmail,
      subject: 'Your Tree Plantation Certificate',
      text: 'Thank you for participating! Please find your certificate attached.',
      attachments: [
        {
          filename: 'certificate.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (err) {
    console.error('Failed to send email:', err);
  }
}

export default sendCertificateEmail;