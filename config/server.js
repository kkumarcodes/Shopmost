// config used by server side only

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'shopmostdb'
const dbUser = process.env.DB_USER || 'mongoadmin';
const dbPass = process.env.DB_PASS || 'mongoadmin';
const dbCred = dbUser.length > 0 || dbPass.length > 0 ? `${dbUser}:${dbPass}@` : '';
const dbUrl = `mongodb://${dbCred}${dbHost}:${dbPort}/${dbName}`;

module.exports = {
  // used by Store (server side)
  apiBaseUrl: `http://localhost:3000/api/v1`,

  // used by Store (server and client side)
  ajaxBaseUrl: `http://localhost:3000/ajax`,

  // Access-Control-Allow-Origin
  storeBaseUrl: `http://localhost:3000`,

  // used by API
  adminLoginUrl: '/admin/login',

  apiListenPort: 3000,
  storeListenPort: 3001,

  // used by API
  mongodbServerUrl: dbUrl,

  smtpServer: {
    host: '',
    port: 0,
    secure: true,
    user: '',
    pass: '',
    fromName: '',
    fromAddress: ''
  },

  // key to sign tokens
  jwtSecretKey: '-',

  // key to sign store cookies
  cookieSecretKey: '-',

  // path to uploads
  categoriesUploadPath: 'public/content/images/categories',
  productsUploadPath: 'public/content/images/products',
  filesUploadPath: 'public/content',
  themeAssetsUploadPath: 'theme/assets/images',

  // url to uploads
  categoriesUploadUrl: '/images/categories',
  productsUploadUrl: '/images/products',
  filesUploadUrl: '',
  themeAssetsUploadUrl: '/assets/images',

  // store UI language
  language: 'en',

  // used by API
  orderStartNumber: 1000,

  developerMode: true
}
