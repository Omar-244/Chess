const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;
let playerGo = 'black'
playerDisplay.textContent = 'black'
const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
];

function createBoard() {
    startPieces.forEach((startPieces, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startPieces;
        square.firstChild?.setAttribute('draggable',true)
        square.setAttribute('square-id', i);
    
        gameBoard.append(square);

       const row = Math.floor((63 - i) / 8) + 1;
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown");
        } else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige");
        }
        if (i <= 15){
            square.firstChild.firstChild.classList.add('black')
        }
        if (i >= 48){
            square.firstChild.firstChild.classList.add('white')
        }
    });
}

createBoard();

const allSquares = document.querySelectorAll(".square");
allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
});

let startPositionId;
let draggedElement;

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target; // Set draggedElement to the target
    //e.dataTransfer.setData('text/plain', null); // Required for dragstart to work in some browsers
}

function dragOver(e) {
    e.preventDefault(); // Allow dropping
}
function dragDrop(e) {
    e.stopPropagation(); // Prevent event bubbling
    const correctGo = draggedElement.firstChild.classList.contains(playerGo);
    const valid = checkIfValid(e.target); // Pass the target to checkIfValid
    const opponentGo = playerGo === 'white' ? 'black' : 'white';
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo); // Check if it's the opponent's piece

    if (correctGo && valid) {
        if (takenByOpponent) {
            e.target.firstChild.remove(); // Remove the opponent's piece (not the square)
        }
        e.target.append(draggedElement); // Move the dragged piece to the new square
        checkForWin()
        changePlayer(); // Switch player turn
    } else {
        infoDisplay.textContent = "Invalid move!";
        setTimeout(() => infoDisplay.textContent = "", 2000);
    }
}

   
       function changePlayer(){
        if (playerGo === 'black'){
            reverseIds()
            playerGo = "white"
            playerDisplay.textContent = 'white'
        }
        else{
            revertIds()
            playerGo = "black"
            playerDisplay.textContent = 'black'
        }
       }

function reverseIds(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute('square-id', (width * width -1)-i))
}
function revertIds(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
    const startId = Number(startPositionId);
    const piece = draggedElement.id;
    console.log('targetId', targetId);
    console.log('startId', startId);
    console.log('piece', piece);
    // logic validation  here
    switch(piece) {
        case 'pawn':
            const starterRow = [48, 49, 50, 51, 52, 53, 54, 55]; // Assuming these are the rows where pawns start for black
            const forwardMove = startId + width === targetId; // Regular forward move
            const doubleMove = starterRow.includes(startId) && startId + width * 2 === targetId; // Double move from start position
            const captureLeft = startId + width - 1 === targetId && document.querySelector(`[square-id="${startId - 1}"]`)?.firstChild?.classList.contains(opponentGo);
            const captureRight = startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + 1}"]`)?.firstChild?.classList.contains(opponentGo);
    
            if (doubleMove || forwardMove || captureLeft || captureRight) {
                return true;
            }
            break;
    
        case 'knight':
            const knightMoves = [
                startId + width * 2 + 1,
                startId + width * 2 - 1,
                startId + width - 2,
                startId + width + 2,
                startId - width * 2 + 1,
                startId - width * 2 - 1,
                startId - width - 2,
                startId - width + 2
            ];
    
            if (knightMoves.includes(targetId)) {
                return true;
            }
            break;
            case 'bishop':
        if (
            startId + width + 1 === targetId || 
            startId + width * 2 + 2 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild ||
            startId + width * 3 + 3 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 + 2 }"]').firstChild ||
            startId + width * 4 + 4 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 + 3 }"]').firstChild||
            startId + width * 5 + 5 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 + 3 }"]').firstChild && !document.querySelector('[square-id="${startId + width * 4 + 4 }"]').firstChild ||
            startId + width * 6 + 6 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 + 3 }"]').firstChild && !document.querySelector('[square-id="${startId + width * 4 + 4 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 5 + 5 }"]').firstChild ||
            startId + width * 7 + 7 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 + 3 }"]').firstChild && !document.querySelector('[square-id="${startId + width * 4 + 4 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 5 + 5 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 6 + 6 }"]').firstChild ||
            // --
            startId - width - 1 === targetId || 
            startId - width * 2 - 2 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild ||
            startId - width * 3 - 3 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 - 2 }"]').firstChild ||
            startId - width * 4 - 4 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 - 3 }"]').firstChild||
            startId - width * 5 - 5 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 - 4 }"]').firstChild ||
            startId - width * 6 - 6 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 - 4 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 5 - 5 }"]').firstChild ||
            startId - width * 7 - 7 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 - 4 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 5 - 5 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 6 - 6 }"]').firstChild ||
            // --
            startId - width + 1 === targetId || 
            startId - width * 2 + 2 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild ||
            startId - width * 3 + 3 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 + 2 }"]').firstChild ||
            startId - width * 4 + 4 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 + 3 }"]').firstChild||
            startId - width * 5 + 5 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 + 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 + 4 }"]').firstChild ||
            startId - width * 6 + 6 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 + 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 + 4 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 5 + 5 }"]').firstChild ||
            startId - width * 7 + 7 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 + 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 + 4 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 5 + 5 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 6 + 6 }"]').firstChild ||


            //--
            startId + width - 1 === targetId || 
            startId + width * 2 - 2 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild ||
            startId + width * 3 - 3 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 - 2 }"]').firstChild ||
            startId + width * 4 - 4 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 - 3 }"]').firstChild||
            startId + width * 5 - 5 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 4 - 4 }"]').firstChild ||
            startId + width * 6 - 6 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 4 - 4 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 5 - 5 }"]').firstChild ||
            startId + width * 7 - 7 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 4 - 4 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 5 - 5 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 6 - 6 }"]').firstChild
        ) 
        {
            return true
        }
        break;
        case 'rook':
        if (
            startId + width === targetId ||
            startId + width * 2 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild ||
            startId + width * 3 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild && !document.querySelector('[square-id="${startId + width * 2}"]').firstChild ||
            startId + width * 4 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild && !document.querySelector('[square-id="${startId + width * 2}"]').firstChild && !document.querySelector('[square-id="${startId + width * 3}"]').firstChild ||
            startId + width * 5 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild && !document.querySelector('[square-id="${startId + width * 2}"]').firstChild && !document.querySelector('[square-id="${startId + width * 3}"]').firstChild && !document.querySelector('[square-id="${startId + width * 4}"]').firstChild ||
            startId + width * 6 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild && !document.querySelector('[square-id="${startId + width * 2}"]').firstChild && !document.querySelector('[square-id="${startId + width * 3}"]').firstChild && !document.querySelector('[square-id="${startId + width * 4}"]').firstChild && !document.querySelector('[square-id="${startId + width * 5}"]').firstChild ||
            startId + width * 7 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild && !document.querySelector('[square-id="${startId + width * 2}"]').firstChild && !document.querySelector('[square-id="${startId + width * 3}"]').firstChild && !document.querySelector('[square-id="${startId + width * 4}"]').firstChild && !document.querySelector('[square-id="${startId + width * 5}"]').firstChild && !document.querySelector('[square-id="${startId + width * 6}"]').firstChild ||
            // --
            startId - width === targetId ||
            startId - width * 2 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild ||
            startId - width * 3 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild && !document.querySelector('[square-id="${startId - width * 2}"]').firstChild ||
            startId - width * 4 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild && !document.querySelector('[square-id="${startId - width * 2}"]').firstChild && !document.querySelector('[square-id="${startId - width * 3}"]').firstChild ||
            startId - width * 5 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild && !document.querySelector('[square-id="${startId - width * 2}"]').firstChild && !document.querySelector('[square-id="${startId - width * 3}"]').firstChild && !document.querySelector('[square-id="${startId - width * 4}"]').firstChild ||
            startId - width * 6 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild && !document.querySelector('[square-id="${startId - width * 2}"]').firstChild && !document.querySelector('[square-id="${startId - width * 3}"]').firstChild && !document.querySelector('[square-id="${startId - width * 4}"]').firstChild && !document.querySelector('[square-id="${startId - width * 5}"]').firstChild ||
            startId - width * 7 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild && !document.querySelector('[square-id="${startId - width * 2}"]').firstChild && !document.querySelector('[square-id="${startId - width * 3}"]').firstChild && !document.querySelector('[square-id="${startId - width * 4}"]').firstChild && !document.querySelector('[square-id="${startId - width * 5}"]').firstChild && !document.querySelector('[square-id="${startId - width * 6}"]').firstChild ||

            //--
            startId + 1 === targetId ||
            startId + 2 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild ||
            startId + 3 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild ||
            startId + 4 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild ||
            startId + 5 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild && !document.querySelector('[square-id="${startId + 4}"]').firstChild ||
            startId + 6 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild && !document.querySelector('[square-id="${startId + 4}"]').firstChild && !document.querySelector('[square-id="${startId +  5}"]').firstChild ||
            startId + 7 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild && !document.querySelector('[square-id="${startId + 4}"]').firstChild && !document.querySelector('[square-id="${startId +  5}"]').firstChild && !document.querySelector('[square-id="${startId +  6}"]').firstChild ||
        
            //--
            startId - 1 === targetId ||
            startId - 2 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild ||
            startId - 3 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild ||
            startId - 4 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild ||
            startId - 5 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild && !document.querySelector('[square-id="${startId - 4}"]').firstChild ||
            startId - 6 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild && !document.querySelector('[square-id="${startId - 4}"]').firstChild && !document.querySelector('[square-id="${startId - 5}"]').firstChild ||
            startId - 7 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild && !document.querySelector('[square-id="${startId - 4}"]').firstChild && !document.querySelector('[square-id="${startId - 5}"]').firstChild && !document.querySelector('[square-id="${startId - 6}"]').firstChild
        )
        {
            return true
        }
        break;

        case 'queen':
            if (
                startId + width + 1 === targetId || 
                startId + width * 2 + 2 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 + 2 }"]').firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 + 3 }"]').firstChild||
                startId + width * 5 + 5 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 + 3 }"]').firstChild && !document.querySelector('[square-id="${startId + width * 4 + 4 }"]').firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 + 3 }"]').firstChild && !document.querySelector('[square-id="${startId + width * 4 + 4 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 5 + 5 }"]').firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector( '[square-id="${startId + width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 + 3 }"]').firstChild && !document.querySelector('[square-id="${startId + width * 4 + 4 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 5 + 5 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 6 + 6 }"]').firstChild ||
                // --
                startId - width - 1 === targetId || 
                startId - width * 2 - 2 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 - 2 }"]').firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 - 3 }"]').firstChild||
                startId - width * 5 - 5 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 - 4 }"]').firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 - 4 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 5 - 5 }"]').firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector( '[square-id="${startId - width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 - 4 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 5 - 5 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 6 - 6 }"]').firstChild ||
                // --
                startId - width + 1 === targetId || 
                startId - width * 2 + 2 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 + 2 }"]').firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 + 3 }"]').firstChild||
                startId - width * 5 + 5 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 + 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 + 4 }"]').firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 + 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 + 4 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 5 + 5 }"]').firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector( '[square-id="${startId - width + 1}"]').firstChild && !document.querySelector( '[square-id="${startId - width * 2 + 2 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 3 + 3 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 4 + 4 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 5 + 5 }"]').firstChild && !document.querySelector( '[square-id="${startId - width * 6 + 6 }"]').firstChild ||
    
    
                //--
                startId + width - 1 === targetId || 
                startId + width * 2 - 2 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 - 2 }"]').firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 - 3 }"]').firstChild||
                startId + width * 5 - 5 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 4 - 4 }"]').firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 4 - 4 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 5 - 5 }"]').firstChild ||
                startId + width * 7 - 7 === targetId && !document.querySelector( '[square-id="${startId + width - 1}"]').firstChild && !document.querySelector( '[square-id="${startId + width * 2 - 2 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 3 - 3 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 4 - 4 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 5 - 5 }"]').firstChild && !document.querySelector( '[square-id="${startId + width * 6 - 6 }"]').firstChild ||
            //--
            startId + width === targetId ||
            startId + width * 2 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild ||
            startId + width * 3 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild && !document.querySelector('[square-id="${startId + width * 2}"]').firstChild ||
            startId + width * 4 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild && !document.querySelector('[square-id="${startId + width * 2}"]').firstChild && !document.querySelector('[square-id="${startId + width * 3}"]').firstChild ||
            startId + width * 5 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild && !document.querySelector('[square-id="${startId + width * 2}"]').firstChild && !document.querySelector('[square-id="${startId + width * 3}"]').firstChild && !document.querySelector('[square-id="${startId + width * 4}"]').firstChild ||
            startId + width * 6 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild && !document.querySelector('[square-id="${startId + width * 2}"]').firstChild && !document.querySelector('[square-id="${startId + width * 3}"]').firstChild && !document.querySelector('[square-id="${startId + width * 4}"]').firstChild && !document.querySelector('[square-id="${startId + width * 5}"]').firstChild ||
            startId + width * 7 === target && !document.querySelector('[square-id="${startId + width}"]').firstChild && !document.querySelector('[square-id="${startId + width * 2}"]').firstChild && !document.querySelector('[square-id="${startId + width * 3}"]').firstChild && !document.querySelector('[square-id="${startId + width * 4}"]').firstChild && !document.querySelector('[square-id="${startId + width * 5}"]').firstChild && !document.querySelector('[square-id="${startId + width * 6}"]').firstChild ||
            // --
            startId - width === targetId ||
            startId - width * 2 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild ||
            startId - width * 3 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild && !document.querySelector('[square-id="${startId - width * 2}"]').firstChild ||
            startId - width * 4 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild && !document.querySelector('[square-id="${startId - width * 2}"]').firstChild && !document.querySelector('[square-id="${startId - width * 3}"]').firstChild ||
            startId - width * 5 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild && !document.querySelector('[square-id="${startId - width * 2}"]').firstChild && !document.querySelector('[square-id="${startId - width * 3}"]').firstChild && !document.querySelector('[square-id="${startId - width * 4}"]').firstChild ||
            startId - width * 6 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild && !document.querySelector('[square-id="${startId - width * 2}"]').firstChild && !document.querySelector('[square-id="${startId - width * 3}"]').firstChild && !document.querySelector('[square-id="${startId - width * 4}"]').firstChild && !document.querySelector('[square-id="${startId - width * 5}"]').firstChild ||
            startId - width * 7 === target && !document.querySelector('[square-id="${startId - width}"]').firstChild && !document.querySelector('[square-id="${startId - width * 2}"]').firstChild && !document.querySelector('[square-id="${startId - width * 3}"]').firstChild && !document.querySelector('[square-id="${startId - width * 4}"]').firstChild && !document.querySelector('[square-id="${startId - width * 5}"]').firstChild && !document.querySelector('[square-id="${startId - width * 6}"]').firstChild ||

            //--
            startId + 1 === targetId ||
            startId + 2 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild ||
            startId + 3 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild ||
            startId + 4 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild ||
            startId + 5 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild && !document.querySelector('[square-id="${startId + 4}"]').firstChild ||
            startId + 6 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild && !document.querySelector('[square-id="${startId + 4}"]').firstChild && !document.querySelector('[square-id="${startId +  5}"]').firstChild ||
            startId + 7 === target && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild && !document.querySelector('[square-id="${startId + 4}"]').firstChild && !document.querySelector('[square-id="${startId +  5}"]').firstChild && !document.querySelector('[square-id="${startId +  6}"]').firstChild ||
        
            //--
            startId - 1 === targetId ||
            startId - 2 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild ||
            startId - 3 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild ||
            startId - 4 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild ||
            startId - 5 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild && !document.querySelector('[square-id="${startId - 4}"]').firstChild ||
            startId - 6 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild && !document.querySelector('[square-id="${startId - 4}"]').firstChild && !document.querySelector('[square-id="${startId - 5}"]').firstChild ||
            startId - 7 === target && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild && !document.querySelector('[square-id="${startId - 4}"]').firstChild && !document.querySelector('[square-id="${startId - 5}"]').firstChild && !document.querySelector('[square-id="${startId - 6}"]').firstChild
            ) 
            {
                return true
            }
            break;
            case 'king':
            if (
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width -1  === targetId ||
                startId + width +1  === targetId ||
                startId - width -1  === targetId ||
                startId - width +1  === targetId
              )
              {
                return true
              }
              break;

    }

      }

      function checkForWin() {
        const kings = Array.from(document.querySelectorAll('#king'));
        
        // Check if red player wins
        if (!kings.some(king => king.firstChild && king.firstChild.classList.contains('white'))) {
            infoDisplay.innerHTML = "Black Player wins!";
            const allSquares = document.querySelectorAll('.square');
            allSquares.forEach(square => {
                if (square.firstChild) {
                    square.firstChild.setAttribute('draggable', 'false');
                }
            });
        }
    
        // Check if black player wins
        if (!kings.some(king => king.firstChild && king.firstChild.classList.contains('black'))) {
            infoDisplay.innerHTML = " White Player wins!";
            const allSquares = document.querySelectorAll('.square');
            allSquares.forEach(square => {
                if (square.firstChild) {
                    square.firstChild.setAttribute('draggable', 'false');
                }
            });
        }
    }

    


 