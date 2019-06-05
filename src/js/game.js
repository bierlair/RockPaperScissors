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
        
        if(play1 === play2) {
            return -1
        }
        return (this.training[play1][play2] === 1) ? 0 : 1
    }

    validate(choice) {
        return choice in this.training
    }
    
    choices() {
        return Object.keys(this.training)
    }
}
