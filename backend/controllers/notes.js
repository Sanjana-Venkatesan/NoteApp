const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Helper to extract token from headers
const getTokenFrom = (request) => {
    const authorization = request.headers.authorization;
    return authorization && authorization.startsWith('Bearer ')
        ? authorization.replace('Bearer ', '')
        : null;
};

// Get all notes with populated user information
notesRouter.get('/', async (req, res) => {
    try {
        const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

notesRouter.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const notes = await Note.find({ user: userId });
      res.json(notes);
    } catch (error) {
      res.status(400).send({ error: 'Notes not found for the user' });
    }
  });

// Create a new note
notesRouter.post('/', async (req, res) => {
    try {
        const body = req.body;

        const token = getTokenFrom(req);
        if (!token) {
            return res.status(401).json({ error: 'Missing or invalid token' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'Token invalid' });
        }

        const user = await User.findById(decodedToken.id);

        const note = new Note({
            content: body.content,
            important: body.important || false,
            user: user._id,
        });

        const savedNote = await note.save();
        user.notes = user.notes.concat(savedNote._id);
        await user.save();

        res.status(201).json(savedNote);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Invalid token' });
        } else {
            res.status(500).json({ error: 'Failed to save note' });
        }
    }
});

// Delete a note by ID
notesRouter.delete('/:id', async (req, res, next) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

// Update a note by ID
notesRouter.put('/:id', async (req, res, next) => {
    try {
        const body = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { content: body.content, important: body.important },
            { new: true }
        );

        if (updatedNote) {
            res.json(updatedNote);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = notesRouter;
