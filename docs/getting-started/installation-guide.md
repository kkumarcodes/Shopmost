# Installation guide

The following installation guides will guide you step-by-step to create a new Shopmost project and get it started.

:::info

Please check [this document](/getting-started/system-requirements) for the system requirement list.

### Step 1: Run the installation script

Before running this script, make sure that you have an empty database ready for Shopmost.
:::info

Please check [this document](/getting-started/system-requirements) for the system requirement list.

:::
This installation script will do the following tasks:

- Create a default configuration file.
- Create a database schema.
- Create your administrator user.

```js title="Installation script"
npm run setup
```

:::caution

During the installation process, you will be asked for some information like database connection, your shop information…

:::

### Step 2: Folder permision

Shopmost needs to write some files to the disk. So you need to make sure that the following folders have the write permission:

- `public/`
- `build`
- `.log`
- `media`

### Step 3: Run the `build` command to build the site

```js title="Build the site"
npm run build
```

### Step 4: Run the `start` command to start your store in production mode

```js title="Start the site"
npm run start
```

Your site will start at `http://localhost:3000`.

Admin panel can be accessed at `http://localhost:3000/admin`.

## For developer

If you are developer and want to start the project in the development mode. There are some extra steps
