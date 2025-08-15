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

// Chess Engine.
const chess = new Chess();

// Player Roles and Game State.
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

    if(!players.white){
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "W");
    }
    else if(!players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "B");
    }
    else{
        uniquesocket.emit("spectatorRole");
    }

    uniquesocket.on("disconnect", function(){
        
        if(uniquesocket.id === players.white){
            delete players.white;
        }

        else if(uniquesocket.id === players.black){
            delete players.black;
        }
    });

});




server.listen(8000, () => {
    console.log('Server is running on port 8000');
});

