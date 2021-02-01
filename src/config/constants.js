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

module.exports = {
  logo: require('../images/bi_logo.png'),
  logo_blue: require('../images/bi_logo.png'),
  api: {
    monitorUrl: 'https://kr.tutor.com/',
    baseUrl: process.env.KIDS_ENV !== 'production' ? 'https://qa-lounge.kidsschole.com/' : 'https://lounge.kidsschole.com/',
    login: process.env.KIDS_ENV !== 'production' ? 'api/emp/login' : 'api/emp/login',
    commit: process.env.KIDS_ENV !== 'production' ? 'api/emp/qrCheckIn' : 'api/emp/qrCheckIn',
  },
};