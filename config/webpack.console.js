const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const path = require('path')

const env = 'console'

module.exports = {

	mode: 'development',
	target: 'node',
	devtool: 'inline-source-map',
	entry: {
		app: './src/js/console.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, `../dist/${env}`)
	},
	plugins: [
		new Dotenv({
			path: `./config/.env.${env}`
		})
	]
}
