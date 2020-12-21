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

import bowser from 'bowser';

window.BB = bowser;

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const ua = navigator.userAgent;
  const browser = bowser.getParser(ua);

  let flag;

  if (browser.satisfies({ chrome: '>=0', chromium: '>=0' })) flag = 'chrome';
  else if (browser.satisfies({ firefox: '>=0' })) flag = 'firefox';
  else if (browser.satisfies({ safari: '>=0' })) flag = 'safari';
  else if (browser.satisfies({ opera: '>=0' })) flag = 'opera';
  else if (browser.satisfies({ 'microsoft edge': '>=0' })) flag = 'edge';
  else flag = 'unknown';

  return {
    flag,
    os: browser.getOSName(true),
    platform: browser.getPlatformType(true),
    name: browser.getBrowserName(true),
    version: browser.getBrowserVersion(),
    bowser: browser,
  };
}
