import fs from 'fs';
import path from 'path';
import merge from 'merge-stream';
import gulp from 'gulp';
import del from 'del';
import hbs from 'gulp-hbs';
import lazypipe from 'lazypipe';
// import mirror from 'gulp-mirror';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import glob from 'glob';
import bs from 'browser-sync';
import sass from 'gulp-sass';
import jsonTransform from 'gulp-json-transform';
import transform from 'gulp-transform';
import R from 'ramda';
import _ from 'lodash/fp';
// import webpack from 'webpack';
// import gutil from 'gulp-util';
// import { trace } from './lib/debug';

// import { CheckerPlugin } from 'awesome-typescript-loader';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { attributes } from './lib/attributes';

const browserSync = bs.create();

// Atoms, molecules
const packageSrc = 'packages';
const destPath = 'dist';
const srcPath = 'src';
const atomPath = 'atoms';
const moleculePath = 'molecules';

const atomSrcPath = path.join(srcPath, atomPath);
const moleculeSrcPath = path.join(srcPath, moleculePath);
const componentStyleLibPath = path.join(packageSrc, 'one', 'node_modules');
const componentStylePath = path.join(packageSrc, '/*/*.scss');

const componentDestPath = path.join(destPath, 'components');
// const atomDestPath = path.join(componentDestPath, atomPath);
const moleculeDestPath = path.join(componentDestPath, moleculePath);

const theatrePackagePath = path.join(packageSrc, 'theatre');
// const theatreSrcPath = path.join(theatrePackagePath, 'src');
const theatreDestPath = path.join(destPath, 'theatre');
const theatreComponentsDestPath = path.join(theatreDestPath, 'components');
// const theatreStyleDestPath = path.join(theatreDestPath, 'style');
// const atomStaticTheatreDestPath = path.join(componentStaticTheatreDestPath, atomPath);
// const moleculeStaticTheatreDestPath = path.join(componentStaticTheatreDestPath, moleculePath);

// Theatre
// const theatreAssetPath = path.join(theatrePath, '/**/*.{js,css,html,ts}');
// const theatreAssetPath = path.join(theatrePackagePath, 'src/*.json');
// const theatreStylePath = path.join(theatrePath, '/style');
const theatreTemplatePath = path.join(theatrePackagePath, 'src/templates');
const theatreStyleSrcPath = path.join(theatrePackagePath, 'src/style/theatre-iframe.scss');

const theatreJSONPath = path.join(theatreDestPath, 'theatre.json');
const theatreStaticTemplate = 'static.hbs';
// const theatreComponentStyle = 'theatre-component.css';

/*
 * Watch functions
 */

/*
 * Returns a function that will return gulp.watch of:
 *
 *     the first arg: a string representing a blob of the files to watch
 *     the remaining args, functions to be placed in a gulp.series
 */
// eslint-disable-next-line no-unused-vars
const watchSeriesFunc = (...args) => () => gulp.watch(R.head(args), gulp.series(R.tail(args)));

/*
 * Returns a function that will return gulp.watch of:
 *
 *     the first arg: a string representing a blob of the files to watch
 *     the remaining args, functions to be placed in a gulp.series WITH browserSyncReload appended
 */
// eslint-disable-next-line no-unused-vars
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
// TODO: Using recursion, not optimized in JS -- alternatives?
const mergeOmitNil = R.curryN(2, R.compose(
	_.omitBy(R.isNil),
	R.mergeWith((l, r) => !_.isArray(r) && _.isObject(r) ? mergeOmitNil(l, r) : r),
));

/*
 *
 */
// eslint-disable-next-line no-unused-vars
const isExcluded = R.curry((excludes, file) =>
	_.defaultTo([], excludes).indexOf(file) < 0
);

/*
 *
 */
const isValidDir = file => fs.statSync(file).isDirectory();

/*
 *
 */
const patternPath = ['one', 'pattern'];
const getPattern = R.path(patternPath);
const isPattern = R.pathEq(patternPath);
const isPatternAtom = isPattern('atom');
// const isPatternMolecule = isPattern('molecule');
// const isPatternOrganism = isPattern('organism');
// const isPatternTemplate = isPattern('template');
// const isPatternPages = isPattern('pages');

/*
 *
 */
const isType = R.pathEq(['one', 'type']);
const isTypeStatic = isType('static');
// const isTypeAngular = isType('angular');

/*
 *
 */
const patternFromPath = R.cond([
	[R.match(/\/atoms/), R.always('atom')],
	[R.match(/\/molecules/), R.always('molecule')],
	[R.match(/\/organisms/), R.always('organism')],
	[R.match(/\/templates/), R.always('template')],
	[R.match(/\/pages/), R.always('page')]
]);

/*
 *
 */
const presentationFromPath = R.cond([
	[R.match(/\/states/), R.always('state')],
	[R.match(/\/demos/), R.always('demo')]
]);

/*
 *
 */
const packageJSON = relativeRootDir =>
	// eslint-disable-next-line global-require, import/no-dynamic-require
	require(path.join(__dirname, relativeRootDir, 'package.json'));

/*
 *
 */
function getFiles(dir, criteria = [], obj) {
	const files = fs.readdirSync(dir)
		.filter(file =>
			R.allPass([...criteria])(path.join(dir, file))
		);

	return (obj !== true) ? files :
		_.map(file =>
			({
				name: file,
				base: dir,
				one: R.path(['one'], packageJSON(path.join(dir, file)))
			})
		, files);
}

/*
 *
 */
const getFolders = (dir, criteria = [], obj) =>
	getFiles(dir, [isValidDir, ...criteria], obj);

/*
 *
 */
const packageCriteria = (relativeRootDir, ...criteria) =>
	R.allPass(criteria)(packageJSON(relativeRootDir));

/*
 *
 */
const componentCriteria = relativeRootDir =>
	packageCriteria(
		relativeRootDir, R.compose(R.not, R.isNil, getPattern)
	);

/*
 *
 */
const atomCriteria = relativeRootDir =>
	packageCriteria(relativeRootDir, isPatternAtom, isTypeStatic);

/*
 *
 */
// eslint-disable-next-line no-unused-vars
const getComponentFolders = relativeRootDir =>
	getFolders(relativeRootDir, [componentCriteria]);
const getComponentFolderObjs = relativeRootDir =>
	getFolders(relativeRootDir, [componentCriteria], true);
const getAtomFolders = relativeRootDir => getFolders(relativeRootDir, [atomCriteria]);


/*
 * Task: Clean the project
 */
const clean = () => del([destPath]);
export { clean };

/*
 *
 */
const cleanComponents = () => del([componentDestPath]);
export { cleanComponents };

/*
 *
 */
const cleanTheatre = () => del([theatreDestPath]);
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
		// eslint-disable-next-line global-require, import/no-dynamic-require
		() => !R.equals(file.relative, 'default.json'), mergeOmitNil(require(`${file.base}/default.json`))
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
const processComponentTemplate = (folderRoot, folder, dest = null) =>
	lazypipe()
		.pipe(() => jsonTransform(mergeStatesForTemplate))
		.pipe(() => hbs(gulp.src(path.join(folderRoot, folder, `${folder}.hbs`))))
		.pipe(() => gulpif(!R.isNil(dest), gulp.dest(dest)));

/*
 *
 */
const theatreComponentName = (pattern, name, presentation, stateordemo, type) =>
	R.join('-', [pattern, name, presentation, stateordemo, type]);

/*
 *
 */
const processComponentTheatreTemplate = (folderRoot, folder, makeComponent,
																				 aTheatreTemplatePath, type, dest = null) =>
	lazypipe()
		.pipe(() => gulpif(makeComponent, processComponentTemplate(folderRoot, folder)()))
		.pipe(() =>
			transform(contents =>
				JSON.stringify({
					title: folder,
					description: `One static template: ${folder}`,
					theatreStyle: `/components/theatre-${folder}.css`,
					componentStyle: `/components/${folder}.css`,
					component: contents.toString('utf-8')
				})
			)
		)
		.pipe(() => hbs(gulp.src(aTheatreTemplatePath)))
		.pipe(() => rename((filepath) => {
			filepath.basename = theatreComponentName(
				patternFromPath(folderRoot),
				folder,
				presentationFromPath(folderRoot),
				filepath.basename,
				type
			);
			filepath.extname = '.html';
			return filepath;
		}))
		.pipe(() => gulpif(!R.isNil(dest), gulp.dest(dest)));

/*
 *
 */
const processComponent = (componentRoot, component) =>
	gulp.src(path.join(componentRoot, component, '/states/*.json'))
		// make the static component states
		.pipe(processComponentTemplate(
			componentRoot, component, path.join(componentDestPath, component, 'static/states'))()
		)
		// make the theatre iframe components
		.pipe(
			processComponentTheatreTemplate(
				componentRoot, component, false,
				path.join(theatreTemplatePath, theatreStaticTemplate),
				'static',
				theatreComponentsDestPath
			)()
		);

/*
 *
 */
export function atoms() {
	return merge(
		getAtomFolders(packageSrc).map(folder => processComponent(packageSrc, folder))
	);
}

/*
 *
 */
export function registerAtomPartials(cb) {
	getFolders(atomSrcPath).map(folder =>
		hbs.registerPartial(folder, fs.readFileSync(path.join(atomSrcPath, folder, `${folder}.hbs`), 'utf-8'))
	);
	cb();
}

/*
 *
 */
export function createMolecules() {
	return merge(
		getFolders(moleculeSrcPath).map(folder =>
			gulp.src(path.join(moleculeSrcPath, folder, '/states/*.json'))
				.pipe(jsonTransform(mergeStatesForTemplate))
				.pipe(hbs(gulp.src(path.join(moleculeSrcPath, folder, `${folder}.hbs`))))
				.pipe(gulp.dest(path.join(moleculeDestPath, folder)))
		)
	);
}

/*
 *
 */
// const molecules = gulp.series(registerAtomPartials, createMolecules);

/*
 *
 */
export function sassComponents() {
	return gulp.src(componentStylePath)
		.pipe(sass({ includePaths: [componentStyleLibPath] }).on('error', sass.logError))
		.pipe(gulp.dest(componentDestPath))
		// flatten the directory name for theatre iframe components
		.pipe(rename({ dirname: '.' }))
		.pipe(gulp.dest(theatreComponentsDestPath));
}

/*
 *
 */
const buildComponentTemplates = gulp.series(
	registerHbsHelpers, atoms // , molecules
);
export { buildComponentTemplates };

/*
 *
 */
const buildComponents = gulp.parallel(
	sassComponents,
	buildComponentTemplates,
	theatreJSON
);
export { buildComponents };

/*
 *
 */
// eslint-disable-next-line no-unused-vars
const buildComponent = component => gulp.series(
	registerHbsHelpers, () => processComponent(packageSrc, component)
);

/*
 *
 */
// eslint-disable-next-line no-unused-vars
const buildDependents = (component) => {
	// console.log('TBD');
};

/*
 *
 */
// eslint-disable-next-line no-unused-vars
const buildComponentAndDeps = component => gulp.series(
	registerHbsHelpers,
	() => processComponent(packageSrc, component),
	() => buildDependents(component)
);

/*
 *
 */
// eslint-disable-next-line no-unused-vars
export function theatreJSON(cb) {
	const allComponents = {
		atoms: [],
		molecules: [],
		organisms: [],
		tempaltes: [],
		pages: []
	};

	getComponentFolderObjs(packageSrc).forEach((folder) => {
		allComponents[`${folder.one.pattern}s`].push(
			{
				name: folder.one.name,
				type: folder.one.type,
				states: glob.sync(path.join(packageSrc, folder.name, '**/states/*.json')).map(file =>
					path.basename(file, '.json')
				)
			}
		);
	});

	fs.writeFile(theatreJSONPath, JSON.stringify(allComponents), 'utf8', cb);
}

/*
 *
 */
const isFile = (filePattern, fileChanged) => R.compose(
	R.equals(filePattern), R.takeLast(R.length(filePattern))
)(fileChanged);

/*
 *
 */
const isComponent = (fileChanged) => {
	const pack = R.match(/packages\/(.+?)\//, fileChanged);

	return (pack.length > 0) ?
		componentCriteria(path.join(packageSrc, pack[1])) : false;
};

/*
 *
 */
const isTheatreSass = fileChanged => isFile(theatreStyleSrcPath, fileChanged);

/*
 *
 */
const isTheatreTemplate = fileChanged => isFile(theatreStaticTemplate, fileChanged);

/*
 *
 */
const isSass = fileChanged => isFile('.scss', fileChanged);

/*
 *
 */
export function watchComponents() {
	return gulp.watch(path.join(packageSrc, '/*/**/*.{hbs,json,scss}'))
		.on('change', (file) => {
			R.cond([
				// TODO: Create a function to only build one sass component & dependents
				[R.compose(R.equals(true), isTheatreSass),
					gulp.series(sassTheatre, browserSyncReload)],
				// eslint-disable-next-line max-len
				[R.compose(R.equals(true), isTheatreTemplate),
					gulp.series(buildComponentTemplates, theatreJSON, browserSyncReload)],
				[R.compose(R.equals(true), isSass),
					gulp.series(sassComponents, browserSyncReload)],
				// TODO: Use a function to only build one component & dependents
				// eslint-disable-next-line max-len
				[R.compose(R.equals(true), isComponent),
					gulp.series(buildComponentTemplates, theatreJSON, browserSyncReload)]
			])(file);
		});
}

/*
 * Theatre
 */

/*
 *
 */
// export function copyTheatre() {
// 	return gulp.src(theatreAssetPath, { followSymlinks: false })
// 		.pipe(gulp.dest(theatreDestPath));
// }

/*
 *
 */
export function serve() {
	browserSync.init({
		server: './dist'
	});
}

/*
 *
 */
export function serveTheatre() {
	browserSync.init({
		server: './dist/theatre'
	});
}

/*
 *
 */
export function sassTheatre() {
	return gulp.src(theatreStyleSrcPath)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(theatreDestPath));
}

/*
 * Reload browser sync
 */
export function browserSyncReload(cb) {
	browserSync.reload();
	cb();
}

/*
 * Export a default task
 */
export default gulp.series(clean, buildComponents);
