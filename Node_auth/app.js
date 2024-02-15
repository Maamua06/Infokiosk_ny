const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const frontendRoutes = require('./routes/frontendRoutes');
const apiRoutes = require('./routes/apiRoutes');
const Text = require('./models/Textmodel');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// Middelware

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// View engine

app.set('view engine', 'ejs');

// Database connection

const dbURI = 'mongodb+srv://abuahm0607:test123@nodeove.ngpr07a.mongodb.net/?retryWrites=true&w=majority';

app.listen(3002, () => {
        mongoose.connect(dbURI)
        .then(result => console.log('db connected'))
        .catch(err => console.log(err));
});

// routes

app.get('*', checkUser);
app.get('/', requireAuth, (req,res) => res.render('home'));
app.use('/api', apiRoutes);
app.use(authRoutes);
app.use(frontendRoutes);

// Funkjson som sender tekst og bilder skrevet i tekstboksen på admin page til databasen
app.post('/', async (req, res) => {
        try {
            const textInput = req.body.textInput;
            const imageInput = req.body.imageInput;
    
            console.log('Received textInput:', textInput);
            console.log('Received imageInput:', imageInput);
    
            // Create a new Text model with both text and image URL
            const newText = new Text({ textInput, imageInput });
            await newText.save();
    
            res.status(201).redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
