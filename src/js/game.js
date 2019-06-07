export class Game {
	constructor() {
		this.training = {}
		this.round = 0
		this.mode = null
	}

	get rounds() {
		return this.round
	}

	setMode(mode) {
		this.mode = mode
	}

	getMode() {
		return this.mode
	}

	learn(key, winner, loser) {
		if (!this.training[winner]) {
			this.training[winner] = {}
		}
		this.training[winner][loser] = 1
	}

	play(player1, player2) {
		this.round += 1
		if (player1.choice === player2.choice) {
			return null
		}
		return this.training[player1.choice][player2.choice] === 1 ? player1.id : player2.id
	}

	validate(choice) {
		return choice in this.training
	}

	makeRandomChoice() {
		return Object.keys(this.training)[Math.floor(Math.random() * Object.keys(this.training).length)]
	}

	get choices() {
		return Object.keys(this.training)
	}
}
