const jwt = require('jsonwebtoken');

const jwtauth =async (req, res, next) => {
    const token = req.cookies.token; 
    console.log(token);
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; 
        next(); 
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid Token' });
    }
}
const generatetoken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { jwtauth, generatetoken };
