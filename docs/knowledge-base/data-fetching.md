![Data Fetching In Shopmost](./img/data-fetching-shopmost.png "Data Fetching In Shopmost")

# Data Fetching In Shopmost

Shopmost makes use of [GraphQL](https://graphql.org/) for data fetching. GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.

:::info
Check this [GraphQL document](/docs/knowledge-base/graphql) to learn more about GraphQL in Shopmost.
:::

Shopmost allows you to fetch data for your [React](https://reactjs.org/) components using the GraphQL query language. This document explains how to fetch data from the server using GraphQL.

## GraphQL Query In React Component

When you create a React component that needs some data for SSR(Server Side Rendering), you need to fetch the data from the server during the request time. To do this, all you need to do is export a GraphQL query in React component file. The query will be executed on the server and the result will be passed to React component as a prop.

Let's take a look below example:

```js title="modules/catalog/pages/productView/GeneralInformation.jsx"
export default function GeneralInfo({ product }) {
  return (
    <Area
      id="productViewGeneralInfo"
      coreComponents={[
        {
          component: { default: Name },
          props: {
            name: product.name
          },
          sortOrder: 10,
          id: 'productSingleName'
        },
        {
          component: { default: Price },
          props: {
            regular: product.price.regular,
            special: product.price.special
          },
          sortOrder: 10,
          id: 'productSinglePrice'
        },
        {
          component: { default: Sku },
          props: {
            sku: product.sku
          },
          sortOrder: 20,
          id: 'productSingleSku'
        }
      ]}
    />
  );
}

// highlight-start

export const query = `
  query Query {
    product (id: getContextValue('productId')) {
      name
      sku
      price {
        regular {
          value
          text
        }
        special {
          value
          text
        }
      }
    }
  }`;

  // highlight-end
```

In the above example, we have exported a GraphQL query in the `GeneralInformation.js` component file. During the request time, Shopmost will consolidate all the queries from all the components and execute them in a single request. The result of the GraphQL query will be passed to the React component as a prop.

### When is the GraphQL query executed?

The query will be executed on the server during the request time. The query will be executed only if the component is rendered on the server.

The graphQL query will be strimmed from the component file and will be executed on the server. The result of the query will be passed to the component as a prop.

### The GraphQL query format

:::warning
Since the build process will use Regex to parse for the query, collect and remove them from the component file, you have to make sure the the export statement must follow the below format:

```js
export const query = `<Your GraphQL query>`;
```
:::

### The `getContextValue` function.

Sometime you need to pass some arguments to the GraphQL query. For example, you want to fetch the product details for a specific product. In this case, you need to pass the product id to the GraphQL query. To do this, you can use the `getContextValue` function. The `getContextValue` function will return the value of the context key that you pass to it.

```js title="modules/catalog/pages/productView/GeneralInformation.jsx"
export const query = `
  query Query {
    product (id: getContextValue('productId')) {
      name
      sku
      price {
        regular {
          value
          text
        }
        special {
          value
          text
        }
      }
    }
  }`;
```

To add a value to the context, we can use middleware function to add the value to the context. Let's take a look at the below example:

```js title="modules/catalog/pages/categoryView/index.js"
const { select } = require('../../../../bin/postgres-query-builder');
const { pool } = require('../../../../lib/postgres/connection');
const { setContextValue } = require('../../../../graphql/services/contextHelper');

module.exports = async (request, response, stack, next) => {
  try {
    const query = select();
    query.from('category')
      .leftJoin('category_description')
      .on('category.`category_id`', '=', 'category_description.`category_description_category_id`');

    query.where('category_description.`url_key`', '=', request.params.url_key);
    const category = await query.load(pool);
    if (category === null) {
      response.status(404);
      next();
    } else {
      setContextValue(request, 'categoryId', category.category_id);
      setContextValue(request, 'pageInfo', {
        title: category.meta_title || category.name,
        description: category.meta_description || category.short_description,
        url: request.url
      });
      next();
    }
  } catch (e) {
    next(e);
  }
};
```

In the above example, we have a middleware function `index.js` to validate the category availability. If the category is available, we will add the category id to the context by using `setContextValue` function. The `getContextValue` function will return the category id that we have added to the context.

### The `setContextValue` function.

This function is used to add a value to the graphQL execution context. The `setContextValue` function accepts three arguments:

- `request`: The request object.
- `key`: The key of the context.
- `value`: The value of the context.

:::info
By default, Shopmost will add the all the data in current `request` object to the context. For example you can call the `getContextValue('url')` function to get the current request url.
:::

## Client Side Data Fetching

### GraphQL API endpoint

Shopmost provides a GraphQL API endpoint to fetch data from the server. The GraphQL API endpoint is available at `/graphql` path. You can use the GraphQL API endpoint to fetch data from the server.

### The `useQuery` hook from URQL

Shopmost makes use of [URQL](https://formidable.com/open-source/urql/) to fetch data from the server using graphQL API. URQL is a GraphQL client that helps you fetch data from the server. It is a fully-featured GraphQL client that supports all GraphQL features and can be used with any GraphQL server.

Example:
  
```js
import React from 'react';
import { useQuery } from 'urql';

const TodosQuery = `
  query {
    todos {
      id
      title
    }
  }
`;

const Todos = () => {
  const [result, reexecuteQuery] = useQuery({
    query: TodosQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ul>
      {data.todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};
```