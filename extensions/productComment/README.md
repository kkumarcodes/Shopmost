# ShopMost product comment extension

This is the source code for the ShopMost extension development guide: [ShopMost product comment extension](https://shopmost.io/docs/development/module/create-first-extension).

## Installation

```bash
npm install @shopmost/productcomment
```

Add the extension to your `config/default.json` file:

```json
{
  "system": {
        "extensions": [
            {
                "name": "productcomment",
                "resolve": "node_modules/@shopmost/productcomment",
                "enabled": true
            }
        ]
    }
}
```