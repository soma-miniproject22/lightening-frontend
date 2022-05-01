import Interceptor from './Interceptor';
import CONFIG from './config';

class Api {
  /**
   *  User Login
   *  @param {string}  redirect - url
   *  @return {Object} response
   *  @example
   *  ``` json
   *  {
   *    "id": "UUID",
   *    "dateTime": "datetime",
   *    "success": true,
   *    "response": "https://github.com/login/oauth/authorize?client_id=0c696e3a1df74b0acf03&redirect_uri=http://localhost:8080/api/oauth2/code/github?redirect=http://localhost:3000",
   *    "error": null
   *  }
   *  ```
   */
  async signin() {
    return await handlePromiseGet('/authenticate/github', {
      redirect: CONFIG.BASE_URL + '/redirect',
    });
  }

  /**
   *  get Information of Posts
   *  @param {Date} required_date - required_date of cards
   *  @return {Object} response
   *  @example
   *  ``` json
   *  {
   *    "dateTime": "datetime",
   *    "success": true,
   *    "response": [{
   *      "제목": "string",
   *      "장소(optional)": "string",
   *      "약속시간": "datetime",
   *      "종류": "enum(밥|커피|술)",
   *      "모집인원": "number",
   *      "모집상태": "enum",
   *     }],
   *    "error": null
   *  }
   *  ```
   */
  async getPosts(info) {
    return await handlePromiseGet('/posts', info ? info : {});
  }

  async pushPost(info, token) {
    return await handlePromisePost('/post', info, token);
  }

  async toggleEye(info, token) {
    return await handlePromisePost('/post/emotion', info, token);
  }

  async toggleHand(info, token) {
    return await handlePromisePost('/post/emotion', info, token);
  }

  async getUser(token) {
    return await handlePromiseGet('/user', {}, token);
  }
}

export default new Api();

/*
  {headers: authHeader()}
  Record<string, string>
*/
function authHeader(token) {
  // eslint-disable-next-line no-unused-vars
  return token
    ? {
        headers: { Authorization: `Bearer ${token}` },
      }
    : {};
}

// eslint-disable-next-line no-unused-vars
const handlePromiseGet = async (url, params = {}, token = '') => {
  return new Promise((resolve, reject) => {
    Interceptor.getInstance()
      .get(CONFIG.API_SERVER + url, { params: params, ...authHeader(token) })
      .then((res) => res.data)
      .then((res) => {
        if (!res.error) resolve(res);
        throw new Error(res.error);
      })
      .catch((e) => reject(e));
  });
};

const handlePromisePost = async (url, params = {}, token = '') => {
  return new Promise((resolve, reject) => {
    Interceptor.getInstance()
      .post(CONFIG.API_SERVER + url, params, authHeader(token))
      .then((res) => res.data)
      .then((res) => {
        if (!res.error) resolve(res);
        throw new Error(res.error);
      })
      .catch((e) => reject(e));
  });
};
