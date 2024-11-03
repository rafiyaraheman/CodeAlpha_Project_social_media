// auth.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { imageUploadUtil } from "../cloudinaryConfig.js"; // Import image upload util

// /* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;

    // Upload image to Cloudinary and get the URL
    let picturePath = '';
    if (req.file) { // Ensure there is a file to upload
      const result = await imageUploadUtil(req.file.buffer);
      picturePath = result.secure_url; // Get the URL of the uploaded image
    }

    // Generate a hashed password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user instance with additional fields
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath, // Store the Cloudinary URL here
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // Random profile views
      impressions: Math.floor(Math.random() * 10000),   // Random impressions
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user data
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// /* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove password from the user object before sending the response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Respond with token and user data (excluding password)
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
