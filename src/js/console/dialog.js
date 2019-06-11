const readline = require('readline')

export class Dialog {
	constructor() {
		readline.emitKeypressEvents(process.stdin)
		process.stdin.setRawMode(true)
	}

	showGameModes(selections) {
		console.clear()
		console.log('=====================')
		console.log('Select your Game Mode')
		console.log('=====================')
		console.log()
		this.prepareBasicListener(selections)
	}

	showEndSelection(selections) {
		console.log()
		console.log('What next?')
		console.log()
		this.prepareBasicListener(selections)
	}

	prepareBasicListener(selections) {
		process.stdin.removeAllListeners('keypress')
		selections.forEach((value, key) => console.log(`${key} = ${value.title}`))
		console.log()
		process.stdin.on('keypress', this.basicListener.bind(null, selections))
	}

	basicListener(options, key, data) {
		if (data.ctrl && data.name === 'c') {
			process.exit()
		} else {
			const option = options.get(data.name.toUpperCase())
			option && option.execute && option.execute()
		}
	}

	showWeapons(weapons) {
		process.stdin.removeAllListeners('keypress')

		console.clear()
		console.log('Choose your weapon:')
		console.log()

		weapons.map((weapon, index) => console.log(`${index} = ${weapon.toUpperCase()}`))
		return new Promise((resolve, reject) => process.stdin.on('keypress', this.weaponSelectionListener.bind(null, resolve, reject)))
	}

	weaponSelectionListener(resolve, reject, key, data) {
		if (data.ctrl && data.name === 'c') {
			reject()
		} else {
			resolve(data.name)
		}
	}
}
