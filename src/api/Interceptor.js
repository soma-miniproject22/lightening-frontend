import axios from 'axios';

import CONFIG from './config';

const baseURL = CONFIG.API_SERVER;

/**
 * Event Logger for API
 */
class Interceptor {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL,
    });

    this.instance = this.setupInterceptorsTo(this.instance);
  }

  getInstance() {
    return this.instance;
  }

  onRequest = (config) => {
    console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
  };

  onRequestError = (error) => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };

  onResponse = (response) => {
    console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
  };

  onResponseError = (error) => {
    console.error(`[response error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };

  setupInterceptorsTo(axiosInstance) {
    axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
    axiosInstance.interceptors.response.use(
      this.onResponse,
      this.onResponseError,
    );
    return axiosInstance;
  }
}

export default new Interceptor();
