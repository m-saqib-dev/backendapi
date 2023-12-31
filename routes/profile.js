const express = require('express');
const User = require('../model/userModel');
const router = express.Router();
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        const profileData = {
            userId: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            name: user.name,
        };
        res.json({ profile: profileData });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
 });