const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const env = 'dev'

module.exports = {

	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		app: './src/js/app.js',
		app_style: './src/scss/app.scss',
		vendor_style: './src/scss/vendor.scss',
		vendor: './src/js/vendor.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, `../dist/${env}`)
	},
	plugins: [
		new Dotenv({
			path: `./config/.env.${env}`
		}),
		new HtmlWebpackPlugin({
			template: './src/template.html',
			filename: './index.html',
			excludeChunks: ['app', 'vendor_style', 'vendor', 'app_style']
		}),
		new MiniCssExtractPlugin({
			filename: './[name].css',
		})
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						interpolate: true
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 50000,
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: './fonts'
					}
				}]
			}
		]
	}
}
