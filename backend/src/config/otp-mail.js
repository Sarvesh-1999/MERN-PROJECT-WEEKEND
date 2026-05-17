import nodeMailer from "nodemailer";

export const sendOtpMail = async (email, otp) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailConfiguration = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password reset OTP",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. OTP is valid for 10 minutes</p>`,
  };

  await transporter.sendMail(mailConfiguration, (err, info) => {
    if (err) console.log(err);
    console.log("OTP sent successfully", info);
  });
};
