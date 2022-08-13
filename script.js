const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const finalMessageElement = document.getElementById('finalMessage');
const finalMessageText = document.querySelector('[final-message-text]');
const restartButton = document.getElementById("restartButton");
let turn; // x is o, 1 is x
const x_class = 'x';
const o_class = 'o';
const winning_combinatinos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
    turn = 1;
    cellElements.forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(o_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    })
    setBoardHoverClass();
    finalMessageElement.classList.remove('show');
}

function handleClick(e) {
    console.log("clicked");

    const cell = e.target;
    const currentClass = turn ? x_class : o_class;

    // make a move
    makeMove(cell, currentClass);
    // check win
    if (checkWin(currentClass)) {
        console.log(currentClass + " wins");
        finishGame(currentClass);
    }
    // check tie
    if(isTie()){
        finishGame(2);
    }
    // change turn
    changeTurn();
    setBoardHoverClass();
}

function makeMove(cell, currentClass) {
    cell.classList.add(currentClass);
}

function checkWin(currentClass) {
    return winning_combinatinos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })

}

function finishGame(winner){
    if (winner === 2)
    {
        finalMessageText.innerText = "It's a tie";
    }
    else
    {
        finalMessageText.innerText = winner + " wins";
    }
    finalMessageElement.classList.add('show');
}

function isTie(){
    // destructure the cellElements into array to use every method
    return [...cellElements].every(cell => { 
        return cell.classList.contains(x_class) || cell.classList.contains(o_class);
    })
}

function changeTurn() {
    turn = turn ? 0 : 1;
    console.log(turn + "'s turn");
}

function setBoardHoverClass() {
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    board.classList.add(turn ? x_class : o_class);
}

