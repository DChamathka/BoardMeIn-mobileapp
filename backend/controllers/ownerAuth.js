const Owner = require('../models/Owner');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpire,sendgridApiKey} = require('../config/keys');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendgridApiKey);
const otpGenerator = require('otp-generator');

exports.checkemail = async (req, res) => {
  const {firstname, email} = req.body;
  try {
    const user = await Owner.findOne({email});
    if (user) {
      return res.status(400).json({
        errorMessage: 'Email already exists',
        success: false,
      });
    }
    const code = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });

    res.json({
      code: code,
      success: true,
    });

    const msg = {
      from: 'team.boardmein@gmail.com',
      to: email,
      subject: 'Board Me In - verify your email',
      text: 'Hello, Thank you for registering on Board-Me-In.',
      html: `Please enter  to verify your account.<h2>Hello ${firstname},</h2>
          <h4>Thank You for registering on Board-Me-In.</h4>
          <h4>Please enter below code to verify your account.</h4>
          <h3>${code}</h3>
          `,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Server error',
    });
  }
};

exports.ownerSignupController = async (req, res) => {
  const {firstname, lastname, email, password} = req.body;

  try {
    const newOwner = new Owner();
    newOwner.firstname = firstname;
    newOwner.lastname = lastname;
    newOwner.email = email;

    const salt = await bcrypt.genSalt(10);
    newOwner.password = await bcrypt.hash(password, salt);

    await newOwner.save();

    res.json({
      successMessage: 'Registration success. Please Login.',
      success: true,
    });
  } catch (err) {
    console.log('ownerSignupController error: ', err);
    res.status(500).json({
      errorMessage: 'Server error',
    });

    // console.log(newOwner.password);
    //   } catch (err) {
    //     console.log("ownerSignupController error:", err);
    //   }
  }
};
// };

exports.ownerLoginController = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await Owner.findOne({email});
    if (!user) {
      return res.status(400).json({
        errorMessage: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: 'Invalid credentials',
      });
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };

    jwt.sign(payload, jwtSecret, {expiresIn: jwtExpire}, (err, token) => {
      if (err) console.log('jwt error: ', err);
      const {_id, firstname, lastname, email, role, bio, location, pic} = user;

      res.json({
        token,
        user: {_id, firstname, lastname, email, role, bio, location, pic},
        success: true,
      });
    });
  } catch (err) {
    console.log('ownerLoginController error: ', err);
    res.status(500).json({
      errorMessage: 'Server error',
    });
  }
};
