const jwt = require('jsonwebtoken');

const jwtauth = async (req, res, next) => {
    const token = req.cookies.token; 
    if (!token) {
        console.log('No token found in cookies');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; 
        next(); 
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ error: 'Invalid Token' });
    }
}

const generatetoken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { jwtauth, generatetoken };
