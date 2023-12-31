const express = require('express');
const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
       const { email, password } = req.body;

       if (!email || !password) {
           return res.status(400).json({ error: 'Email and password are required' });
       }

       const user = await User.findOne({ email });

       if (!user) {
           return res.status(401).json({ error: 'Invalid email or password' });
       }

       const isMatch = await bcrypt.compare(password, user.password);

       if (!isMatch) {
           return res.status(401).json({ error: 'Invalid email or password' });
       }

       const payload = {
           user: {
               id: user.id
           }
       };

       const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

       res.json({ message: 'Login successful', token });
   } catch (error) {
       console.error('Error during login:', error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});

module.exports = router;
