

![Shopmost view system](./img/the-view-system.jpg "Shopmost view system")

The view is one of the most important parts of a web application. It is the part that the user interacts with.

Shopmost makes use of [React](https://reactjs.org/) to render the view. The page will be rendered on the server side and then sent to the client side. The client side does the Hydration process and make the page interactive.

The Shopmost view system was designed to be flexible and easy to extend. Third party developers can insert their own React components into the view system without having to modify the core code.

## The View

### Multi page application

The Shopmost is a multi page application. Each page has its own layout and components. The build process will generate a bundle file for each page. The bundle file will contain the HTML markup and the JavaScript code to render the page.

### Server-Side Rendering And Hydration

The Shopmost follows the server-side-rendering approach. The page will be rendered on the server side and sent to the client along with some JavaScript code. The client side will do the Hydration process to make the page fully interactive.

### Dynamic layout

Shopmost layout was designed to be flexible and easy to extend. Third party developers can insert their own React components into the layout without having to modify the core code. Check the [bellow section](#the-area-component) to understand more about how to extend the layout.

**Compared to a client-side Single-Page Application (SPA), the advantage of SSR primarily lies in**:

- **Faster time-to-content**: this is more prominent on slow internet or slow devices. Server-rendered markup doesn't need to wait until all JavaScript has been downloaded and executed to be displayed, so your user will see a fully-rendered page sooner. In addition, data fetching is done on the server-side for the initial visit, which likely has a faster connection to your database than the client. This generally results in improved Core Web Vitals metrics, better user experience, and can be critical for applications where time-to-content is directly associated with conversion rate.

- **Unified mental model**: you get to use the same language and the same declarative, component-oriented mental model for developing your entire app, instead of jumping back and forth between a backend templating system and a frontend framework.

- **Better SEO**: the search engine crawlers will directly see the fully rendered page.

### Fast Refresh

The Shopmost implements [Fast Refresh](../knowledge-base/fast-refresh). This feature helps to improve the developer experience and performance. This feature is only available in the development mode.

## The Module View

:::info
Please check [this document](../module/module-overview) to understand the structure of Shopmost module.
:::

Every module in Shopmost has a `pages` folder. This folder contains all of the React components that are used to render a page. The `pages` folder has the following structure:

Let's take an example of the `catalog` module:

```bash
catalog
├── api
├── pages
    ├── admin
    │   └── productEdit
    │       ├── route.json
    │       ├── index.js
    │       ├── General.jsx
    │       ├── Images.jsx
    │       ├── Price.jsx
    └── frontStore
        └── productView
            ├── route.json
            ├── index.js
            ├── ProductImages.jsx
            ├── ProductInfo.jsx
            ├── ProductOptions.jsx
```

The `pages` folder has 3 sub-folders: `admin`, `frontStore` and `global`. The `admin` folder contains all of admin panel pages. The `frontStore` folder contains pages for your store front. The `global` folder contains *middleware function* that are used in both admin panel and store front.

### Master components and page

Let's take a look again the `catalog` module:

```bash
catalog
├── api
├── pages
    ├── admin
    │   └── productEdit
    │       ├── route.json
    │       ├── index.js
    │       ├── General.jsx
    │       ├── Images.jsx
    │       └── Price.jsx
    └── frontStore
        ├── categoryView
        │   ├── route.json
        │   ├── index.js
        │   ├── CategoryInfo.jsx
        │   └── CategoryProducts.jsx
        └── productView
            ├── route.json
            ├── index.js
            ├── ProductImages.jsx
            ├── ProductInfo.jsx
            └── ProductOptions.jsx
            
```
In the above example, there are 3 pages: `productEdit`, `categoryView` and `productView`.
The `productEdit` is a admin panel page used to edit a product. The `categoryView` and `productView` are store front pages.

:::info
`productEdit`, `categoryView` and `productView` are route Id of the corresponding pages. The detail of the route(HTTP method, path) is defined in the `route.json` file. Check [this document](../knowledge-base/routing-system) for more information.
:::

The `index.js` file is a middleware function that will be called when the page is requested. You can add however many middleware functions you want to the page folder. The middleware functions will be executed in the order they are defined. Check [this document](../knowledge-base/middleware-system) for more information. 

To distinguish between a component and a middleware, the component file name must start with a capital letter. For example, `General.js` is a component and the middleware file name muse start with a lower case. `index.js` is a middleware.

:::warning
Every of master component must be provided as a default export.
:::

### Shared master components

Sometime, you may want to share a component between multiple pages. Let's say you have a `ProductInfo` component that is used in both `productNew` and `productEdit` pages. You can create a folder named `productNew + productEdit` in the `admin` folder and put the `ProductInfo.js` component in it. The `productNew + productEdit` folder is a shared folder. The `ProductInfo.js` component will be available in both `productNew` and `productEdit` pages.

```bash
catalog
├── pages
    ├── admin
    │   └── productNew+productEdit
    │       └── ProductInfo.jsx
    └── frontStore
```

## The `Area` Component

Let's take a look at the following layout:

import Layout from '@site/src/components/Layout';

<Layout/>
<br/>

Each of the block at the above layout is an `Area` and it has a unique ID.

The `Area` is a React Higher-Order component(HOC) that takes components as its child. It will render the child components and pass the `Area`'s props to the child components.

If a block is rendered by an Area component, third party developers can insert their own React components into the block without modifying the core code. That make the view system flexible and easy to extend.

### Using Area component:

Let's take a look at the following code:

```js title="src/components/Layout.jsx"
import React from 'react';
import Area from './lib/components/Area';

export default function Layout() {
  return (
    <div className="just-a-block">
      <Area id="blockId" />
    </div>
  );
}
```

In the above code, we declare a `Area` with the ID# `blockId`. The `Area` will render all of the child components that have the areaId = `blockId`.

You can also provide a list of pre-defined components to the `Area` component:

```js title="src/components/Layout.jsx"
import React from 'react';
import Area from './lib/components/Area';
import Top from './Top';
import Bottom from './Bottom';

export default function Layout() {
  return (
    <div className="just-a-block">
      <Area 
      id="blockId" 
      coreComponents={
        [
          {
            component: { default: () => <Top />},
            props: {
              title: 'Top',
            },
            sortOrder: 1
          },
          {
            component: { default: () => Bottom },
            props: {
              title: 'Bottom',
            },
            sortOrder: 2
          },
        ]
      }
      />
    </div>
  );
}
```

The `Area` component will render its child components in order of `sortOrder`.

### Injecting components into an `Area`

Let's say we have a page 'productView' with the bellow layout component:
  
```js title="src/modules/catalog/pages/frontStore/productView/Layout.jsx"
import React from 'react';
import Area from './lib/components/Area';

export default function Layout() {
  return (
    <div className="just-a-block">
      <Area id="productViewLeft" />
      <Area id="productViewRight" />
    </div>
  );
}
```

Now we want to insert a component into the left side of the product view page to show the product rating. We can create a new component named `ProductRating.js`:

```js title="src/modules/catalog/pages/frontStore/productView/ProductRating.jsx"
import React from 'react';
import Area from './lib/components/Area';

export default function ProductRating({stars}) {
  return (
    <div className="just-a-block">
      <Star stars = {stars} />
    </div>
  );
}
// highlight-start 

export const layout = {
  areaId: 'productViewLeft',
  sortOrder: 1
}

// highlight-end
```

Then we need to export the `layout` object from the `ProductRating.js` component. The `layout` object is used to tell the system where to insert the component into the page.

In above code, we export a `layout` object with the `areaId` and `sortOrder` properties. The `areaId` is the ID of the `Area` component that we want to insert the component into. The `sortOrder` is the order of the component in the `Area` component.

That's it. Now we can insert the `ProductRating` component into the `productView` page.

## The component data fetching

:::info
  Check [this document](../knowledge-base/data-fetching) for more information about how to fetch data in the component.
:::