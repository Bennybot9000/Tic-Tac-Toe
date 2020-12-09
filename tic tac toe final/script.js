//setting the vairables
const xClass = 'x'
const oClass = 'circle'
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[valueWinningMessage]')
const circleTurnIndicator = document.getElementById('title2')
let circleTurn

//let the game commence
BeginGame()

function BeginGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.addEventListener('click', Click, { once: true })
  })
  circleTurnIndicator.innerHTML = (`${circleTurn ? "O's" : "X's"} turn`)
}

//adding the click function
function Click(e) {
  const cell = e.target
  const currentClass = circleTurn ? oClass : xClass
  Mark(cell, currentClass)
  if (checkWin(currentClass)) {
    GameOver(false)
  } else if (Draw()) {
    GameOver(true)
  } else {
    switchTurns()
  }
}

//checking if the game is over
function GameOver(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`
  }
  winningMessageElement.classList.add('show')
}

//checking if the game is a draw
function Draw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass)
  })
}

//adding the current class
function Mark(cell, currentClass) {
  cell.classList.add(currentClass)
}

//switching turns
function switchTurns() {
  circleTurn = !circleTurn
  circleTurnIndicator.innerHTML = (`${circleTurn ? "O's" : "X's"} turn`)
}

//checking if someone won
function checkWin(currentClass) {
  return winningPatterns.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}