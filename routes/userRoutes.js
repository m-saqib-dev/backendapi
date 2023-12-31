const express = require('express');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Middleware for input validation

router.post('/signup', async (req, res) => {
   try {
       const { username, email, password, phone, name } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = new User({ username, email, name, password: hashedPassword, phone });

       await newUser.save();
       res.status(201).json({ message: 'User created successfully' });
   } catch (error) {
       console.error('Error during signup:', error);
       res.status(500).json({ error: error.message });
   }
});

router.post('/login', validateLoginInput, async (req, res) => {
   try {
       const { email, password } = req.body;
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

       jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
           if (err) throw err;
           res.json({ token });
       });
   } catch (error) {
       console.error('Error during login:', error);
       res.status(500).json({ error: error.message });
   }
});

function verifyToken(req, res, next) {
   const authHeader = req.headers.authorization;
   const token = authHeader && authHeader.split(' ')[1];

   if (!token) {
       return res.status(401).json({ error: 'Access denied, token missing' });
   }

   try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded;
       next();
   } catch (error) {
       return res.status(401).json({ error: 'Invalid token' });
   }
}

router.get('/protected', verifyToken, (req, res) => {
   res.json({ message: 'This is a protected route', user: req.user });
});

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

module.exports = router;
