// require dependencies
const path = require('path');
const fs = require('fs');
const express = require('express');

// setup express app
const app = express();
const PORT = process.env.PORT || 3000;

// setup express for data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// routes
// route to index html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// route to notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// route to db.json 
app.get('/api/notes', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
    res.json(data);
});

// post route to retrieve note and save
app.post('/api/notes', (req, res) => {
    const data =JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    fs.writeFileSync('./db/db.json', JSON.stringify(data.concat(req.body)), 'utf-8');
    res.json(req.body);
});

// start server to listen
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});