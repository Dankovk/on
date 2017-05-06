/* tslint:disable: variable-name max-line-length */
/**
 * Try to not make your own edits to this file, use the constants folder instead.
 * If more constants should be added file an issue or create PR.
 */
import 'ts-helpers';

import {
	DEV_PORT, PROD_PORT, EXCLUDE_SOURCE_MAPS, HOST,
	USE_DEV_SERVER_PROXY, DEV_SERVER_PROXY_CONFIG, DEV_SERVER_WATCH_OPTIONS,
	DEV_SOURCE_MAPS, PROD_SOURCE_MAPS, STORE_DEV_TOOLS,
	MY_COPY_FOLDERS, MY_POLYFILL_DLLS, MY_VENDOR_DLLS, MY_CLIENT_PLUGINS, MY_CLIENT_PRODUCTION_PLUGINS,
	MY_CLIENT_RULES, MY_SERVER_RULES, MY_SERVER_INCLUDE_CLIENT_PACKAGES
} from './lib/webpack/constants';

const {
	ContextReplacementPlugin,
	DefinePlugin,
	DllPlugin,
	DllReferencePlugin,
	ProgressPlugin
} = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpackMerge = require('webpack-merge');
const path = require('path');

const { hasProcessFlag, includeClientPackages, testDll } = require('./lib/webpack/helpers.js');

const EVENT = process.env.npm_lifecycle_event || '';
const DEV_SERVER = EVENT.includes('devserver');
const DLL = EVENT.includes('dll');
const E2E = EVENT.includes('e2e');
const HMR = hasProcessFlag('hot');
const PROD = EVENT.includes('prod');
const WATCH = hasProcessFlag('watch');
const PORT = (PROD) ? PROD_PORT : DEV_PORT;

console.log('PRODUCTION BUILD: ', PROD);
if (DEV_SERVER) {
	testDll();
	console.log(`Starting dev server on: http://${HOST}:${PORT}`);
}

const CONSTANTS = {
	ENV: PROD ? JSON.stringify('production') : JSON.stringify('development'),
	HMR: HMR,
	HOST: JSON.stringify(HOST),
	PORT: PORT,
	STORE_DEV_TOOLS: JSON.stringify(STORE_DEV_TOOLS)
};

const DLL_VENDORS = ['./packages/theatre/src/vendor'];
const DLL_POLYFILLS = ['./packages/theatre/src/polyfill'];

const COPY_FOLDERS = [
	{ from: 'packages/theatre/src/assets', to: 'assets' },
	{ from: 'packages/theatre/src/style/theatre.css', to: 'theatre.css' },
	{ from: 'dist/theatre/theatre-iframe.css', to: 'theatre-iframe.css' },
	...MY_COPY_FOLDERS
];

if (DEV_SERVER) {
	COPY_FOLDERS.push({ from: 'dll' });
}
else {
	COPY_FOLDERS.unshift({ from: 'packages/theatre/src/index.html' });
}

const commonConfig = function webpackConfig(): WebpackConfig {
	let config: WebpackConfig = Object.assign({});

	config.module = {
		rules: [
			{
				test: /\.js$/,
				loader: 'source-map-loader',
				exclude: [EXCLUDE_SOURCE_MAPS]
			},
			{
				test: /\.ts$/,
				loaders: [
					'awesome-typescript-loader',
					'angular2-template-loader'
				],
				exclude: [/\.(spec|e2e|d)\.ts$/]
			},
			{ test: /\.html/, loader: 'raw-loader', exclude: [
					path.resolve(__dirname, 'packages/theatre/src/index.html'),
				]
			},
			{ test: /\.css$/, loader: 'raw-loader' },
			...MY_CLIENT_RULES
		]
	};

	config.plugins = [
		new ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			path.resolve(__dirname, './packages/theatre/src'),
		),
		new ProgressPlugin(),
		new CheckerPlugin(),
		new DefinePlugin(CONSTANTS),
		new NamedModulesPlugin(),
		...MY_CLIENT_PLUGINS
	];

	if (DEV_SERVER) {
		config.plugins.push(
			new DllReferencePlugin({
				context: '.',
				manifest: require(`./dll/polyfill-manifest.json`)
			}),
			new DllReferencePlugin({
				context: '.',
				manifest: require(`./dll/vendor-manifest.json`)
			}),
			new HtmlWebpackPlugin({
				template: 'packages/theatre/src/index.html',
				inject: false
			})
			// Stylelint
			// ,new StyleLintPlugin({
			// 	files: STYLE_PATH,
			// 	syntax: 'scss'
			// })
		);
	}

	if (DLL) {
		config.plugins.push(
			new DllPlugin({
				name: '[name]',
				path: path.resolve(__dirname, 'dll/[name]-manifest.json')
			})
		);
	}
	else {
		config.plugins.push(
			new CopyWebpackPlugin(COPY_FOLDERS, { ignore: ['*dist_root/*'] })
			// new CopyWebpackPlugin([{ from: 'src/assets/dist_root' }])
		);
	}

	return config;
} ();

// type definition for WebpackConfig at the bottom
const clientConfig = function webpackConfig(): WebpackConfig {

	let config: WebpackConfig = Object.assign({});

	config.cache = true;
	PROD ? config.devtool = PROD_SOURCE_MAPS : config.devtool = DEV_SOURCE_MAPS;

	if (DLL) {
		config.entry = {
			app_assets: ['./packages/theatre/src/main'],
			polyfill: [
				...DLL_POLYFILLS,
				...MY_POLYFILL_DLLS
			],
			vendor: [...DLL_VENDORS]
		};
	}
	else {
		config.entry = {
			main: './packages/theatre/src/main'
		};
	}

	if (!DLL) {
		config.output = {
			path: path.resolve(__dirname, 'dist/theatre'),
			filename: 'index.js'
		};
	} else {
		config.output = {
			path: path.resolve(__dirname, 'dll'),
			filename: '[name].dll.js',
			library: '[name]'
		};
	}

	config.devServer = {
		contentBase: './packages/theatre/src',
		port: CONSTANTS.PORT,
		historyApiFallback: {
			disableDotRule: true,
		},
		stats: 'minimal',
		host: '0.0.0.0',
		watchOptions: DEV_SERVER_WATCH_OPTIONS
	};

	if (USE_DEV_SERVER_PROXY) {
		Object.assign(config.devServer, {
			proxy: DEV_SERVER_PROXY_CONFIG
		});
	}

	config.performance = {
		hints: false
	};

	config.node = {
		global: true,
		process: true,
		Buffer: false,
		crypto: true,
		module: false,
		clearImmediate: false,
		setImmediate: false,
		clearTimeout: true,
		setTimeout: true
	};

	return config;

} ();

const defaultConfig = {
	resolve: {
		extensions: ['.ts', '.js', '.json']
	}
};

DLL ? console.log('BUILDING DLLs') : console.log('BUILDING APP');
const config = webpackMerge({}, defaultConfig, commonConfig, clientConfig);
// console.dir(config, { depth: null });
module.exports = config;

