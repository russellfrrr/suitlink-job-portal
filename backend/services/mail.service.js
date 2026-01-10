import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false,
  }
})

export const sendVerificationEmail = async (to, code) => {

  try {
    const mailOptions = {
      from: `"SuitLink" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Verify your SuitLink account',
      html: `
        <h2>Email Verification
        <p>Your verification code is:</p>
        <h1>${code}</h1>
        <p>This code expires in 15 minutes.</p>`,
    }

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Email send failed: ', err);
  
    throw new Error ('Failed to send verification email!');
  }
}

export default transporter;