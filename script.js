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

const allSquares = document.querySelectorAll(gameBoard .square)
allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('dragdrop', dragDrop)
})
let startPostionId
let draggedElement

function dragStart (e){
    startPostionId = e.target.parentNode.getAttribute(square-id)

}
function dragOver (e){
 e.preventDefault   
}

function dragDrop (e){
e.stopPropagation()
const correctGo = draggedElement.firstChild.classList.contains(playerGo)
const taken = e.target.classList.contains('piece')
const opponentGo = playerGo === 'red' ? 'black' : 'white'
const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

if(correctGo){
    if(takenByOpponent && valid){
        e.target.parentNode.append(draggedElement)
        e.target.remove()
        checkForWin
        changePlayer()
        return
    }
}
if(taken && !takenByOpponent){
    infoDisplay.textContent = "you cannot go here!"
    setTimeout(() => infoDisplay.textContent = "",2000)
    return
}
if (valid){
    e.target.append(draggedElement)
    checkForWin
    changePlayer()
    return
}
//e.target.parentNode.append(draggedElement)
//e.target.remove()

}

function checkIfvalid(target){
const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
const startId = Number(startPostionId)
switch(){
    case 'pawn':
        const starterRow = [8,9,10,11,12,13,14,15]
        if (starterRow.includes(startId) && startId + width * 2 === targetId || startId + width === targetId || startId + width -1 === targetId &&
    document.querySelector('[square-id = "${startId -1}"]').firstChild || !document.querySelector('[square-id = "${startId +1}"]').firstChild 
)
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
       

        case: 'queen'
    if(
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

      case: 'king'

      if (
        startId + 1 === targetId ||
        startId - 1 === targetId ||
        startId + width === targetId ||
        startId - width === targetId ||
        startId + width -1 -  === targetId ||
        startId + width +1  === targetId ||
        startId - width -1  === targetId ||
        startId - width +1  === targetId
      )
      {
        return true
      }
      break;
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
function checkForWin(){
    const kings = Array.from(document.querySelectorAll('#king'))
    if(!kings.some(king => king.firstChild.classList.contains('black'))){
        infoDisplay.innerHTML = "Red Player wins!"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => square.firstChild? setAttribute('draggable, false'))
    }

    if(!kings.some(king => king.firstChild.classList.contains('red'))){
        infoDisplay.innerHTML = "Black Player wins!"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => square.firstChild? setAttribute('draggable, false'))
    }
}