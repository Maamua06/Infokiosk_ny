const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
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
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true })
//         .then(result => app.listen(3002))
//         .catch(err => console.log(err));

app.listen(3002, () => {
        mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true })
        .then(result => console.log('db connected'))
        .catch(err => console.log(err));
});

// routes

app.get('*', checkUser);
app.get('/', requireAuth, (req,res) => res.render('home'));
app.get('/smoothies', requireAuth, (req,res) => res.render('smoothies'));
app.use(authRoutes);

// Funkjson som sender tekst skrevet i tekstboksen på admin page til databasen
app.post('/', async (req, res) => {
        try {
            const textInput = req.body.textInput;

            console.log('Received textInput:', textInput);
    
            // Lagre data i databsen med tekst modelen
            const newText = new Text({ textInput });
            await newText.save();
    
            res.status(201).redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
