const express = require('express');
const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({email})
        if (existingUser) return res.status(400).send('User already exists')
        
        const newUser = new User({ username, email, password });
 
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: error.message });
    }
 });

 module.exports = router