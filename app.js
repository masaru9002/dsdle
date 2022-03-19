const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

var x = setInterval(function() {
    var now = new Date();
    var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0) - now;
    if (millisTill10 < 0) {
        //millisTill10 += 86400000;
        millisTill10 += 43200000; 
    }

document.getElementById("timer").innerHTML = msToTime(millisTill10)
setTimeout(function(){
    resetGameState()
    updateWordIndex()
}, millisTill10);
})

document.addEventListener("DOMContentLoaded", () => {
    initLocalStorage();
    loadLocalStorage();
})

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
  }

let currentWordIndex = 0
const words = [
    "KAELI", "GTRAP", "MONTY", "VOLTA", "RENUU", "REKKU", "SERPY", "TSPIN", "VINCE", "DRAGO", "MONTY", "CROSS", "SNIFF",
    "CUNNY", "WANGY", "PUSSY", "BOOBS", "VENTI", "ASIAN", "CHINA", "DSDLE", "DAWWW", "GATOR", "PNIXZ", "SONGS", "HONEY",
    "HANOI", "HOCHI", "RITMO", "MADAM", "KKKKK", "PORNO", "BEATS", "SUWAK", "SKULL", "CLEAR", "SUSSY", "COVID", "COCKS",
    "BALLS", "SLURP", "YOUMU", "WHITE", "BLACK", "WOMAN", "CHICA", "XGIFS", "HORNY", "TAROT", "OUIJA", "DOTSP", "PUBIC",
    "SORRT", "REIMU", "SYURI", "MOVIE", "TULIA", "ALICE", "QURAN", "BIBLE", "MANKO", "RAPER", "CHUOT", "REDOX", "OKINA",
    "GANYU", "EAGLE", "FLUSH", "ALLIN", "IMAGE", "VIDEO", "UOHHH", "TWICE", "JIMIN", "CATCH", "VANNY", "AFTON", "ALLAH",
    "DEATH", "MOMMY", "DADDY", "REMIX", "NIVEA", "CIRNO", "CAKKE", "SCARY", "TRAZE", "MIKEL", "BULGE", "AHHHH", "POLLO",
    "VIRUS", "TWINS", "OBAKE", "MIMIC", "PIANO", "DEMON", "ENDER", "AYAKA", "JUNKO", "UNCHI", "UPTOU", "DREAM", "AJFJS",
    "NIGGA", "JOOBY", "SHAPE", "ZEDGE", "AIISH", "QUANG"
  ]
let wordle = Math.floor(Math.random()*words.length)

document.addEventListener("keydown", handleKeyPress)

function initLocalStorage() {
    const storedCurrentWordIndex =  window.localStorage.getItem('currentWordIndex')
    if(!storedCurrentWordIndex) {
        window.localStorage.setItem('currentWordIndex', currentWordIndex)
    } else {
    currentWordIndex = Number(storedCurrentWordIndex)
    wordle = words[currentWordIndex]
    }
}

function loadLocalStorage() {
    currentWordIndex = Number(window.localStorage.getItem('currentWordIndex')) || currentWordIndex
    currentRow = Number(window.localStorage.getItem('currentRow')) || currentRow
    isGameOver = Number(window.localStorage.getItem('isGameOver')) || isGameOver
    wordle = words[currentWordIndex]
    const storedTileContainer = window.localStorage.getItem("tileContainer")
    if (storedTileContainer) {
    document.querySelector(".tile-container").innerHTML = storedTileContainer
    }
    const storedKeyboardContainer = window.localStorage.getItem("keyboardContainer")
    if (storedKeyboardContainer) {
    document.querySelector(".key-container").innerHTML = storedKeyboardContainer
    const keyrefresh = document.querySelector(".key-container")
    keyrefresh.innerHTML = '';
    keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})
    }
    if (isGameOver==1) {
        document.removeEventListener("keydown", handleKeyPress)
        document.getElementById("ENTER").disabled = true;
    }
}

function updateWordIndex() {
    window.localStorage.setItem('currentWordIndex', Math.floor(Math.random()*words.length));
}

document.onkeydown = function(e) {
    if(event.keyCode == 123) {
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){
        return false;
        }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
    return false;
    }
    }

function resetGameState() {
        window.localStorage.removeItem("currentWordIndex")
        window.localStorage.removeItem("keyboardContainer")
        window.localStorage.removeItem("tileContainer")
        window.localStorage.removeItem("isGameOver")
        window.localStorage.removeItem("currentRow")
    }

function updateTotalGames() {
    const totalGames = window.localStorage.getItem("totalGames") || 0
    window.localStorage.setItem("totalGames", Number(totalGames) + 1)
}

function gameWon() {
    const totalWins = window.localStorage.getItem('totalWins') || 0
    window.localStorage.setItem('totalWins', Number(totalWins) + 1);
    const currentStreak = window.localStorage.getItem('currentStreak') || 0
    window.localStorage.setItem('currentStreak', Number(currentStreak) + 1)
}

function gameLost() {
    window.localStorage.setItem("currentStreak", 0)
}

function updateStats() {
    const currentStreak = window.localStorage.getItem('currentStreak')
    const totalWins = window.localStorage.getItem('totalWins')
    const totalGames = window.localStorage.getItem("totalGames")

    document.getElementById('total-played').textContent = totalGames
    document.getElementById('total-wins').textContent = totalWins
    document.getElementById('current-streak').textContent = currentStreak

    const winPercent = ((totalWins / totalGames)*100).toFixed(2)
    document.getElementById("win-percent").textContent = winPercent
}

//const wordle = 'MONTY'
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'DELETE',
]
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]
let currentRow = 0
let currentTile = 0
let isGameOver = 0

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        if(isGameOver == 0) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        }
        }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

function handleKeyPress(e) {
    if (e.key == "Backspace") {
        deleteLetter()
        return }

    if (e.key == "Enter") {
        if (currentTile > 4) {
            checkRow()
            return } else {
            showMessage('thats not 5 letters 😡😡')
                return }
    }
    if (e.key.match(/^[a-z]$/)) {
        addLetter(e.key.toUpperCase())
        return
    }
}

const checkRow = () => {
    if (currentTile > 4) {
        const guess = guessRows[currentRow].join('')
        if (words.includes(guess))
        {
            flipTile()
        } else {
            showMessage('invalid!!!!!!')
            return
        }
        if (wordle == guess) {
            showMessage('your did it GGGGGGGG')
            isGameOver++
            document.getElementById("ENTER").disabled = true;
            document.removeEventListener("keydown", handleKeyPress)
            gameWon()
            updateTotalGames()
            setTimeout(function(){
                resultsToggle()
                dimmerToggle()
            }, 2000);
            return
        } else {
            if (currentRow >= 5) {
                isGameOver++
                showMessage('lol skill issue (the word is ' + wordle + ')')
                gameLost()
                updateTotalGames()
                document.removeEventListener("keydown", handleKeyPress)
                return 
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            } 
        }
    }
}

const handleClick = (letter) => {
    if (letter === 'DELETE') {
        if (currentRow < 5 && !(wordle == guessRows[currentRow].join(''))) {
        deleteLetter()
        return } else return
    }
    if (letter === 'ENTER') {
        if (currentTile > 4) {
            checkRow()
            return } else {
            showMessage('thats not 5 letters 😡😡')
                return }
        }
    addLetter(letter)
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 5000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter) 
    key.classList.add(color)
    preserveGameState()
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'gray-overlay' })
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 510 * index)
    })

}

function preserveGameState() {
    const keyboardContainer = document.querySelector('.key-container')
    window.localStorage.setItem('keyboardContainer', keyboardContainer.innerHTML) 
    const tileContainer = document.querySelector('.tile-container')
    window.localStorage.setItem('tileContainer', tileContainer.innerHTML)
    window.localStorage.setItem('currentRow', currentRow)
    window.localStorage.setItem('isGameOver', isGameOver)
}
