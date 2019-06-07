import { Game } from './game'
const readline = require('readline')
const uuid = require('uuid')

const game = new Game()
game.learn('R', 'rock', 'scissors')
game.learn('P', 'paper', 'rock')
game.learn('S', 'scissors', 'paper')

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

function makePlayer(name, choice) {
	return { id: uuid(), name, choice }
}

function printOutcome(player1, player2, result) {
	const outcome = result ? 'Winner' : 'Tie'
	const winner = result ? (player1.id === result ? player1.name : player2.name) : 'Nobody'

	console.log('---------------------------')
	console.log('Game Outcome:   ', outcome)
	console.log('Game Winner:    ', winner)
	console.log('Total rounds:   ', game.rounds)
	console.log('---------------------------')
}

function printPlayer(player, winnerId) {
	const spaceWidth = ' '.repeat(14 - player.name.length)
	const winnerBanner = winnerId === player.id ? '     <=== WINNER !!!' : ''
	const choice = player.choice.toUpperCase()

	const message = `${player.name}: ${spaceWidth} ${choice} ${winnerBanner}`
	console.log(message)
}

function prepareComputerMode() {
	game.setMode('C')
	playComputerMode()
}

function prepareHumanMode() {
	game.setMode('H')
	process.stdin.removeAllListeners('keypress')
	console.clear()
	console.log('Choose your weapon:')
	console.log()

	game.choices.map((choice, index) => console.log(`${index} = ${choice.toUpperCase()}`))
	process.stdin.on('keypress', userSelectionListener)
}

function playComputerMode() {
	const player1 = makePlayer('Computer 1', game.makeRandomChoice())
	const player2 = makePlayer('Computer 2', game.makeRandomChoice())

	console.clear()
	console.log('Computers only')
	console.log()
	play(player1, player2)
	howToProceed()
}

function playHumanMode(choice) {
	const player1 = makePlayer('Human', choice)
	const player2 = makePlayer('Computer', game.makeRandomChoice())

	console.clear()
	console.log('Human vs. Computer')
	console.log()
	play(player1, player2)
	howToProceed()
}

function play(player1, player2) {
	const result = game.play(player1, player2)

	printPlayer(player1, result)
	printPlayer(player2, result)
	console.log()
	printOutcome(player1, player2, result)
}

function howToProceed() {
	process.stdin.removeAllListeners('keypress')
	console.log()
	console.log('What next?')
	console.log()
	console.log('R = Retry - Play again (same mode)')
	console.log('M = Main Menu')
	console.log('Q = Quit')
	console.log()

	process.stdin.on('keypress', restartListener)
}

function endGame() {
	const pluralize = (count, word, plural = word + 's') => {
		return [1, -1].includes(count) ? word : plural
	}

	console.log()
	console.log('Thank you for playing!')
	console.log(`You have played ${game.rounds} ${pluralize(game.rounds, 'round')}. Have a nice day.`)
	console.log()
	process.exit()
}

async function gameModeListener(key, data) {
	if (data.ctrl && data.name === 'c') {
		endGame()
	} else {
		console.log()
		console.log('Selection:', key)

		switch (key.toUpperCase()) {
			case 'C':
				prepareComputerMode()
				break

			case 'H':
				prepareHumanMode()
				break

			default:
				console.log(`> ${key} < is not defined! Please try again.`)
		}
	}
}

async function userSelectionListener(key, data) {
	if (data.ctrl && data.name === 'c') {
		endGame()
	} else if (game.choices[key]) {
		process.stdin.removeAllListeners('keypress')
		playHumanMode(game.choices[key])
		process.stdin.on('keypress', gameModeListener)
	}
}

async function restartListener(key, data) {
	if (data.ctrl && data.name === 'c') {
		endGame()
	} else {
		switch (key.toUpperCase()) {
			case 'R':
				game.getMode() === 'C' ? prepareComputerMode() : prepareHumanMode()
				break

			case 'H':
				start()
				break

			case 'Q':
				endGame()
				break
		}
	}
}

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
