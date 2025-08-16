// Basic Socket IO setup
// iss Line Ke Code Se Jitne Bhe User Join Honge Frontend Se Backend Mein Request Jayegi.

const socket = io();

// Abhe Hum Ye Frontend Pe Bhejenge.

const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;


const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement('div');
            squareElement.classList.add(
                "square",
                (rowindex + squareindex) % 2 === 0 ? "light" : "dark",
            );
            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if(square) {
                const pieceElement = document.createElement("div"); 
                pieceElement.classList.add('piece', square.color === 'W' ? "white" : "black");
            }
        });
    });
};


const handelMove = (square, piece) => {

}

// For The Shape And Structure Of Chess Piece.
const getPieceUnicode = (piece) => {

}

renderBoard();