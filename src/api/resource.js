import axios from 'axios';
import handler from './handler';

const ENVIRONMENT = process.env.REACT_APP__STAGE || 'local';
// eslint-disable-next-line import/no-dynamic-require
const CONFIG_ENVIRONMENT = require(`../config/${ENVIRONMENT.toLowerCase()}.json`);

const { apiBaseUrl } = CONFIG_ENVIRONMENT.env;

function createResource() {
  const instance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line no-param-reassign
      config.params.format = 'json';
      // eslint-disable-next-line no-param-reassign
      config.params.seed = 'ajaib';
      return config;
    },

    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },

    (error) => {
      return handler(error);
    }
  );

  return instance;
}

export default createResource();
