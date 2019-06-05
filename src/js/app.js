import { Game } from './game'

const ref = new Game()
ref.learn('rock', 'scissors')
ref.learn('paper', 'rock')
ref.learn('scissors', 'paper')

const userChoice = 'rock'
const choices = ref.choices()
const computerChoice = choices[Math.floor(Math.random() * choices.length)]

console.log("Choices:", choices)
console.log("User Choice:", userChoice)
console.log("Computer Choice:", computerChoice)

console.log(ref.judge(userChoice, computerChoice))