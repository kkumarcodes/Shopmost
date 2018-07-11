import MaxstoreClient from 'maxstore-client'
import clientSettings from '../../../config/store'

const api = new MaxstoreClient({
  ajaxBaseUrl: clientSettings.ajaxBaseUrl || '/ajax'
});

export default api;
