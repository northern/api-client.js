
import ApiClient from './index';

describe('ApiClient', () => {
  it('throws an error when no base URL is defined on the constructor', () => {
    expect(() => {
      new ApiClient()
    }).toThrow();
  });
});
