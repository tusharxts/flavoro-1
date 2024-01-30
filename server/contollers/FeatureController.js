const User = require("../models/User");
const nodemailer = require("nodemailer");

const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const generatedOtp = Math.floor(Math.random() * 10000); // 4 digit otp

    let user = User.findOneAndUpdate({ email }, { otp: generatedOtp });

    if (!user) {
      return res.status(400).json({ success: false, message: "Please Signup" });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1a3dcabf03fd1c",
        pass: "94b04cc7977084",
      },
    });

    const info = await transporter.sendMail({
      from: "coder29yt@gmail.com", // sender address
      to: email, // list of receivers
      subject: "New otp has been generated", // Subject line
      html: `<h3>Your Generated Otp is : <i>${generatedOtp}</i> </h3>`, // html body
    });

    if (info.messageId) {
      return res
        .status(200)
        .json({ success: true, message: "Otp has been sent to your email" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { resetPassword };
