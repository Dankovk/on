import fs from 'fs';
import path from 'path';
import merge from 'merge-stream';
import estream from 'event-stream';
import multipipe from 'multipipe';
import reduce from 'stream-reduce';
import hbs from 'gulp-hbs';
import yaml from 'gulp-yaml';
import yaml2json from 'js-yaml';
import stylelint from 'gulp-stylelint';
import lazypipe from 'lazypipe';
import mirror from 'gulp-mirror';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulp from 'gulp';
import del from 'del';
import rename from 'gulp-rename';
// import debug from 'gulp-debug';
import gulpif from 'gulp-if';
import glob from 'glob';
import bs from 'browser-sync';
import sass from 'gulp-sass';
import jsonTransform from 'gulp-json-transform';
import transform from 'gulp-transform';
import R from 'ramda';
import _ from 'lodash/fp';
import request from 'request';
import gutil from 'gulp-util';
// import { trace } from './lib/debug';

import { attributes } from './lib/attributes';

const browserSync = bs.create();

// Atoms, molecules
const packageSrc = 'packages';
const destPath = 'dist';

const componentStyleLibPath = path.join(packageSrc, 'one', 'node_modules');
const componentStylePath = path.join(packageSrc, '/*/*.scss');
const componentDestPath = path.join(destPath, 'components');
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
const packageJSON = relativeRootDir =>
	// TODO: Use a cache for package.json imports
	// eslint-disable-next-line global-require, import/no-dynamic-require
	require(path.join(__dirname, relativeRootDir, 'package.json'));

/*
 *
 */
const loadConfigSync =
	R.cond([
		[R.compose(R.equals(true), fs.existsSync, R.concat(R.__, '.yaml')),
			R.pipe(
				R.concat(R.__, '.yaml'),
				(R.curry(fs.readFileSync)(R.__, { encoding: 'utf8' })),
				yaml2json.load
			)
		],
		[R.T,
			R.pipe(
				R.concat(R.__, '.json'),
				(R.curry(fs.readFileSync)(R.__, { encoding: 'utf8' }))
			)
		]
	]);

/*
 * Returns the name of the one package (less the "@one/") from a package.json
 * depedency list
 */
const onePackageName = pack => pack.substring(5);

/*
 *
 */
const oneDependencies =
	R.compose(R.map(onePackageName), R.filter(_.startsWith('@one')));

/*
 *
 */
const onePackageNames = R.compose(oneDependencies, R.keys);

/*
 *
 */
function getFiles(dir, criteria = [], obj) {
	const files = (fs.existsSync(dir)) ?
		fs.readdirSync(dir)
			.filter(file =>
				R.allPass([...criteria])(path.join(dir, file))
			)
		: [];

	// return an object with additional metadata info
	if (obj === true) {
		return _.map((file) => {
			const pack = packageJSON(path.join(dir, file));

			return ({
				name: file,
				base: dir,
				path: path.join(dir, file),
				deps: onePackageNames(pack.dependencies),
				one: R.path(['one'], pack)
			});
		}, files);
	}
	// return a plain list of files
	// eslint-disable-next-line no-else-return
	else {
		return files;
	}
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
 // eslint-disable-next-line no-unused-vars
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
		() => !R.equals(file.relative, 'default'), mergeOmitNil(loadConfigSync(`${file.base}/default`)/* require(`${file.base}/default.json`)*/)
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
function selectStateTemplate(data, file) {
	return R.when(R.has('template'), R.prop('template'))(data, file);
}

/*
 * Merges a state's data to override a relative default.json, also removing key/values
 * marked for deletion, and selects the root level 'template' key, if available
 */
function mergeStatesForTemplateKeyed(data, file) {
	const keyedState = {};

	keyedState[(path.parse(file.relative)).name] =
		mergeStatesForTemplate(data, file);

	return keyedState;
}

/*
 *
 */
function srcJsonAndYaml(datapath) {
	return merge(
		gulp.src(path.join(datapath, '/*.yaml')).pipe(yaml()),
		gulp.src(path.join(datapath, '/*.json'))
	);
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
const theatreBodyClasses = (pattern, name, presentation, stateordemo) => {
	let bodyClasses = [
		`theatre__stage-${name}`,
		`theatre__stage-${name}-${presentation}`,
		`theatre__stage-${name}-${presentation}-${stateordemo}`
	];
	if (R.equals('demo', presentation)) {
		bodyClasses = R.prepend('theatre__stage-demo', bodyClasses);
	}
	else {
		bodyClasses = R.prepend('theatre__stage-state', bodyClasses);
	}
	return bodyClasses;
};

/*
 *
 */
const processComponentTheatreTemplate = (folderRoot, folder, makeComponent, presentation,
																				 stateordemo, pattern, aTheatreTemplatePath,
																				 type, deps = [], dest = null) =>
	lazypipe()
		.pipe(() => gulpif(makeComponent, processComponentTemplate(folderRoot, folder)()))
		.pipe(() =>
			transform((contents, file) =>
				JSON.stringify({
					title: folder,
					description: `One static template: ${folder}`,
					theatreStyle: `/components/theatre-${folder}.css`,
					componentStyleDeps: R.concat(deps, [folder]),
					theatreBodyClasses: R.join(' ', theatreBodyClasses(
						pattern,
						folder,
						presentation,
						(path.parse(file.path)).name,
						type
					)),
					component: contents.toString('utf-8')
				})
			)
		)
		.pipe(() => hbs(gulp.src(aTheatreTemplatePath)))
		.pipe(() => rename((filepath) => {
			filepath.basename = theatreComponentName(
				pattern,
				folder,
				presentation,
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
const processComponentStates = (componentRoot, component) =>
	srcJsonAndYaml(path.join(component.path, '/states'))
		// make the static component states
		.pipe(processComponentTemplate(
			componentRoot, component.name, path.join(componentDestPath, component.name, 'static/states'))()
		)
		// make the theatre iframe components
		.pipe(
			processComponentTheatreTemplate(
				componentRoot, component.name, false, 'state',
				component.name, component.one.pattern,
				path.join(theatreTemplatePath, theatreStaticTemplate),
				component.one.type, component.deps,
				theatreComponentsDestPath
			)()
		);

/*
 *
 */
const processComponentDemos = (componentRoot, component) =>
	// start with the state json and the json configs for arbitrary demos
	merge(
		srcJsonAndYaml(path.join(component.path, '/states'))
		.pipe(jsonTransform(mergeStatesForTemplateKeyed)),
		srcJsonAndYaml(path.join(component.path, '/demos'))
		.pipe(jsonTransform(selectStateTemplate))
	)
	// merge them all together into one JSON stream
	.pipe(reduce((acc, data) =>
		_.merge(acc, JSON.parse(data.contents.toString('utf8')))
	, {}))
	.pipe(estream.stringify())
	// Use demos.json as a temporary name (it's virtual)
	.pipe(source('demos.json'))
	.pipe(buffer())
	// mirror the combined JSON over all demos for this component
	.pipe(
		mirror(
			_.map(
				template =>
					multipipe(
						// process the demo template
						hbs(
							gulp.src(path.join(component.path, 'demos', template))
						),
						// give the virtual file a proper name (processComponentTheatreTemplate
						// will need it)
						rename((filepath) => {
							filepath.basename = path.basename(template, '.hbs');
							return filepath;
						}),
						// make the theatre template for the demo
						processComponentTheatreTemplate(
							componentRoot, component.name, false, 'demo',
							template, component.one.pattern,
							path.join(theatreTemplatePath, theatreStaticTemplate),
							'static', component.deps,
							theatreComponentsDestPath
						)()
					)
				, getFiles(
					path.join(component.path, 'demos'),
					R.compose(R.equals('.hbs'), R.takeLast(4))
				)
			)
		)
	);

/*
 *
 */
export function components() {
	return merge(
		getComponentFolderObjs(packageSrc).map(component =>
			merge(
				processComponentStates(packageSrc, component),
				processComponentDemos(packageSrc, component)
			)
		)
	);
}

/*
 *
 */
export function registerAtomPartials(cb) {
	getComponentFolderObjs(packageSrc).map((folder) => {
		const partial = path.join(packageSrc, folder.name, `${folder.name}.hbs`);
		return (fs.existsSync(partial)) ?
			hbs.registerPartial(folder.name, fs.readFileSync(partial, 'utf-8')) :
			undefined;
	});
	cb();
}

/*
 *
 */
export function sassComponents() {
	return gulp.src(componentStylePath)
		.pipe(stylelint({
			failAfterError: false,
			reporters: [
				{
					formatter: 'string',
					console: true
				}
			]
		}))
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
	registerHbsHelpers, registerAtomPartials, components // , molecules
);
export { buildComponentTemplates };

/*
 *
 */
const buildComponents = gulp.parallel(
	sassComponents,
	gulp.series(
		buildComponentTemplates, theatreJSON
	)
);
export { buildComponents };

/*
 *
 */
// eslint-disable-next-line no-unused-vars
// const buildComponent = component => gulp.series(
// 	registerHbsHelpers, () => processComponentStates(packageSrc, component)
// );

/*
 *
 */
// eslint-disable-next-line no-unused-vars
// const buildDependents = (component) => {
// 	// console.log('TBD');
// };

/*
 *
 */
// eslint-disable-next-line no-unused-vars
// const buildComponentAndDeps = component => gulp.series(
// 	registerHbsHelpers,
// 	() => processComponentStates(packageSrc, component),
// 	() => buildDependents(component)
// );

/*
 *
 */
// eslint-disable-next-line no-unused-vars
export function theatreJSON(cb) {
	const allComponents = {
		atoms: [],
		molecules: [],
		organisms: [],
		templates: [],
		pages: []
	};

	getComponentFolderObjs(packageSrc).forEach((folder) => {
		allComponents[`${folder.one.pattern}s`].push(
			{
				name: folder.one.name,
				type: folder.one.type,
				states: glob.sync(path.join(folder.path, '/states/*.{json,yaml}')).map(file =>
					(path.parse(file)).name
				),
				demos: glob.sync(path.join(folder.path, '/demos/*.hbs')).map(file =>
					(path.parse(file)).name
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
	return gulp.watch(path.join(packageSrc, '/*/**/*.{hbs,json,yaml,scss}'))
		.on('change', (file) => {
			R.cond([
				// TODO: Create a function to only build one sass component & dependents
				[R.compose(R.equals(true), isTheatreSass),
					gulp.series(sassTheatre, theatreProxyTriggerUpdate)],
				// eslint-disable-next-line max-len
				[R.compose(R.equals(true), isTheatreTemplate),
					gulp.series(buildComponentTemplates, theatreJSON, theatreProxyTriggerUpdate)],
				[R.compose(R.equals(true), isSass),
					gulp.series(sassComponents, theatreProxyTriggerUpdate)],
				// TODO: Use a function to only build one component & dependents
				// eslint-disable-next-line max-len
				[R.compose(R.equals(true), isComponent),
					gulp.series(buildComponentTemplates, theatreJSON, theatreProxyTriggerUpdate)]
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
		.pipe(sass({ includePaths: [componentStyleLibPath] }).on('error', sass.logError))
		.pipe(gulp.dest(theatreDestPath));
}

/*
 * Reload browser sync
 */
export function browserSyncReload(cb) {
	browserSync.reload();
	cb();
}

export function theatreProxyTriggerUpdate(cb) {
	// Tell theatre we've updated
	request.put({
		url: 'http://localhost:4112/updated',
		json: true,
		body: {
			component: 'name'
		}
	},
	// eslint-disable-next-line no-unused-vars
	(error, response, body) => {
		if (error) {
			gutil.log(error);
		}

		cb();
	});
}

/*
 *
 */
const cleanBuildComponents = gulp.series(clean, sassTheatre, buildComponents);
export { cleanBuildComponents };

/*
 *
 */
const cleanWatchComponents = gulp.series(cleanBuildComponents, watchComponents);
export { cleanWatchComponents };

/*
 * Export a default task
 */
export default cleanBuildComponents;
