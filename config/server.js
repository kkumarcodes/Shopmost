// config used by server side only

const dbHost = process.env.DB_HOST || 'ds263460.mlab.com';
const dbPort = process.env.DB_PORT || 63460;
const dbName = process.env.DB_NAME || 'maxstoredb'
const dbUser = process.env.DB_USER || 'smartmaxdev';
const dbPass = process.env.DB_PASS || 'maxstore1';
const dbCred = dbUser.length > 0 || dbPass.length > 0 ? `${dbUser}:${dbPass}@` : '';
const dbUrl = `mongodb://${dbCred}${dbHost}:${dbPort}/${dbName}`;

module.exports = {
  // used by Store (server side)
  apiBaseUrl: `http://176.104.107.227/api/v1`,

  // used by Store (server and client side)
  ajaxBaseUrl: `http://176.104.107.227/ajax`,

  // Access-Control-Allow-Origin
  storeBaseUrl: `http://176.104.107.227`,

  // used by API
  adminLoginUrl: '/admin/login',

  apiListenPort: 3007,
  storeListenPort: 3009,

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
