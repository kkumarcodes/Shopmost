

# Theme overview

A theme is a component of Shopmost application which provides a consistent look and feel (visual design) for entire application area (for example, storefront or Shopmost admin panel) using a combination of custom templates, styles or images.

In Shopmost, themes are designed to override or customize view layer, provided initially by modules or libraries.

Just like [modules](/docs/development/module/module-overview), [Themes](./theme-overview) are implemented by different vendors (frontend developers) and intended to be distributed as additional packages for Shopmost system.

Out-of-the-box [Shopmost](https://shopmost.io/) application provides a default theme as a demonstration theme, which is fully customizable so you can develop your theme based on it.

You can use the default theme for a live store, but if you want to customize the default design, you need to create a new theme. We strongly recommend not to change the default directly, because if you do edit the default files, your changes can be overwritten by the new version of the default files during upgrades.

:::info
You can checkout this repo for an example of theme [Eve Theme](https://github.com/shopmostcommerce/evetheme). It is a simple theme that helps you to understand how to create a theme for Shopmost.
:::

## Where are themes located?

### The default theme

If you already see the [module overview document](../module/module-overview), you know that Shopmost is a modular application, all functionality is implemented and delivered in components that are known as Modules. The theme is also implemented and delivered in modules too. 

It means that every single module has its own `view` part to take care of the UI/UX. And this `view` part is designed to be easily customized without modifying the core files.

In each module, you can find a `pages` folder which contains all the files related to the UI/UX of the module. This folder contains the following sub-folders:

- `admin` folder: contains all pages related to the admin panel.
- `storefront` folder: contains all pages related to the storefront.
- `global` folder: This special folder contains middlewares that are used in both admin and storefront.

```bash
catalog
├── pages
    ├── global
    ├── admin
    │   ├── all
    │   ├── attributeEdit
    │   ├── attributeEdit+attributeNew
    │   ├── attributeGrid
    │   ├── attributeNew
    │   ├── categoryEdit
    │   ├── categoryEdit+categoryNew
    │   ├── categoryGrid
    │   ├── categoryNew
    │   ├── productEdit
    │   ├── productEdit+productNew
    │   ├── productGrid
    │   └── productNew
    └── frontStore
        ├── categoryView
        ├── homepage
        └── productView
```

:::info
You can learn more about the `view` part of the module in the [module view system](../theme/view-system.md).
:::

### The vendor themes

Themes that provided by vendors/developers are located in the folder named ‘themes’. This folder is located at the [root level of your project](/docs/development/knowledge-base/architecture-overview).

Each theme must be stored in a separate directory

```bash
*/themes/
├── <theme1>
├── <theme2>
├── <theme3>
├--...
```

## Theme structure

### Theme name

A theme folder will be used as the theme name. So make sure you don’t have any whitespace or special characters in the directory name of your theme.

The structure of a Shopmost theme directory typically would be like following

```bash
/themes/
    <justatheme>/
    ├── public # public assets, can be used to store images, fonts, etc.
    ├── components # React components. Contains shared components that can be used in multiple pages.
    |   ├── common
    |   ├── catalog
    |   ├── checkout
    └── pages # Every sub-folder represents a page.
        ├── all # Components located in this folder will be used in all pages.
        │   ├── All.jsx #Master level components.
        ├── categoryView
        │   └── FreeShippingBanner.jsx #Master level components.
        ├── checkout
        │   └── CheckoutOnly.jsx #Master level components.
        └── homepage
            └── HomepageOnly.jsx #Master level components.
```

#### The `public` folder

The `public` folder is used to store public assets such as images, fonts, css etc. You can use these assets in your theme by using the `public` folder as the base path.

You can access to the file `public/images/logo.png` by using the following code:

```jsx
<img src="/images/logo.png" />
```

#### The 'pages' folder

The `pages` folder is used to add new components to the existing pages. For example, if you want to add a new component to the homepage, you can create a new file in the `pages/homepage` folder.

In the above example, we have a file named `HomepageOnly.jsx` in the `pages/homepage` folder. This file will be used to add a new component to the homepage only.

### The `components` folder

The `components` folder is used store shared components that can be used in multiple pages. For example, if you want to add a new component to the homepage and the category page, you can create a new file in the `components/common` folder.

## Theme configuration

You can configure your theme in the `config/default.js` file located in the root directory of your project.

```json
{
  "system": {
    ..., // other configurations
    "theme": "justatheme"
  }
}
```

:::warning
Changing a theme requires running the `build` command again.
:::

## Example theme

You can checkout this repo for an example of theme [Eve Theme](https://github.com/shopmostcommerce/evetheme). It is a simple theme that helps you to understand how to create a theme for Shopmost.