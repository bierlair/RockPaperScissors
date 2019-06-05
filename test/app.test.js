import { Game } from './../src/js/game'

const game = new Game()

beforeEach(() => {
	game.learn('rock', 'scissors')
	game.learn('paper', 'rock')
	game.learn('scissors', 'paper')
})

it('Test if all choices are available', () => {
	const expectation = game.choices().length
	expect(expectation).toBe(3)
})

it('Test if we have ROCK', () => {
	const expectation = game.choices()
	expect(expectation).toContain('rock')
})

it('Test if we have PAPER', () => {
	const expectation = game.choices()
	expect(expectation).toContain('paper')
})

it('Test if we have SCISSORS', () => {
	const expectation = game.choices()
	expect(expectation).toContain('scissors')
})

it('rock beats scissors', () => {
	const duel = [
		{play: 'rock'},
		{play: 'scissors'}
	]
	const result = game.play(duel)
	console.log("RESULT:", result)
	expect(result).toBe(0)
})

it('paper beats rock', () => {
	const players = [
		{play: 'rock'},
		{play: 'paper'}
	]
	const result = game.play(players)
	console.log("RESULT:", result)
	expect(result).toBe(1)
})