# One Component Library

The One Component Library is the de-facto UI component library for the Entrada Framework.

The first platform target for this project is the web (mobile and desktop) in two flavors: 
**Static** and **Angular**,  but the library aspires to also support the NativeScript 
platform in the future.

## Requirements

* Modularity
	* Components should have well-defined APIs that integrate, and if necessary, share code/styles.
* Responsive & well-supported
	* Components should be developed in a "mobile-first" style, compatible with recent versions of all
	major browsers.
* Complete
	* Components should be designed and implemented to work under a wide variety of situations, 
	therefore each one should have a determinable style for anticipated state.
* Tested
	* Unit tests should be used to validate CSS styles and Angular APIs.
* Internationalization
	* Care should be made to avoid any pattern or code that would render components unable to render in
	a non-English or RTL (right-to-left) language, or at the very least, document where a component falls short.
* Accesibility
	* Components should make their best attempt to achieve adequate [accessibility](http://a11yproject.com/),
	or at the very least, document where a component falls short.
* BEM
	* Like Material, **One** component styles will follow [BEM](http://getbem.com/) naming methodology.

## Contributing

Small changes (single commit, fixes, chores, etc) can be done in the `develop` branch.

To perform a commit, use the commitizen script: `npm run commit`.

* Choose the commit type from the prompts. 
* When asked to "Denote the scope of this change:", enter the name of _package_, if updating 
something outside a package, enter nothing.
* Don't use the BREAKING CHANGES feature yet (too early)
* Select any packages the commit affects

Larger changes (multi-commit, multi-contributor, features) should be done in their own feature 
branch, following the [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/) naming 
convention.

For example, a new feature called `my-new-feature` would get developed on `feature/my-new-feature` branch.

When a feature branch is ready to be merged into `develop`, push the feature branch up to BitBucket 
and open up a pull request for the feature branch into `develop`.



### Background / philosophy

**One** and other Entrada projects use the [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/) 
branching model. The most important concepts of this being:

* Releases always coming from `master`, built out of the `develop` branch
* Features are developed first in their own feature branches, then merged back to `develop` once completed

We use nearly all of the default settings, _except_ for using "v" for a tag prefix

```
Which branch should be used for bringing forth production releases?
   - master
Branch name for production releases: [master] 
Branch name for "next release" development: [develop] 

How to name your supporting branch prefixes?
Feature branches? [feature/] 
Release branches? [release/] 
Hotfix branches? [hotfix/] 
Support branches? [support/] 
Version tag prefix? [] v
```

These [extensions](https://github.com/nvie/gitflow) are very handy.

## Bugs / Issues

**One** and other Entrada projects keep detailed bugs/issues in the repository "Issues" area.

When opening an issue:

* Always put the package name first in the issue title—e.g. (@​one/theatre)

## Inspiration and Prior Art

* [Google Material Components](https://material.io/components/)

	Google's "Material Design" project best encompasses the thoughfulness, completeness, and 
	quality that **One**  aspires to.

	* [Material Components for the web](https://github.com/material-components/material-components-web)

		This project will serve as a guide and template for how we break up and style our static components

	* [Angular Material Components](https://github.com/angular/material2)

		This project will serve as a guide and template for how we implement the Angular extensions

* [The Atomic Design Pattern](http://atomicdesign.bradfrost.com/chapter-2/)

	**One** components will be categorized and combined conceptually under Brad Frost's "Atomic Design"
	principles. Using Atomic Design we can conceptualize and prototype whole swaths of Entrada simply
	by composition, leaving us with a fairly modular and independent UI.

	* [Pattern Lab](http://patternlab.io/)

		**One** aspires to have a dual-purpose Styleguide / Component testing ground called **Theatre**, 
		not unlike the Pattern Lab project.

* [Bootstrap](http://getbootstrap.com/)

	* Entrada V1 uses various Bootstrap components which may have to be ported (in-part) to **One** 
	to maintain a reasonable Entrada V1&mdash;V2 transition.

* [Instructure-UI](http://instructure.github.io/)
	
	* Despite not being an Angular component library, the organization, API, and presentation are impressive 
	and will help guide some aspects of component development and documentation.


## Theatre

A **One** component development and testing ground.

## Monorepo

This project uses [Lerna](https://lernajs.io/) to manage many subpackages within one project.
