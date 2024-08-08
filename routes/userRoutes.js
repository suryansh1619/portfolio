const express = require('express')
const router = express.Router();
const User = require('../models/userModel')
const { jwtauth, generatetoken } = require('../jwt')

router.post('/signup', async (req, res) => {
    try {
        const newuser = new User(req.body)
        const user = await newuser.save();
        console.log('data saved');
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = generatetoken(payload);
        console.log('token saved');
        res.status(200).json({ response: user, token: token })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal error' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'invalid credentials' })
        }
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = generatetoken(payload);
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal error' })
    }
})

router.post('/logout', async (req, res) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal error' })
    }
})

router.get('/check/auth', jwtauth, async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ error: 'Unauthorized' });
    }
});

module.exports = router;
