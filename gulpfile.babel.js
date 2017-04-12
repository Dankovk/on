import fs from 'fs';
import path from 'path';
import es from 'event-stream';
import merge from 'merge-stream';
import gulp from 'gulp';
import del from 'del';
import hbs from 'gulp-hbs';
import bs from 'browser-sync';
import sass from 'gulp-sass';
import jsonTransform from 'gulp-json-transform';
import transform from 'gulp-transform';
import R from 'ramda';
import _ from 'lodash/fp';
import util from 'util';
import webpack from 'webpack';
import gutil from 'gulp-util';


import { CheckerPlugin } from 'awesome-typescript-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { attributes } from './lib/attributes.js';


const browserSync = bs.create();

// Atoms, molecules
const destPath = 'dist'
const srcPath = 'src';
const atomPath = 'atoms';
const moleculePath = 'molecules';

const atomSrcPath = path.join(srcPath, atomPath);
const moleculeSrcPath = path.join(srcPath, moleculePath);
const componentStyleLibPath = path.join(srcPath, 'style');
const componentStylePath = path.join(srcPath, '/**/*.scss');

const componentDestPath = path.join(destPath, 'static/components');
const atomDestPath = path.join(componentDestPath, atomPath);
const moleculeDestPath = path.join(componentDestPath, moleculePath);

const theatrePackagePath = path.join('packages', 'theatre');
const theatreDestPath = path.join(destPath, 'theatre');
const componentStaticTheatreDestPath = path.join(theatreDestPath, 'components');
const theatreStyleDestPath = path.join(theatreDestPath, 'style');
const atomStaticTheatreDestPath = path.join(componentStaticTheatreDestPath, atomPath);
const moleculeStaticTheatreDestPath = path.join(componentStaticTheatreDestPath, moleculePath);

// Theatre
const theatrePath = 'theatre';
// const theatreAssetPath = path.join(theatrePath, '/**/*.{js,css,html,ts}');
const theatreAssetPath = path.join(theatrePackagePath, 'src/*.json');
const theatreStylePath = path.join(theatrePath, '/style');
const theatreTemplatePath = path.join(theatrePath, '/templates');
const theatreStyleSrcPath = path.join(theatreStylePath, '/**/*.scss');

const theatreStaticTemplate = 'static.hbs';



const trace = R.curry(function(tag, x) {
	console.log(util.inspect(x, false, null));
	return x;
});


/*
 * Watch functions
 */

/*
 * Returns a function that will return gulp.watch of:
 *
 *     the first arg: a string representing a blob of the files to watch
 *     the remaining args, functions to be placed in a gulp.series
 */
const watchSeriesFunc = (...args) => () => gulp.watch(R.head(args), gulp.series(R.tail(args)));

/*
 * Returns a function that will return gulp.watch of:
 *
 *     the first arg: a string representing a blob of the files to watch
 *     the remaining args, functions to be placed in a gulp.series WITH browserSyncReload appended
 */
const watchFuncBS = (...args) =>
	(R.equals(R.last(args), browserSyncReload)) ?
		watchSeriesFunc(...args) :
		watchSeriesFunc(...args, browserSyncReload);

/*
 * Merges two objects, removing the keys of any undefined values
 *
 *     the first arg: the object to merge into
 *     the second arg: the object to be merged into the first argument
 */
const mergeOmitNil = R.curryN(2, R.compose(
	_.omitBy(R.isNil),
	R.mergeWith((l, r) => _.isObject(r) ? mergeOmitNil(l, r) : r),
));


function getFolders(dir, excludes, obj) {
	let folders = fs.readdirSync(dir)
		.filter((file) => {
			return _.defaultTo([], excludes).indexOf(file) < 0 && fs.statSync(path.join(dir, file)).isDirectory();
		});

	return (obj !== true) ? folders :
		_.map(folder => {
			return {
				name: folder,
				base: dir
			}
		}, folders);
}

/*
 * Task: Clean the project
 */
const clean = () => del([ destPath ]);
export { clean };

const cleanComponents = () => del([ componentDestPath ]);
export { cleanComponents };

const cleanTheatre = () => del([ theatreDestPath ]);
export { cleanTheatre };


/*
 * Task: Register handlebars helpers
 */
const registerHbsHelpers = (cb) => {
	hbs.registerHelper('attr', attributes);
	cb();
};
export { registerHbsHelpers };


/*
 * Merges a state's data to override a relative default.json, also removing key/values
 * marked for deletion
 */
function mergeStates(data, file) {
	return R.when(
		() => !R.equals(file.relative, 'default.json'), mergeOmitNil(require(file.base + '/default.json'))
	)(data);
}

/*
 * Merges a state's data to override a relative default.json, also removing key/values
 * marked for deletion, and selects the root level 'template' key, if available
 */
function mergeStatesForTemplate(data, file) {
	return R.compose(
		R.when(R.has('template'), R.prop('template')), mergeStates
	)(data, file);
}

/*
 *
 */
export function atoms() {
	return merge(
		getFolders(atomSrcPath).map((folder) => {
			return gulp.src(path.join(atomSrcPath, folder, '/states/*.json'))
				.pipe(jsonTransform(mergeStatesForTemplate))
				.pipe(hbs(gulp.src(path.join(atomSrcPath, folder, folder + '.hbs'))))
				.pipe(gulp.dest(path.join(atomDestPath, folder)));
				// TODO: create javascript templates?
		})
	);
}

export function registerAtomPartials(cb) {
	getFolders(atomSrcPath).map((folder) => {
		// console.log('register partials');
		hbs.registerPartial(folder, fs.readFileSync(path.join(atomSrcPath, folder, folder + '.hbs'), 'utf-8'));
	});
	cb();
}

/*
 *
 */
export function createMolecules() {
	return merge(
		getFolders(moleculeSrcPath).map((folder) => {
			// console.log('create molecules');
			return gulp.src(path.join(moleculeSrcPath, folder, '/states/*.json'))
				.pipe(jsonTransform(mergeStatesForTemplate))
				.pipe(hbs(gulp.src(path.join(moleculeSrcPath, folder, folder + '.hbs'))))
				.pipe(gulp.dest(path.join(moleculeDestPath, folder)));
				// TODO: create javascript templates?
		})
	);
}

const molecules = gulp.series(registerAtomPartials, createMolecules);


export function sassComponents() {
	return gulp.src(componentStylePath)
		.pipe(sass({ includePaths: [componentStyleLibPath] }).on('error', sass.logError))
		.pipe(gulp.dest(componentDestPath));
}


// const componentStaticTheatreDestPath = path.join(destPath, 'theatre/components');
// const atomStaticTheatreDestPath = path.join(componentStaticTheatreDestPath, atomPath);
// const moleculeStaticTheatreDestPath = path.join(componentStaticTheatreDestPath, moleculePath);


const buildComponents = gulp.parallel(
	sassComponents,
	gulp.series(
		registerHbsHelpers, atoms, molecules
	)
);
export { buildComponents };

/*
 * Theatre
 */
export function theatreStaticAtoms() {

	// console.log(

	//  _.concat(
	//    getFolders(atomDestPath, [], true),
	//    getFolders(moleculeDestPath, [], true)
	//  )

	// );

	return merge(
		_.concat(
			getFolders(atomDestPath, [], true),
			getFolders(moleculeDestPath, [], true)
		)
		.map((folder) => {
			return gulp.src(path.join(folder.base, folder.name, '*.html'))
				.pipe(transform((contents, file) => {
					return JSON.stringify({
						title: folder.name,
						description: 'One static template: ' + folder.name,
						theatreStyle: path.join(theatreStyleDestPath.substring(4), 'theatre.css'),
						componentStyle: path.join(file.base.replace(file.cwd, '').substring(5), folder.name + '.css'),
						component: contents.toString('utf-8')
					});
				}))
				.pipe(hbs(gulp.src(path.join(theatreTemplatePath, theatreStaticTemplate))))
				.pipe(gulp.dest(path.join(folder.base.replace('dist/static', 'dist/theatre'), folder.name)));
		})
	);
}

export function copyTheatre() {
	// console.log('copyTheatre');
	return gulp.src(theatreAssetPath, { followSymlinks: false })
		.pipe(gulp.dest(theatreDestPath));
}

/*
 * Clean, build components & the theatre, then watch everything & start the theatre
 */
const buildTheatreComponents = gulp.parallel(
	copyTheatre,
	theatreStaticAtoms
);
export { buildTheatreComponents };




export function serve() {
	browserSync.init({
		server: "./dist"
	});
}







/*
 * Future: separate Angular app
 */


// export function sassTheatre() {
//  return gulp.src(theatreStyleSrcPath)
//    .pipe(sass().on('error', sass.logError))
//    .pipe(gulp.dest(theatreStyleDestPath));
// }

/*
 * Reload browser sync
 */
export function browserSyncReload(cb) {
	browserSync.reload();
	cb();
}

/*
 *
 */
// const buildTheatre = gulp.parallel(copyTheatre, sassTheatre);
// export { buildTheatre };


const theatreWebpackConfig = {
	entry: {
		polyfill: './packages/theatre/src/polyfill.ts',
		'main.bundle': './packages/theatre/src/main.ts'
	},
	output: {
		path: path.resolve(__dirname, 'dist/theatre'),
		filename: '[name].js'
	},
	// Source maps support ('inline-source-map' also works)
	devtool: 'source-map',

	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
	},

	resolveLoader: {
		// An array of directory names to be resolved to the current directory
		modules: ["node_modules", path.resolve(__dirname, "packages/theatre/node_modules")]
	},

	module: {
		rules: [
			{ test: /\.tsx?$/,
				loaders: ['awesome-typescript-loader', 'angular2-template-loader']
			},
			{
				test: /\.html$/,
				include: path.resolve(theatrePackagePath, 'src'),
				loaders: 'html-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				include: path.resolve(theatrePackagePath, 'src'),
				loaders: 'null-loader'
			},
			{
				test: /\.css$/,
				exclude: path.resolve(theatrePackagePath, 'src', 'app'),
				loaders: 'null-loader'
			},
			{
				test: /\.css$/,
				include: path.resolve(theatrePackagePath, 'src', 'app'),
				loaders: 'raw-loader'
				// loaders: ['css-to-string-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new CheckerPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(theatrePackagePath, 'src', 'index.html'),
			chunksSortMode: function (a, b) {  //reverse alphabetical order
				if (a.names[0] < b.names[0]) {
					return 1;
				}
				if (a.names[0] > b.names[0]) {
					return -1;
				}
				return 0;
			}
		}),
		new ExtractTextPlugin('styles.css')
	]
};

export function buildTheatre(cb) {
	// run webpack
	webpack(theatreWebpackConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
				// output options
		}));
		cb();
	});
}

/*
 * Clean, build components & the theatre, then watch everything & start the theatre
 */
// const theatre = gulp.series(cleanTheatre, copyTheatre, gulp.parallel(
//  watchFuncBS(theatreAssetPath, copyTheatre),
//  serve
// ));
// export { theatre };
const theatre = gulp.series(cleanTheatre, copyTheatre, buildTheatre);
export { theatre };



/*
 * Export a default task
 */
export default gulp.series(clean, buildComponents, buildTheatreComponents);
