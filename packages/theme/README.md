# ocl-theme

OCL theme is a foundational module that provides theming to OCL components, and also makes it available to
developers as Sass functions and mixins, as CSS custom properties, and as a set of CSS classes.

The colors in this module are derived from the three theme colors in OCL-Web:
- Primary: the primary color used in your application. This applies to a number of UI elements, such as app bars.
- Accent: the accent color used in your application. This applies to UI elements such as FABs.
- Background: the background color for your application. This is the color on top of which your UI is drawn.

When using the theme colors as background, it becomes important to choose a text color with sufficient contrast.
In addition, it's important to consider the style of text:
- Primary, used for most text.
- Secondary, used for text which is lower in the visual hierarchy.
- Hint, used for text hints (such as those in text fields and labels).
- Disabled, used for text in disabled components and content.
- Icon, used for icons.

> Note: Don't confuse primary color with primary text. The former refers to the primary theme color, that is used
to establish a visual identity and color many parts of your application. The latter refers to the style of text
that is most prominent (low opacity, high contrast), and used to display most content.

The text contrast colors are automatically calculated at the Sass level and exposed as part of this module.

## Installation

```
npm install --save @material/theme
```

## Usage

### Sass

#### Changing the theme colors

OCL Theme makes it quite easy to change the theme colors for your application, and have the changes apply to all OCL
components. Simply define the three theme color variables before importing `ocl-theme` or any OCL components that rely
on it:

```scss
$ocl-theme-primary: #9c27b0;
$ocl-theme-accent: #ffab40;
$ocl-theme-background: #fff;

@import "@one/theme/ocl-theme";
```

The correct text colors will automatically be calculated based on the provided theme colors.


#### ocl-theme-prop mixin

OCL Theme exports an `ocl-theme-prop` mixin, which can be used to apply a theme color to a property. The mixin takes the
property name as the first parameter, and the desired color as the second one. It also has an optional boolean parameter
for whether `!important` should be applied to the value.

For example, if you wanted to set the background of `.foo` to the primary color, and the text color to suit primary text
on top of it:

```scss
@import "@material/theme/mixins";

.foo {
  @include ocl-theme-prop(background-color, primary);
  @include ocl-theme-prop(color, text-primary-on-primary);
}
```

This generates the following CSS:

```css
.foo {
  background-color: #9c27b0;
  background-color: var(--ocl-theme-primary);
  color: #fff;
  color: var(--ocl-theme-text-primary-on-primary);
}
```

The generated code uses CSS custom properties for browsers that support it, with a fallback to a pre-processed static
color if they don't. This enables runtime theming if CSS properties are available, in addition to the static theming
described in the "Changing the theme colors" section.

Here is the full list of colors available to the mixin:

##### Theme colors

| Class        | Description                 |
| ------------ | --------------------------- |
| `primary`    | The theme primary color.    |
| `accent`     | The theme accent color.     |
| `background` | The theme background color. |

##### Text on a theme primary color background

| Class                          | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| `text-primary-on-primary`      | Primary text on top of a theme primary color background.   |
| `text-secondary-on-primary`    | Secondary text on top of a theme primary color background. |
| `text-hint-on-primary`         | Hint text on top of a theme primary color background.      |
| `text-disabled-on-primary`     | Disabled text on top of a theme primary color background.  |
| `text-icon-on-primary`         | Icons on top of a theme primary color background.          |

##### Text on a theme accent color background

| Class                          | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| `text-primary-on-accent`       | Primary text on top of a theme accent color background.    |
| `text-secondary-on-accent`     | Secondary text on top of a theme accent color background.  |
| `text-hint-on-accent`          | Hint text on top of a theme accent color background.       |
| `text-disabled-on-accent`      | Disabled text on top of a theme accent color background.   |
| `text-icon-on-accent`          | Icons on top of a theme accent color background.           |

##### Text on the theme background

| Class                          | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| `text-primary-on-background`   | Primary text on top of the theme background.               |
| `text-secondary-on-background` | Secondary text on top of the theme background.             |
| `text-hint-on-background`      | Hint text on top of the theme background.                  |
| `text-disabled-on-background`  | Disabled text on top of the theme background.              |
| `text-icon-on-background`      | Icons on top of the theme background.                      |

##### Text on a light-colored background (useful for custom backgrounds)

| Class                          | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| `text-primary-on-light`        | Primary text on top of a light-colored background.         |
| `text-secondary-on-light`      | Secondary text on top of a light-colored background.       |
| `text-hint-on-light`           | Hint text on top of a light-colored background.            |
| `text-disabled-on-light`       | Disabled text on top of a light-colored background.        |
| `text-icon-on-light`           | Icons on top of a light-colored background.                |

##### Text on a dark-colored background (useful for custom backgrounds)

| Class                          | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| `text-primary-on-dark`         | Primary text on top of a dark-colored background.          |
| `text-secondary-on-dark`       | Secondary text on top of a dark-colored background.        |
| `text-hint-on-dark`            | Hint text on top of a dark-colored background.             |
| `text-disabled-on-dark`        | Disabled text on top of a dark-colored background.         |
| `text-icon-on-dark`            | Icons on top of a dark-colored background.                 |


#### ocl-theme-dark mixin

This mixin is mostly used for OCL component development, and provides a standard way of
applying dark themes to components. **Note that ocl-theme-dark does _not_ change any theme-wide
background colors**. Rather, `ocl-theme-dark` and its CSS classes are intended be used when certain
sections or treatments of a page use a darker color as its background, where the default colors we
use would not make sense.

`ocl-theme-dark` creates a suitable selector for a component, and applies the provided content
inside of it:

```scss
.ocl-foo {
  color: black;

  @include ocl-theme-dark {
    color: white;
  }

  &__bar {
    background: black;

    @include ocl-theme-dark(".ocl-foo") {
      background: white;
    }
  }
}

.ocl-foo--disabled {
  opacity: .38;

  @include ocl-theme-dark(".ocl-foo", /* $compound: */ true) {
    opacity: .5;
  }
}
```

> Note: If using the mixin on anything other than the base selector, you need to specify the base selector as a
parameter. This ensures that the `--theme-dark` option is appended to the right class.

> Note: If using the mixin with a modifier class, pass `true` for the second argument. This will tell the mixin to treat the selector it's being mixed into as a compound class rather than a descendant selector.

The above generates the following CSS:

```css
.ocl-foo {
  color: black;
}
.ocl-foo--theme-dark, .ocl-theme--dark .ocl-foo {
  color: white;
}
.ocl-foo__bar {
  background: black;
}
.ocl-foo--theme-dark .ocl-foo__bar, .ocl-theme--dark .ocl-foo__bar {
  background: white;
}

.ocl-foo--disabled {
  opacity: .38;
}
.ocl-foo--theme-dark.ocl-foo--disabled,
.ocl-theme--dark .ocl-foo--disabled {
  opacity: .5;
}
```

A user could thus apply a dark theme to a component by either targeting it specifically:

```html
<div class="ocl-foo ocl-foo--theme-dark"></div>
```

Or instead apply it to everything under a parent element, by using the `ocl-theme--dark` global modifier class:

```html
<body class="ocl-theme--dark">
  <div class="ocl-foo"></div>
</body>
```


#### Color functions

MDC Theme defines several functions, used in the process of determining the correct contrast color for a given
background.

##### ocl-theme-luminance

Calculates the luminance value (0 - 1) of a given color.

```scss
@debug ocl-theme-luminance(#9c27b0); // 0.11654
```

##### ocl-theme-contrast

Calculates the contrast ratio between two colors.

```scss
@debug ocl-theme-contrast(#9c27b0, #000); // 3.33071
```

##### ocl-theme-light-or-dark

Determines whether to use light or dark text on top of a given color.

```scss
@debug ocl-theme-light-or-dark(#9c27b0); // light
```

### CSS Classes

```html
<span class="ocl-theme--primary">
  Some text in the primary color.
</span>

<span class="ocl-theme--accent-bg ocl-theme--text-primary-on-accent">
  Some text on an accent color background.
</span>
```

> Note: These classes use `!important` on the values, since they're user-specified and are applied to ensure that a
particular color gets used.

There are a number of CSS classes available for taking advantage of theming.

#### Theme color classes

These classes set either the text color or the background color to one of the theme colors.

| Class                   | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `ocl-theme--primary`    | Sets the text color to the theme primary color.             |
| `ocl-theme--accent`     | Sets the text color to the theme accent color.              |
| `ocl-theme--background` | Sets the background color to the theme background color.    |
| `ocl-theme--primary-bg` | Sets the background color to the theme primary color.       |
| `ocl-theme--accent-bg`  | Sets the background color to the theme accent color.        |

#### Text colors for contrast

These classes set the text color to a suitable color to be used on top of a given background. The color to be used
depends on two criteria: the background color (namely, whether it's light or dark) and the text style.

##### Text on a theme primary color background

| Class                                     | Description                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `ocl-theme--text-primary-on-primary`      | Set text to suitable color for primary text on top of a theme primary color background.   |
| `ocl-theme--text-secondary-on-primary`    | Set text to suitable color for secondary text on top of a theme primary color background. |
| `ocl-theme--text-hint-on-primary`         | Set text to suitable color for hint text on top of a theme primary color background.      |
| `ocl-theme--text-disabled-on-primary`     | Set text to suitable color for disabled text on top of a theme primary color background.  |
| `ocl-theme--text-icon-on-primary`         | Set text to suitable color for icons on top of a theme primary color background.          |

##### Text on a theme accent color background

| Class                                     | Description                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `ocl-theme--text-primary-on-accent`       | Set text to suitable color for primary text on top of a theme accent color background.    |
| `ocl-theme--text-secondary-on-accent`     | Set text to suitable color for secondary text on top of a theme accent color background.  |
| `ocl-theme--text-hint-on-accent`          | Set text to suitable color for hint text on top of a theme accent color background.       |
| `ocl-theme--text-disabled-on-accent`      | Set text to suitable color for disabled text on top of a theme accent color background.   |
| `ocl-theme--text-icon-on-accent`          | Set text to suitable color for icons on top of a theme accent color background.           |

##### Text on the theme background

| Class                                     | Description                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `ocl-theme--text-primary-on-background`   | Set text to suitable color for primary text on top of the theme background.               |
| `ocl-theme--text-secondary-on-background` | Set text to suitable color for secondary text on top of the theme background.             |
| `ocl-theme--text-hint-on-background`      | Set text to suitable color for hint text on top of the theme background.                  |
| `ocl-theme--text-disabled-on-background`  | Set text to suitable color for disabled text on top of the theme background.              |
| `ocl-theme--text-icon-on-background`      | Set text to suitable color for icons on top of the theme background.                      |

##### Text on a light-colored background (useful for custom backgrounds)

| Class                                     | Description                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `ocl-theme--text-primary-on-light`        | Set text to suitable color for primary text on top of a light-colored background.         |
| `ocl-theme--text-secondary-on-light`      | Set text to suitable color for secondary text on top of a light-colored background.       |
| `ocl-theme--text-hint-on-light`           | Set text to suitable color for hint text on top of a light-colored background.            |
| `ocl-theme--text-disabled-on-light`       | Set text to suitable color for disabled text on top of a light-colored background.        |
| `ocl-theme--text-icon-on-light`           | Set text to suitable color for icons on top of a light-colored background.                |

##### Text on a dark-colored background (useful for custom backgrounds)

| Class                                     | Description                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `ocl-theme--text-primary-on-dark`         | Set text to suitable color for primary text on top of a dark-colored background.          |
| `ocl-theme--text-secondary-on-dark`       | Set text to suitable color for secondary text on top of a dark-colored background.        |
| `ocl-theme--text-hint-on-dark`            | Set text to suitable color for hint text on top of a dark-colored background.             |
| `ocl-theme--text-disabled-on-dark`        | Set text to suitable color for disabled text on top of a dark-colored background.         |
| `ocl-theme--text-icon-on-dark`            | Set text to suitable color for icons on top of a dark-colored background.                 |

