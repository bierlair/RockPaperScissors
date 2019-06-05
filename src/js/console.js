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

    process.stdin.on('keypress', listener)
    console.clear()
    console.log('=====================')
    console.log('Select your Game Mode')
    console.log('=====================')
    console.log()
    gameType.forEach((value, key) => { console.log(`${key} = ${value}`)})
}


async function listener(key, data) {

    if (data.ctrl && data.name === 'c') {
        console.log("Thank you for playing! Have a nice day.")
        process.exit()
    } else {
        let mode
        console.log()
        console.log("Selection:", key)

        switch(key.toUpperCase()) {
            case 'C':
                const gameChoices = [
                    choices[Math.floor(Math.random() * choices.length)],
                    choices[Math.floor(Math.random() * choices.length)]
                ]

                console.log()
                console.log("Computers only - not a place for humans!")
                console.log()
                console.log("Computer 1:", gameChoices[0])
                console.log("Computer 2:", gameChoices[1])
                console.log()

                play('C', gameChoices[0], gameChoices[1])
                break

            case 'H':
                process.stdin.removeListener('keypress', listener)
                console.log()
                console.log("Human it is - Let's get ready to rumble")
                console.log()

                choices.map((choice, index) => console.log(`${index} = ${choice}`))
                process.stdin.on('keypress', listener2)
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
	const result = game.play(duel)
	console.log("RESULT:", duel[result])
}

async function listener2(key, data) {
    
    if(choices[key]) {
        process.stdin.removeListener('keypress', listener2)
        //process.stdin.off('keypress')
        const user = choices[key]
        const computer = choices[Math.floor(Math.random() * choices.length)]
        console.log("Human Choice:    ", user)
        console.log("Computer Choice :", computer)
        play('H', user, computer)
        process.stdin.on('keypress', listener)
    
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
