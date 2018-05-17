
import Http from '@northern/http.js'

export default class Api {
  constructor(baseUrl, session = null) {
    this.baseUrl = baseUrl;
    this.session = session;
  }

  set session(session) {
    this._session = session;
  }

  get(path) {
    return this._call(Http.GET, path);
  }

  put(path, data) {
    return this._call(Http.PUT, path, data);
  }

  post(path, data) {
    return this._call(Http.POST, path, data);
  }

  delete(path, data) {
    return this._call(Http.DELETE, path, data);
  }

  _call(method, path, data, headers) {
    if (!headers) {
      headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
    }

    if (this._session) {
      // TODO: Check if session is expired.

      // If a session was set then get the access token from it and add an Authorization
      // header to the headers to be sent.
      const accessToken = this._session.accessToken;

      if (accessToken) {
        headers['Authorization'] = `bearer ${accessToken}`;
      }
    }

    // Prepare the request object.
    const request = {
      method: method,
      headers: headers,
    };

    // If data was provided then add it to the request body.
    if (data) {
      request['body'] = data;
    }

    return Http.call(`${this.baseUrl}${path}`, request);
  }
}
