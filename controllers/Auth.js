const Docter = require("../models/doctorModel");
const Patient = require("../models/patientModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const docter = await Docter.findOne({ email });

    if (docter) {
      return res.status(400).json({
        success: false,
        message: "doctor already exists",
      });
    }

    let hashedPassword ;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log(error);
    }

    const newDoc = await Docter.create({
      email,
      password: hashedPassword,
      name,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "doctor registered successfully",
	  newDoc
    });

  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find docter with provided email
		const user = await Docter.findOne({ email });

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `docter is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, role: user.role },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};

exports.patientRegister = async (req, res) => {
  try {
    const { phone, name } = req.body;
    const patient = await Patient.findOne({ phone });

    if (patient) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists",
      });
    }


    const newPatient = await Patient.create({
      phone,
      name,
    });

    return res.status(200).json({
      success: true,
      message: "Patient registered successfully",
	  newPatient
    });

  } catch (error) {
    console.log(error);
  }
};
