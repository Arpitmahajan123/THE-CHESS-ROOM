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
                pieceElement.classList.add(
                    'piece', 
                    square.color === 'w' ? "white" : "black"
                );

                pieceElement.innerHTML = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (event) => {
                    if(pieceElement.draggable){
                        draggedPiece = pieceElement;
                        sourceSquare = {row: rowindex, col: squareindex};
                        event.dataTransfer.setData("text/plain", "");

                    }
                });

                pieceElement.addEventListener("dragend", (event) => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", function(event) {
                event.preventDefault();
            });


            squareElement.addEventListener("drop", (event) => {
                event.preventDefault();
                if(draggedPiece) {
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),

                    };

                    handelMove(sourceSquare, targetSource);
                }
            });

            boardElement.appendChild(squareElement);

        });
    });

};


const handleMove = (source, target) => {
    const move = chess.move({
        from: chess.SQUARES[source.row * 8 + source.col],
        to: chess.SQUARES[target.row * 8 + target.col],
        promotion: 'q' // Always promote to queen for simplicity
    });

    if (move) {
        renderBoard();
        // Here you would typically emit the move to the server
        // socket.emit('move', move);
    }

    draggedPiece = null;
    sourceSquare = null;
};

// For The Shape And Structure Of Chess Piece.
const getPieceUnicode = (piece) => {
    const unicodePieces = {
            'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
            'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
        };
    
    return unicodePieces[piece.type] || "";

}


socket.on("playerRole", function(role) {
    playerRole = role;
    console.log("Player Role: ", role);
    renderBoard();
});

socket.on("spectatorRole", function() {
    playerRole = null;
    console.log("Spectator Role");
    renderBoard();
});

socket.on("boardState", function(fen) {
    chess.load(fen);
    renderBoard();
});

socket.on("move", function(move) {
    chess.move(move);
    renderBoard();
});

renderBoard();
