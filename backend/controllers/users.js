const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
    try {
        const { username, name, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ username, name, passwordHash });
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).populate('notes', { content: 1, important: 1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
