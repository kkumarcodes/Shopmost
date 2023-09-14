
# Styling

Shopmost supports including importing CSS files. It also support Sass or TailwindCss out of the box. This document will guide you through the process of styling your component and page.

## Scss file

By default, Shopmost supports importing SCSS files. You can import SCSS files from any component or page in your application.

```js
import React from 'react';
import './style.scss';
```

:::warning
Note that the file extension must be `.scss` (NOT `.css`).
:::

## TailwindCss

Shopmost supports [TailwindCss](https://tailwindcss.com/) out of the box. The default Shopmost theme uses TailwindCss for styling. 

If you do not want to use TailwindCss, you create a Layout template to override the default one from the CMS module and remove the `tailwind.scss` file.

:::info
Check out the [templating document](./templating) to learn more about customizing the layout template.
:::

If you override the default layout template from the cms core module, and keep using TailwindCss, you need to add the `tailwind.scss` file to your layout template.

```html title="tailwind.scss"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

and then import the `tailwind.scss` file in your component.

```js title="<yourtheme>/pages/all/Layout.js"
import React from 'react';
import './tailwind.scss';
```

That is all. Now you can use TailwindCss in your components.

### Overwrite the TailwindCss configuration from your theme

You can overwrite the default TailwindCss configuration by creating a `tailwind.config.js` file in your theme folder.

```js title="themes/friday/tailwind.config.js"
module.exports = {
  corePlugins: {
    // ...
    lineHeight: false,
    placeholder: false,
    placeholderOpacity: false,
    textOpacity: false,
    backgroundOpacity: false,
    backgroundPosition: false,
    backgroundImage: false,
    gradientColorStops: false,
    borderOpacity: false,
    divideColor: false,
    divideOpacity: false,
    ringOpacity: false,
    ringOffsetColor: false,
    mixBlendMode: false,
    backgroundBlendMode: false,
    brightness: false,
    contrast: false,
    dropShadow: false,
    hueRotate: false,
    invert: false,
    saturate: false,
    sepia: false,
    backdropFilter: false,
    backdropBlur: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
    transitionDelay: false,
    transform: false,
    transformOrigin: false,
    scale: false,
    rotate: false,
    translate: false,
    skew: false
  },
  theme: {
    fontFamily: {
      sans: 'Helvetica,Helvetica Neue,Arial,Lucida Grande,sans-serif'
    },
    fontSize: {
      base: '.875rem'
    },
    colors: {
      white: '#ffffff',
      primary: '#3a3a3a',
      secondary: '#111213'
    },
    spacing: {
      0: '0px'
    },
    margin: {
      0: '0px'
    },
    borderRadius: {
      DEFAULT: '0.25rem',
      100: '100%'
    },
    borderWidth: {
      0: '0px',
      DEFAULT: '1px'
    },
    opacity: {

    },
    boxShadow: {
      DEFAULT: '0 0 0 1px rgba(63,63,68,.05),0 1px 3px 0 rgba(63,63,68,.15)'
    }
  },
  variants: {
    extend: {
      borderWidth: ['first', 'last'],
      margin: ['first', 'last'],
      padding: ['first', 'last']
    }
  },
  plugins: []
};
```

:::warning
Adding the `tailwind.config.js` file requires you to restart the development server.
:::

## Sass

Shopmost supports [Sass](https://sass-lang.com/) out of the box. You can use Sass in your components and pages.

```css
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

## Global CSS

There are two ways to include global CSS files in your application. 

### Using configuration file

You can add the CSS files to the `css` array in the `config/default.json` file.

```js title="config/default.json"
{
  ...,
  "themeConfig": {
        "headTags": {
            "links": [
                {
                    "rel": "stylesheet",
                    "href": "/custom.css"
                }
            ]
        }
    }
}
```


:::info
Please check the [configuration guide](../knowledge-base/configuration-guide) for more information about the `themeConfig` configuration.
:::

### Import css file from your custom component

You can import the CSS files from your custom component. You need to make sure this component is used in all pages of your storefront.

```js title="themes/mytheme/pages/all/Global.jsx"
import React from 'react';
import './bootstrap.css';

export default function Global() {
  return <></>;
}

export const layout = {
  areaId: 'head',
  sortOrder: 1
}
```