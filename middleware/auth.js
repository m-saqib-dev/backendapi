const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
 const authHeader = req.headers.authorization;
 const token = authHeader && authHeader.split(' ')[1]; // Extract token from header

 if (!token) {
   return res.status(401).json({ error: 'Access denied, token missing' });
 }
 try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify using your secret
   req.user = decoded; // Attach decoded user information to the request object
   next(); // Proceed to the next middleware
 } catch (error) {
   return res.status(401).json({ error: 'Invalid token' });
 }
}

module.exports = verifyToken;
