export class Game {
	constructor() {
		this.training = {}
	}

	learn(winner, loser) {
		if (!this.training[winner]) {
			this.training[winner] = {}
		}
		this.training[winner][loser] = 1
	}

	play(player1, player2) {
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

	choices() {
		return Object.keys(this.training)
	}
}
