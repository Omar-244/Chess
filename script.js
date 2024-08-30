const gameBoard = document.getElementById('gameboard');
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
    startPieces.forEach((piece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = piece;
        square.firstChild &&  square.firstChild.setAttribute('draggable',true)
        square.setAttribute('square-id', i);
        gameBoard.append(square);

        const row = Math.floor((63 - i) / 8) + 1;
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "white" : "blue");
        } else {
            square.classList.add(i % 2 === 0 ? "blue" : "white");
        }
        if (i <= 15){
            square.firstChild.firstChild.classList.add('black')
        }
        if (i >= 48){
            square.firstChild.firstChild.classList.add('red')
        }
    });
}

createBoard();

const allSquares = document.querySelectorAll('#gameboard .square');
allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
});

let startPositionId;
let draggedElement;

function dragStart(e) {
    draggedElement = e.target; // Set draggedElement to the target
    e.dataTransfer.setData('text/plain', null); // Required for dragstart to work in some browsers
}

function dragOver(e) {
    e.preventDefault(); // Allow dropping
    e.dataTransfer.dropEffect = 'move'; // Set drop effect to 'move'
}

function dragDrop(e) {
    e.stopPropagation(); // Prevent event bubbling
    const targetSquare = e.target.closest('.square');
    if (!targetSquare) return;

    const targetPiece = targetSquare.firstChild;
    const correctGo = draggedElement.firstChild.classList.contains(playerGo);
    const taken = targetPiece?.classList.contains('piece');
    const opponentGo = playerGo === 'red' ? 'black' : 'red';
    const takenByOpponent = targetPiece?.classList.contains(opponentGo);
    const valid = true; // Add your logic to determine if the move is valid

    if (correctGo) {
        if (takenByOpponent && valid) {
            targetSquare.append(draggedElement);
            targetPiece.remove();
            checkForWin();
            changePlayer();
            return;
        }
    }

    if (taken && !takenByOpponent) {
        infoDisplay.textContent = "You cannot go here!";
        setTimeout(() => infoDisplay.textContent = "", 2000);
        return;
    }

    if (valid) {
        targetSquare.append(draggedElement);
        checkForWin();
        changePlayer();
    }
}


function checkIfvalid(target){
const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
const startId = Number(startPostitionId)
const piece = draggedElement.id
switch(piece){
    case 'pawn':
        const starterRow = [8,9,10,11,12,13,14,15]
        if (starterRow.includes(startId) && startId + width * 2 === targetId || startId + width === targetId || startId + width -1 === targetId &&
    document.querySelector('[square-id = "${startId -1}"]').firstChild || !document.querySelector('[square-id = "${startId +1}"]').firstChild 
)
{
    return true
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
        // Diagonal moves (bottom-right)
        (startId + width + 1 === targetId &&
            !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||
        (startId + width * 2 + 2 === targetId &&
            !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild) ||
        (startId + width * 3 + 3 === targetId &&
            !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild) ||
        (startId + width * 4 + 4 === targetId &&
            !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild) ||
        (startId + width * 5 + 5 === targetId &&
            !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild) ||
        (startId + width * 6 + 6 === targetId &&
            !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild) ||
        (startId + width * 7 + 7 === targetId &&
            !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + width * 7 + 7}"]`).firstChild) ||

        // Diagonal moves (top-left)
        (startId - width - 1 === targetId &&
            !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||
        (startId - width * 2 - 2 === targetId &&
            !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild) ||
        (startId - width * 3 - 3 === targetId &&
            !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild) ||
        (startId - width * 4 - 4 === targetId &&
            !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild) ||
        (startId - width * 5 - 5 === targetId &&
            !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild) ||
        (startId - width * 6 - 6 === targetId &&
            !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild) ||
        (startId - width * 7 - 7 === targetId &&
            !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 7 - 7}"]`).firstChild) ||

        // Horizontal moves
        (startId + 1 === targetId &&
            !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
        (startId + 2 === targetId &&
            !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 2}"]`).firstChild) ||
        (startId + 3 === targetId &&
            !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 3}"]`).firstChild) ||
        (startId + 4 === targetId &&
            !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 4}"]`).firstChild) ||
        (startId + 5 === targetId &&
            !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 5}"]`).firstChild) ||
        (startId + 6 === targetId &&
            !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 5}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 6}"]`).firstChild) ||
        (startId + 7 === targetId &&
            !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 5}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 6}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId + 7}"]`).firstChild) ||

        // Vertical moves
        (startId - width === targetId &&
            !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||
        (startId - width * 2 === targetId &&
            !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild) ||
        (startId - width * 3 === targetId &&
            !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild) ||
        (startId - width * 4 === targetId &&
            !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild) ||
        (startId - width * 5 === targetId &&
            !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild) ||
        (startId - width * 6 === targetId &&
            !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild) ||
        (startId - width * 7 === targetId &&
            !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild &&
            !document.querySelector(`[square-id="${startId - width * 7}"]`).firstChild)
    ) {
        return true;
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
function changePlayer(){
    if (playerGo === "black"){
        reverseIds()
        playerGo = "red"
        playerDisplay.textContent = 'red'
    }
    else{
        revertIds()
        playerGo = "black"
        playerDisplay.textContent = "black"
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
function checkForWin() {
    const kings = Array.from(document.querySelectorAll('#king'));
    
    // Check if red player wins
    if (!kings.some(king => king.firstChild && king.firstChild.classList.contains('black'))) {
        infoDisplay.innerHTML = "Red Player wins!";
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => {
            if (square.firstChild) {
                square.firstChild.setAttribute('draggable', 'false');
            }
        });
    }

    // Check if black player wins
    if (!kings.some(king => king.firstChild && king.firstChild.classList.contains('red'))) {
        infoDisplay.innerHTML = "Black Player wins!";
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => {
            if (square.firstChild) {
                square.firstChild.setAttribute('draggable', 'false');
            }
        });
    }
}
