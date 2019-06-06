import { Game } from './game'
const readline = require('readline')

const game = new Game()

game.learn('rock', 'scissors')
game.learn('paper', 'rock')
game.learn('scissors', 'paper')

const choices = game.choices()
 
const gameType = new Map()
gameType.set('C', 'Computer vs Computer')
gameType.set('H', 'Human vs Computer')

start()

function start() {

    process.stdin.on('keypress', gameModeListener)
    console.clear()
    console.log('=====================')
    console.log('Select your Game Mode')
    console.log('=====================')
    console.log()
    gameType.forEach((value, key) => { console.log(`${key} = ${value}`)})
}


async function gameModeListener(key, data) {

    if (data.ctrl && data.name === 'c') {
        console.log("Thank you for playing! Have a nice day.")
        process.exit()
    } else {
        
        console.log()
        console.log("Selection:", key)

        switch(key.toUpperCase()) {
            case 'C':
                //process.stdin.removeAllListeners('keypress')

                const player1 = game.makeRandomChoice()
                const player2 = game.makeRandomChoice()
                
                console.clear()
                console.log("Computers only - not a place for humans!")
                console.log()
                console.log("Computer 1:", player1.toUpperCase())
                console.log("Computer 2:", player2.toUpperCase())
                console.log()

                const result = play('C', player1, player2)

                console.log("---------------------------")
                console.log("Game Outcome:   ", result.outcome)
                result.winner && console.log("Game Winner:    ", result.winner)
                console.log("---------------------------")
        
                break

            case 'H':
                process.stdin.removeAllListeners('keypress')
                console.clear()
                console.log("Human it is - Let's get ready to rumble")
                console.log()
                console.log("Choose your weapon:")
                console.log()
        
                choices.map((choice, index) => console.log(`${index} = ${choice.toUpperCase()}`))
                process.stdin.on('keypress', userSelectionListener)
                break

            default:
                console.log(`> ${key} < is not defined! Please try again.`)
        }
    }
}

function play(mode, player1, player2) {

    const duel = [
		{
            type: mode === 'C' ? 'Computer 1' : 'Human',
            play: player1
        },
		{
            type: mode === 'C' ? 'Computer 2' : 'Computer',
            play: player2
        }
	]
	return game.play(duel)
    //console.log("RESULT:", result)
}

async function userSelectionListener(key, data) {
    
    if(choices[key]) {
        process.stdin.removeAllListeners('keypress')

        const human = choices[key]
        const computer = choices[Math.floor(Math.random() * choices.length)]
        console.log()
        console.log("Human:            ", human.toUpperCase())
        console.log("Computer:         ", computer.toUpperCase())
        console.log()

        const result = play('H', human, computer)

        console.log("---------------------------")
        console.log("Game Outcome:   ", result.outcome)
        result.winner && console.log("Game Winner:    ", result.winner)
        console.log("---------------------------")
        
        process.stdin.on('keypress', gameModeListener)
    }
}

async function restartListener(key, data) {
    
    switch(key.toUpperCase()) {

        case 'R':
            console.log("RESTART")
            break

        case 'Q':
            console.log("QUIT")
            break
    }
}

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
