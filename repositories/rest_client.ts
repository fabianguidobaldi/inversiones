const RestClientMaxRetries = 3;

export class RestClient {
  static GET(url: string): any {
    let retries = RestClientMaxRetries;
    for (; retries > 0; retries--) {
      let response = UrlFetchApp.fetch(url);

      if (response.getResponseCode() == 200) {
        return JSON.parse(response.getContentText());
      }
    }
  }

  static POST(url: string, body: any): any {
    let options = {
      method: <const>'post',
      payload: body,
      contentType: 'application/json',
    };

    let retries = RestClientMaxRetries;
    for (; retries > 0; retries--) {
      let response = UrlFetchApp.fetch(url, options);

      if (response.getResponseCode() == 200) {
        return JSON.parse(response.getContentText());
      }
    }
  }
}
