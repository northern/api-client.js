
import Http from '@northern/http'

export default class Api {
  constructor(baseUrl, headers) {
    if (!baseUrl) {
      throw new Error('Missing baseUrl');
    }

    this.baseUrl = baseUrl;

    const defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    this.headers = headers || defaultHeaders;
  }

  addHeader(name, value) {
    this.headers[name] = value;
  }

  removeHeader(name) {
    delete this.headers[name];
  }

  getHeaders() {
    return this.headers;
  }

  hasHeader(name) {
    return this.headers[name] !== undefined;
  }

  get(path, additionalHeaders) {
    return this._call(Http.GET, path);
  }

  put(path, data, additionalHeaders) {
    return this._call(Http.PUT, path, data);
  }

  post(path, data, additionalHeaders) {
    return this._call(Http.POST, path, data);
  }

  delete(path, data, additionalHeaders) {
    return this._call(Http.DELETE, path, data);
  }

  _call(method, path, data, additionalHeaders) {
    if (additionalHeaders) {
      this.headers = Object.assign({}, this.headers, additionalHeaders);
    }

    // Prepare the request object.
    const request = {
      method: method,
      headers: this.headers,
    };

    // If data was provided then add it to the request body.
    if (data) {
      request['body'] = data;
    }

    return Http.call(`${this.baseUrl}${path}`, request);
  }
}
