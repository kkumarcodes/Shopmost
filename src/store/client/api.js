import MaxstoreClient from 'maxstore-client'
import clientSettings from './settings'

const api = new MaxstoreClient({
  ajaxBaseUrl: clientSettings.ajaxBaseUrl || '/ajax'
});

export default api;
