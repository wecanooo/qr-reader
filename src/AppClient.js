/**
 * ISC License (ISC)
 * Copyright © 2020, <leeej@stunitas.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import axios from 'axios';
import Logger from './Logger';
import * as authActions from './actions/auth';
import { api } from './config/constants';

const logger = new Logger('kids-lounge-qr-gen');

let store;

export default class AppClient {

  /**
   * @param  {Object} data
   * @param  {Object} data.store - The Redux store.
   * @param  {Object} data.intl - react-intl object
   */
  static init(data) {
    store = data.store;
  }

  setAuthInfo(email, username, cid, oid, grade) {
    store.dispatch(authActions.setAuth(email, username, cid, oid, grade));
  }

  async login(login, password) {
    try {
      const res = await this.sendRequest(api.login, 'POST', "application/x-www-form-urlencoded", { login, password });
      store.dispatch(authActions.setAuth(res.email, res.username, res.cid));
    } catch (error) {
      logger.error('getTutors() [error: "%o"]', error);
    }
  }

  async sendRequest(url, method = 'get', content_type = "application/json", data = {}) {
    return new Promise((resolve, reject) => {
      if (!this._server) {
        reject('서버 정보를 찾을 수 없습니다.');
      } else {
        axios({
          url: `${api.baseUrl}${url}`,
          headers: {
            // Accept: 'Application/json',
            'Content-Type': content_type || 'application/json',
          },
          method: method,
          data: data,
        })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

}