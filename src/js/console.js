import { Game } from './game'
const readline = require('readline')
const uuid = require('uuid')

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
	gameType.forEach((value, key) => {
		console.log(`${key} = ${value}`)
	})
}

async function gameModeListener(key, data) {
	if (data.ctrl && data.name === 'c') {
		console.log('Thank you for playing! Have a nice day.')
		process.exit()
	} else {
		console.log()
		console.log('Selection:', key)

		switch (key.toUpperCase()) {
			case 'C':
				playComputerMode()
				break

			case 'H':
				prepareHumanMode()
				break

			default:
				console.log(`> ${key} < is not defined! Please try again.`)
		}
	}
}

function makePlayer(name, choice) {
	return { id: uuid(), name, choice }
}

function printOutcome(player1, player2, result) {

	const outcome = result ? 'Winner' : 'Tie'
	const winner = result ? (player1.id === result ? player1.name : player2.name) : 'Nobody'

	console.log('---------------------------')
	console.log('Game Outcome:   ', outcome)
	console.log('Game Winner:    ', winner)
	console.log('---------------------------')
}

function printPlayer(player, winnerId) {
	const spaceWidth = ' '.repeat(14 - player.name.length)
	const winnerBanner = winnerId === player.id ? '     <=== WINNER !!!' : ''
	const choice = player.choice.toUpperCase()

	const message = `${player.name}: ${spaceWidth} ${choice} ${winnerBanner}`
	console.log(message)
}

function prepareHumanMode() {
	process.stdin.removeAllListeners('keypress')
	console.clear()
	console.log('Choose your weapon:')
	console.log()

	choices.map((choice, index) => console.log(`${index} = ${choice.toUpperCase()}`))
	process.stdin.on('keypress', userSelectionListener)
}

function playHumanMode(choice) {
	const player1 = makePlayer('Human', choice)
	const player2 = makePlayer('Computer', game.makeRandomChoice())

	console.clear()
	console.log('Human vs. Computer')
	console.log()
	play(player1, player2)
}

function playComputerMode() {
	const player1 = makePlayer('Computer 1', game.makeRandomChoice())
	const player2 = makePlayer('Computer 2', game.makeRandomChoice())

	console.clear()
	console.log('Computers only')
	console.log()
	play(player1, player2)
}

function play(player1, player2) {
	const result = game.play(player1, player2)

	printPlayer(player1, result)
	printPlayer(player2, result)
	console.log()
	printOutcome(player1, player2, result)
}

async function userSelectionListener(key, data) {
	if (choices[key]) {
		process.stdin.removeAllListeners('keypress')
		playHumanMode(choices[key])
		process.stdin.on('keypress', gameModeListener)
	}
}

async function restartListener(key, data) {
	switch (key.toUpperCase()) {
		case 'P':
			console.log('PLAY AGAIN')
			break

		case 'H':
			console.log('HOME')
			start()
			break
	
		case 'Q':
			console.log('QUIT')
			break
	}
}

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
