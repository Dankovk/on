"use strict";
/* tslint:disable: variable-name max-line-length */
/**
 * Try to not make your own edits to this file, use the constants folder instead.
 * If more constants should be added file an issue or create PR.
 */
require('ts-helpers');
var constants_1 = require('./lib/webpack/constants');
var _a = require('webpack'), ContextReplacementPlugin = _a.ContextReplacementPlugin, DefinePlugin = _a.DefinePlugin, DllPlugin = _a.DllPlugin, DllReferencePlugin = _a.DllReferencePlugin, ProgressPlugin = _a.ProgressPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
var webpackMerge = require('webpack-merge');
var path = require('path');
var _b = require('./lib/webpack/helpers.js'), hasProcessFlag = _b.hasProcessFlag, includeClientPackages = _b.includeClientPackages, testDll = _b.testDll;
var EVENT = process.env.npm_lifecycle_event || '';
var DEV_SERVER = EVENT.includes('devserver');
var DLL = EVENT.includes('dll');
var E2E = EVENT.includes('e2e');
var HMR = hasProcessFlag('hot');
var PROD = EVENT.includes('prod');
var WATCH = hasProcessFlag('watch');
var PORT = (PROD) ? constants_1.PROD_PORT : constants_1.DEV_PORT;
console.log('PRODUCTION BUILD: ', PROD);
if (DEV_SERVER) {
    testDll();
    console.log("Starting dev server on: http://" + constants_1.HOST + ":" + PORT);
}
var CONSTANTS = {
    ENV: PROD ? JSON.stringify('production') : JSON.stringify('development'),
    HMR: HMR,
    HOST: JSON.stringify(constants_1.HOST),
    PORT: PORT,
    STORE_DEV_TOOLS: JSON.stringify(constants_1.STORE_DEV_TOOLS)
};
var DLL_VENDORS = ['./packages/theatre/src/vendor'];
var DLL_POLYFILLS = ['./packages/theatre/src/polyfill'];
var COPY_FOLDERS = [
    { from: 'packages/theatre/src/assets', to: 'assets' },
    { from: 'packages/theatre/src/style/theatre.css', to: 'theatre.css' },
    { from: 'packages/theatre/src/theatre.json', to: 'theatre.json' },
    { from: 'packages/theatre/src/components', to: 'components' }
].concat(constants_1.MY_COPY_FOLDERS);
if (DEV_SERVER) {
    COPY_FOLDERS.push({ from: 'dll' });
}
else {
    COPY_FOLDERS.unshift({ from: 'packages/theatre/src/index.html' });
}
var commonConfig = function webpackConfig() {
    var config = Object.assign({});
    config.module = {
        rules: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [constants_1.EXCLUDE_SOURCE_MAPS]
            },
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ],
                exclude: [/\.(spec|e2e|d)\.ts$/]
            },
            { test: /\.json$/, loader: 'json-loader', exclude: [path.resolve(__dirname, 'packages/theatre/src/theatre.json')] },
            { test: /\.html/, loader: 'raw-loader', exclude: [
                    path.resolve(__dirname, 'packages/theatre/src/index.html'),
                    path.resolve(__dirname, 'packages/theatre/src/components')
                ]
            },
            { test: /\.css$/, loader: 'raw-loader' }
        ].concat(constants_1.MY_CLIENT_RULES)
    };
    config.plugins = [
        new ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.resolve(__dirname, './packages/theatre/src')),
        new ProgressPlugin(),
        new CheckerPlugin(),
        new DefinePlugin(CONSTANTS),
        new NamedModulesPlugin()
    ].concat(constants_1.MY_CLIENT_PLUGINS);
    if (DEV_SERVER) {
        config.plugins.push(new DllReferencePlugin({
            context: '.',
            manifest: require("./dll/polyfill-manifest.json")
        }), new DllReferencePlugin({
            context: '.',
            manifest: require("./dll/vendor-manifest.json")
        }), new HtmlWebpackPlugin({
            template: 'packages/theatre/src/index.html',
            inject: false
        }));
    }
    if (DLL) {
        config.plugins.push(new DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, 'dll/[name]-manifest.json')
        }));
    }
    else {
        config.plugins.push(new CopyWebpackPlugin(COPY_FOLDERS, { ignore: ['*dist_root/*'] }));
    }
    return config;
}();
// type definition for WebpackConfig at the bottom
var clientConfig = function webpackConfig() {
    var config = Object.assign({});
    config.cache = true;
    PROD ? config.devtool = constants_1.PROD_SOURCE_MAPS : config.devtool = constants_1.DEV_SOURCE_MAPS;
    if (DLL) {
        config.entry = {
            app_assets: ['./packages/theatre/src/main'],
            polyfill: DLL_POLYFILLS.concat(constants_1.MY_POLYFILL_DLLS),
            vendor: DLL_VENDORS.slice()
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
    }
    else {
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
            disableDotRule: true
        },
        stats: 'minimal',
        host: '0.0.0.0',
        watchOptions: constants_1.DEV_SERVER_WATCH_OPTIONS
    };
    if (constants_1.USE_DEV_SERVER_PROXY) {
        Object.assign(config.devServer, {
            proxy: constants_1.DEV_SERVER_PROXY_CONFIG
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
}();
var defaultConfig = {
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
};
DLL ? console.log('BUILDING DLLs') : console.log('BUILDING APP');
var config = webpackMerge({}, defaultConfig, commonConfig, clientConfig);
// console.dir(config, { depth: null });
module.exports = config;
