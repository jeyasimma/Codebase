import fs from 'fs';
import jwt from 'jsonwebtoken'

import { FileUploadeToColoudinary } from '../libs/Cloudinary.js';
import UserModal from '../models/User.js'
import bcrypt from 'bcrypt'
// var bcrypt = require('../node_modules/bcrypt/bcrypt.js');

const Register = async (req, res) => {
    // console.log('BYyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    console.log('req',req);
    try {
        const { FullName, email, password, gender, dept, skills, year, status, resume_link, phone, whatsapp} = req.body
        // Upload the image to Cloudinary
        let imagePath = 'https://images.unsplash.com/photo-1623984109227-443f400446f0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        if(req.file) imagePath = req.file.filename;
        console.log('req',req);
        // const cloudinaryResult = await FileUploadeToColoudinary(imagePath, 'user_profiles');
        console.log(imagePath)
        // Create a new user with the uploaded image URL
        const existUser = await UserModal.findOne({ email })
        if (existUser) {
            return res.status(301).json({ success: false, message: "User Already Exist Please Login" })
        }
        const hasePassword = await bcrypt.hashSync(password, 10)
        const newUser = new UserModal({
            FullName: FullName,
            email: email,
            password: hasePassword,
            profile: imagePath,
            gender: gender,
            dept: dept,
            skills:skills,
            role:  "user",
            year: year,
            status: status,
            resume_link: resume_link,
            CGPA: "user",
            primary_lang: "Eng  ",
            phone: phone,
            whatsapp: whatsapp
        });

        // Save the user to the database
        await newUser.save();

        // // Remove the image from the local directory after uploading to Cloudinary
        // fs.unlinkSync(imagePath);

        res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error during registration', error);
        res.status(500).json({ error: 'Error during registration' });
    }
}



const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const FindUser = await UserModal.findOne({ email });
        if (!FindUser) {
            return res.status(404).json({ success: false, message: "Account not found. Please register." });
        }
        const comparePassword = await bcrypt.compare(password, FindUser.password);
        if (!comparePassword) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ userId: FindUser._id }, process.env.JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
            sameSite:'None'
        });

        return res.status(200).json({ success: true, message: "Login successfully", user: FindUser, token });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const Logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token');

        // Return success message
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        // Handle error
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { FullName, oldpassword, newpassword } = req.body;

        // Find the user by ID
        const ExistUser = await UserModal.findById(userId);
        if (!ExistUser) {
            return res.status(404).json({ success: false, message: "Account not found." });
        }

        // Check if old password and new password are provided and validate old password
        if (oldpassword) {
            const comparePassword = await bcrypt.compare(oldpassword, ExistUser.password);
            if (!comparePassword) {
                return res.status(401).json({ success: false, message: "Old password is incorrect." });
            }
        }

        // Update FullName if provided
        if (FullName) {
            ExistUser.FullName = FullName;
        }

        // Update password if old and new passwords are provided and valid
        if (oldpassword && newpassword) {
            const hashedPassword = await bcrypt.hash(newpassword, 10);
            ExistUser.password = hashedPassword;
        } else if (oldpassword && !newpassword) {
            return res.status(400).json({ success: false, message: "New password is required when old password is provided." });
        }

        await ExistUser.save();

        // Return success response
        res.status(200).json({ success: true, message: "Profile updated successfully.", user: ExistUser });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { Register, Login, Logout, updateProfile }
