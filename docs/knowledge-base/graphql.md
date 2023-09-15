

![Shopmost graphql system](./img/shopmost-graphql.jpg "Shopmost graphql system")

# Shopmost Graphql System

[Graphql](https://graphql.org/) is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.

In Shopmost we make use of [Graphql](https://graphql.org/) for server side data fetching and API for the font-end to consume.

## Graphql organization in Shopmost

In Shopmost, every module has its own graphQL folder. The graphql folder contains the type definition and resolvers for the module. Let's take a look at the graphql folder structure of the catalog module.

```bash
./
├── api
├── graphql
    └── types
        ├── Attribute
        │   ├── Attribute.graphql
        │   └── Attribute.resolvers.js
        ├── Category
        │   ├── Category.graphql
        │   └── Category.resolvers.js
        ├── FeaturedCategory
        │   ├── FeaturedCategory.graphql
        │   └── FeaturedCategory.resolvers.js
        ├── FeaturedProduct
        │   ├── FeaturedProduct.graphql
        │   └── FeaturedProduct.resolvers.js
        └── Product
            ├── Attribute
            │   ├── ProductAttribute.graphql
            │   └── ProductAttribute.resolvers.js
            ├── CustomOption
            │   ├── CustomOption.graphql
            │   └── CustomOption.resolvers.js
            ├── Image
            │   ├── ProductImage.graphql
            │   └── ProductImage.resolvers.js
            ├── Inventory
            │   ├── Inventory.resolvers.js
            │   └── TypeDef.graphql
            ├── Price
            │   ├── ProductPrice.graphql
            │   └── ProductPrice.resolvers.js
            ├── Product.graphql
            ├── Product.resolvers.js
            └── Variant
                ├── Variant.graphql
                └── Variant.resolvers.js
```

## GraphQL Type definition

The graphql type definition is written in the [GraphQL Schema Definition Language](https://graphql.org/learn/schema/). The type definition is used to define the type of the data that can be fetched from the server.

In Shopmost, to create a new graphql type, we need to create a new folder with the name of the type in the `graphql/types` folder. The folder name should be in PascalCase. The folder should contain two files, one for the type definition and one for the resolvers.

The type definition file must have the `.graphql` extension.

```graphql title="Product.graphql"
type Product {
  productId: ID!
  name: String!
  status: Int!
  sku: String!
  weight: Weight!
  taxClass: Int
  description: String
  urlKey: String
  metaTitle: String
  metaDescription: String
  metaKeywords: String
  variantGroupId: ID
  visibility: Int
  groupId: ID
  categories: [Category]
  url: String
  editUrl: String
}
```

### Extend an existing type

During start-up, Shopmost will consolidate the type definitions and resolvers from many local schema instances into a single executable schema. This is useful for building a single local service schema from many individually-managed parts.

To extend an existing type, we use the `extend` keyword.

Let's say you develop an extension and you want to add a new field to the `Product` type. You can do it by adding the following code to your type definition file.


```graphql title="YourType.graphql":
extend type Product {
  yourField: String
}
```

Below is an example of extending the root type `Query` type to add our `Product` type.

```graphql title="Product.graphql"
type Product {
  productId: ID!
  name: String!
  status: Int!
  sku: String!
  weight: Weight!
  taxClass: Int
  description: String
  urlKey: String
  metaTitle: String
  metaDescription: String
  metaKeywords: String
  variantGroupId: ID
  visibility: Int
  groupId: ID
  categories: [Category]
  url: String
  editUrl: String
}

extend type Query {
  product(id: ID): Product
}
```

## GraphQL Resolvers

The resolvers are used to fetch the data from the database. The resolvers are written in javascript. The resolvers file must have the `.resolvers.js` extension.

```js title="Product.resolvers.js"
const { select } = require('../../../../postgres-query-builder');
const { buildUrl } = require('../../../../lib/router/buildUrl');
const { camelCase } = require('../../../../lib/util/camelCase');

module.exports = {
  Product: {
    categories: async (product, _, { pool }) => {
      const query = select()
        .from('category');
      query.leftJoin('category_description', 'des')
        .on('des.`category_description_category_id`', '=', 'category.`category_id`')
      return (
        await query
          .where(
            'category_id',
            'IN',
            (await select('category_id')
              .from('product_category')
              .where('product_id', '=', product.productId)
              .execute(pool)).map((row) => row.category_id)
          )
          .execute(pool)).map((row) => camelCase(row));
    },
    url: (product, _, { pool }) => {
      return buildUrl('productView', { url_key: product.urlKey });
    },
    editUrl: (product, _, { pool }) => {
      return buildUrl('productEdit', { id: product.productId });
    }
  },
  Query: {
    product: async (_, { id }, { pool }) => {
      const query = select()
        .from('product');
      query.leftJoin('product_description').on('product_description.`product_description_product_id`', '=', 'product.`product_id`')
      query.where('product_id', '=', id)
      const result = await query.load(pool);
      if (!result) {
        return null
      } else {
        return camelCase(result);
      }
    }
  }
}
```

## GraphQL In Use

:::info
  Check [data fetching document](./data-fetching) for more information about data fetching.
:::