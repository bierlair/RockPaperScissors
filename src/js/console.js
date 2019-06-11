import { Game } from './game'
import { Dialog } from './console/dialog'

const game = new Game()

const dialog = new Dialog()

start()

async function start() {
	const gameType = new Map()

	gameType.set('C', {
		title: 'Computer vs Computer',
		execute: prepareComputerMode
	})

	gameType.set('H', {
		title: 'Human vs Computer',
		execute: prepareHumanMode
	})

	dialog.showGameModes(gameType)
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

async function prepareComputerMode() {
	game.setMode('C')
	playComputerMode()
}

async function prepareHumanMode() {
	game.setMode('H')
	try {
		const weapon = await dialog.showWeapons(game.choices)
		playHumanMode(game.choices[weapon])
	} catch {
		endGame()
	}
}

function playComputerMode() {
	const player1 = game.makePlayer('Computer 1', game.makeRandomChoice())
	const player2 = game.makePlayer('Computer 2', game.makeRandomChoice())
	play('**** Computers Duel', player1, player2)
}

function playHumanMode(choice) {
	const player1 = game.makePlayer('Human', choice)
	const player2 = game.makePlayer('Computer', game.makeRandomChoice())
	play('**** Human vs. Computer Showdown', player1, player2)
}

async function play(title, player1, player2) {
	const result = game.play(player1, player2)

	console.clear()
	console.log(title)
	console.log()

	printPlayer(player1, result)
	printPlayer(player2, result)

	console.log()
	printOutcome(player1, player2, result)

	console.log()

	const proceedType = new Map()
	proceedType.set('R', {
		title: 'Retry - Play again (same mode)',
		execute: game.getMode() === 'C' ? prepareComputerMode : prepareHumanMode
	})

	proceedType.set('M', {
		title: 'Main Menu',
		execute: start
	})

	proceedType.set('Q', {
		title: 'Quit',
		execute: endGame
	})

	const next = await dialog.showEndSelection(proceedType)

	switch (next) {
		case 'r':
			game.getMode() === 'C' ? prepareComputerMode() : prepareHumanMode()
			break

		case 'm':
			start()
			break

		case 'q':
			endGame()
			break

		default:
			break
	}
}

function endGame() {
	const pluralize = (count, word, plural = word + 's') => ([1, -1].includes(count) ? word : plural)

	console.log()
	console.log('Thank you for playing Rock, Paper, Scissors!')
	console.log(`You have played ${game.rounds} ${pluralize(game.rounds, 'round')}. Have a nice day.`)
	console.log()
	process.exit()
}
