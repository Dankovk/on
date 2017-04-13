# Theatre

A **One** component development and testing ground.

### Components

Components are standalone and exist in their own packages in this [lerna](https://lernajs.io/) monorepo, 
under the `packages/` directory, next to this one, `packages/theatre`.

Static components have no prefix, Angular components have the prefix `ng-`.

The metadata for each **One** component is listed in the `package.json` for each component under the key
`one`.

E.g. (`one/packages/buttons/package.json`)

	{
		"name": "@one/button",
		"description": "The static One component for a button",
		"version": "0.1.0",
		"license": "UNLICENSED",
		"one": {
			"name": "button",
			"type": "static",
			"pattern": "atom"
		},
		"repository": {
			"type": "git",
			"url": ""
		},
		"dependencies": {

		}
	}

Where:

* `name` is the canonical name of the component (links static and angular components under the same name, 
since their repositories have different names, `packages/button` vs. `packages/ng-button`)
* `type` is the name of the type of component, `static` or `angular`
* `pattern` is the name of the [atomic design pattern](http://atomicdesign.bradfrost.com/chapter-2/) the 
component is categorized under

## Spec

![](spec/Theatre.UI.png)

### URLs

* `/` → Home, navigation & type toggles are visible, nothing loaded in the Demo and State list or stage.
* Component URLs
	* `/atoms/<atom name>/<type>`
	* `/atoms/<atom name>/demo/<demo>/<type>`
	* `/atoms/<atom name>/state/<state>/<type>`
	* — — —
	* `/molecules/<molecule name>/<type>`
	* `/molecules/<molecule name>/demo/<demo>/<type>`
	* `/molecules/<molecule name>/state/<state>/<type>`
	* — — —
	* `/organisms/<organism name>/<type>`
	* `/organisms/<atom name>/demo/<demo>/<type>`
	* `/organisms/<atom name>/state/<state>/<type>`
	* — — —
	* `/templates/<template name>/<type>`
	* `/templates/<template name>/demo/<demo>/<type>`
	* `/templates/<template name>/state/<state>/<type>`
	* — — —
	* `/pages/<page name>/<type>`
	* `/pages/<page name>/demo/<demo>/<type>`
	* `/pages/<page name>/state/<state>/<type>`

Where:

* `<___ name>` → component package.json `one:name`
* `<type>` → component package.json `one:type`
	* Note: if the `<type>` is omitted from the URL, theatre should use the value of the Type Toggle filter
	  and redirect to the full, valid URL
* `<demo>` → component's valid demos
* `<state>` → component's valid states
* a component's package.json `one:pattern` value determines where the component gets categorized in the 
url scheme

### Navigation

Each navigation item (atoms, molecules, organisms, templates, and pages) corresponds to an 
[Atomic Design](http://atomicdesign.bradfrost.com/chapter-2/) pattern, and when clicked, will activate a
dropdown menu of all available components for each pattern.

The link to each component in the dropdown menu should be a link to a URL (described in the URLs section above) 
for each component.

The dropdown menu under each menu item is activated by clicking the link. The list should scroll independently if
the list is long enough to warrant it.

### Type Toggle

We will focus on two types of components, **Static** (`one:pattern: 'static'`, stored under `packages/` 
with no prefix) and **Angular** (`one:pattern: 'angular'`, stored under `packages/` with the prefix 
"ng-"). This toggle will adjust the component list to only show available demos and states for the selected type.

So for example, if a component didn't have any Angular extensions and the Angular type toggle were selected, 
the UI would not list any demos or states or show anything on the stage.

The Type Toggle should default to **Static** (for now!)

### Demo and State list

When a component's url is loaded, this will populate with the demos and states available, demos listed first. 
It can be assumed that the metadata for available demos and states will be available in the `dist/theatre/theatre.json`
file.

### Stage

When a demo or state is selected from the list on the left, the component should be loaded onto the stage (all 
the stage should do is display an iframe in the stage area. It can be assumed that a mapping of all 
demos and states to `.html` files will be available in the `dist/theatre/theatre.json` file.

### Initialization

The `@​one/theatre` application should:

* Populate its initial state from a file `dist/theatre/theatre.json`, which will contain all metadata needed 
to drive this UI
* Use a web socket to listen for update messages
	* For now, messages will only tell the theatre application that some component was updated (but not which one)
	* When message is recieved, theatre should:
		* Reload `dist/theatre/theatre.json`
		* Reinitialize (not reload) the current page 
			* Update the navigation menus
			* Update the current component
				* Update the state list
				* Update the stage

### Angular redux

The theatre is an Angular application using [Angular Redux](https://github.com/angular-redux) extensions 
for the redux [Store](https://github.com/angular-redux/store) and [Router](https://github.com/angular-redux/router)

Be sure to write Angular as plainly as possible, according to the 
[published style guide](https://angular.io/docs/ts/latest/guide/style-guide.html).

### Build

Make sure you are running node v6.9 or later.

#### Install root monorepo dependencies

From the `one` monorepo root:

Install development dependencies with: `npm i`

Install dependencies for sub packages with: `npm run lerna bootstrap`

#### Build the theatre application

From the `one` monorepo root (not the `packages/theare` directory), run the
command: `npm run gulp theatre`

#### View the theatre application

From the `one` monorepo root (not the `packages/theare` directory), run the
command: `npm run gulp serve`

Navigate to: `http://localhost:3000/theatre/`
