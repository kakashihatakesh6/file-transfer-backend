const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const ConnectMongo = require('./config/db');
const path = require('path');

//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://files-transfer.vercel.app'
}));
// app.use(cors({
//     origin: ['https://files-trasfer.vercel.app'],
//     methods: ['POST', 'GET'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));
require('dotenv').config();
app.use(express.static('public'));


// MongoDB CONNECTION
ConnectMongo();

app.get('/', (req, res) => {
    res.json({ message: "File transfer server running fine!" });
});

app.listen(port, () => {
    console.log("Server running on port http://localhost:" + port);
});

// Template Engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// ROUTES
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));