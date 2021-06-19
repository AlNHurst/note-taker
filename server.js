// require dependencies
const path = require('path');
const fs = require('fs');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

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
    const data = fs.readFileSync('./db/db.json', 'utf-8');
    const parseData = JSON.parse(data);
    res.json(parseData);
});

// post route to retrieve note and save; 
// using uuidv4 function to give each note a unique ID so it can be retrieved when the user clicks on it.
app.post('/api/notes', (req, res) => {
    const body = {...req.body, id: uuidv4() }; 
    const data = fs.readFileSync('./db/db.json', 'utf-8');
    const parseData = JSON.parse(data);
    fs.writeFileSync('./db/db.json', JSON.stringify(parseData.concat(body)), 'utf-8');
    res.send(body);
    console.log(body);
});

// start server to listen
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});