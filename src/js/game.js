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
    
    play(users) {
        const play1 = users[0].play
        const play2 = users[1].play
        
        const result = {
            outcome: 'Winner',
            winner: null
        }

        if(play1 === play2) {
            result.outcome = 'Tie'
            return result
        }

        result.winner = this.training[play1][play2] === 1 ? users[0].type : users[1].type
        return result
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
