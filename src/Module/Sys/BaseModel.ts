import { BaseConfig } from './BaseConfig';

import axios from 'axios';

import { ApiResponseI } from 'lc-common/lib/Interfaces/ApiResponseI';
// eslint-disable-next-line
declare let window: any;
// eslint-disable-next-line
declare let localStorage: any;

export const getCookie = (cname: string): string => {
  const name = cname + '=';
  // eslint-disable-next-line
  let decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

/**
 * Базовый класс модели
 * Предназанчен для работы с API
 */
export class BaseModel {
  /* URL core-api */
  public apiUrl: string;

  /* URL SP */
  public oldCoreURL: string;

  constructor(config: BaseConfig) {
    this.apiUrl = config.apiUrl;
  }

  fApiHeaders() {
    const apikey = getCookie('token');
    return {
      'Content-Type': 'application/json',
      token: apikey,
    };
  }

  /**
   * Запрос к апи без лишнего и с правильным интерфейсом ответа
   * @param body
   * @param url
   */
  public async faApiRequest(body: any, url: string): Promise<ApiResponseI<any>> {
    let resp = null;
    try {
      resp = (
        await axios.post(this.apiUrl + url, body, {
          headers: this.fApiHeaders(),
        })
      ).data;
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);

      resp = e.response.data;
    }
    return resp;
  }
}
