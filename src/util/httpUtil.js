import Axios from "axios";

export default class HttpUtil {
  static defaultTimeout = 50000;

  static getExecutor = () => {
    var axios = Axios.create({ timeout: HttpUtil.defaultTimeout });
    return axios;
  };

  static executeGet = (url, params, headers) => {
    return HttpUtil._execute("get", url, null, params, headers);
  };

  static executePut = (url, data, params, headers) => {
    return HttpUtil._execute("put", url, data, params, headers);
  };

  static executeDelete = (url, data, params, headers) => {
    return HttpUtil._execute("delete", url, data, params, headers);
  };

  static executePost = (url, data, params, headers) => {
    return HttpUtil._execute("post", url, data, params, headers);
  };

  static _execute = (method, url, data, params, headers) => {
    let logMessage = `HttpUtil: [${method}] ${url}${params ? ` with params ${JSON.stringify(params)}` : ``}${
      headers ? ` with headers ${JSON.stringify(headers)}` : ``
    }${data ? ` with data ${JSON.stringify(data)}` : ``}`;

    return new Promise((resolve, reject) => {
      var axios = HttpUtil.getExecutor();

      var requestConfig = {
        method: method,
        url: url,
      };

      if (params) {
        requestConfig.params = params;
      }

      if (data) {
        requestConfig.data = data;
      }

      if (headers) {
        requestConfig.headers = headers;
      }

      axios
        .request(requestConfig)
        .then((response) => {
          //console.log(`${logMessage} [Response] status: ${response.status} body: ${JSON.stringify(response.data)}`);
          resolve(response);
        })
        .catch((err) => {
          console.log(`${logMessage}${err.response ? `[Response] status ${err.response.status} body: ${JSON.stringify(err.response.data)}` : ``}`);
          reject(err);
        });
    });
  };
}
