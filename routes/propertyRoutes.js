// routes/propertyRoutes.js
const express = require('express');
const Property = require('../model/propertyModel'); // Adjust the path accordingly

const router = express.Router();
router.post('/property', async (req, res) => {
    const { title, description, location, price, bedrooms, bathrooms, area, images, agent, features } = req.body;
   
    try {
     const property = new Property({
       title,
       description,
       location,
       price,
       bedrooms,
       bathrooms,
       area,
       images,
       agent,
       features
     });
   
     await property.save();
   
     res.json({ property });
    } catch (err) {
     console.error(err.message);
     res.status(500).send('Server error');
    }
   });
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
