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
      redirect: CONFIG.BASE_URL,
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
  async getPosts(tags) {
    return await handlePromiseGet('/posts', tags ? { tag: tags } : {});
  }

  async toggleEye() {
    return await handlePromiseGet('/toggleEye');
  }

  async toggleHand() {
    return await handlePromiseGet('/toggleHand');
  }

  // async addPost(post) {
  //   return await handlePromisePost('/posts', post);
  // }
}

export default new Api();

// /*
//   {headers: authHeader()}
//   Record<string, string>
// */
// function authHeader(Iany) {
//   const tokenStr = localStorage.getItem('accessToken');
//   return tokenStr
//     ? {
//       headers: { 'Authorization': tokenStr },
//       ...Iany,
//     }
//     : { ...Iany };
// }

// eslint-disable-next-line no-unused-vars
const handlePromiseGet = async (url, params = {}) => {
  return new Promise((resolve, reject) => {
    Interceptor.getInstance()
      .get(CONFIG.API_SERVER + url, { params: params })
      .then((res) => res.data)
      .then((res) => {
        if (!res.error) resolve(res.data);
        throw new Error(res.error);
      })
      .catch((e) => reject(e));
  });
};
