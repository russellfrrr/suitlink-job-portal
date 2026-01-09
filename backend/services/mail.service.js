import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendVerificationEmail = async (to, code) => {
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
}


transporter.verify((error, success) => {
  if (error) {
    console.error('Zoho SMTP error: ', error);
  } else {
    console.log('Zoho SMTP is ready to send emails!');
  }
})

export default transporter;