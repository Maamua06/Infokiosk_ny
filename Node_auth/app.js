const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// Middelware

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// View engine

app.set('view engine', 'ejs');

// Database connection

const dbURI = 'mongodb+srv://abuahm0607:test123@nodeove.ngpr07a.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true })
        .then(result => app.listen(3002))
        .catch(err => console.log(err));

// routes

app.get('*', checkUser);
app.get('/', requireAuth, (req,res) => res.render('home'));
app.get('/smoothies', requireAuth, (req,res) => res.render('smoothies'));
app.use(authRoutes);

