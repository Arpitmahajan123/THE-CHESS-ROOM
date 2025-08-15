const express = require('express');
const socket = require('socket.io');
const http = require('http');
const {Chess} = require('chess.js');
const path = require('path');

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = http.createServer(app);
const io = socket(server)


const chess = new Chess();

let players = {};
let currentPlayer = 'W';

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
    res.render('index', {title : "Chess Game"});
});

// Frontend Se Request Aayegi Backend Mei Isske Pass [io.on].
io.on("connection", function(uniquesocket){
    console.log("New player connected");
});






server.listen(8000, () => {
    console.log('Server is running on port 8000');
});



