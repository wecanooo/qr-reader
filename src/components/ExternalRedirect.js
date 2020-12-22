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

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

/**
 * ExternalRedirect
 * 특정 조건을 만족할 경우 외부 링크로 redirect 하기 위한 기능입니다.
 * @param {props} props
 *  - exact : 전달된 link 가 정확히 일치할 경우에만 해당함
 *  - link : 외부 링크 URL
 */

const ExternalRedirect = (props) => {
  const { link, ...routeProps } = props;

  return (
    <Route
      {...routeProps}
      render={() => {
        window.location.replace(link);
        return null;
      }}
    />
  );
};

ExternalRedirect.propTypes = {
  link: PropTypes.string.isRequired,
};

export default ExternalRedirect;
