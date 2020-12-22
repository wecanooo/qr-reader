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
import QrReader from 'react-qr-reader'
import { CssBaseline, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    padding: '1rem 0',
    fontSize: '1rem',
    fontWeight: 600,
    textAlign: 'center'
  },
  qr: {
    margin: '2rem 0'
  },
  center: {
    textAlign: 'center'
  },
  retry: {
    width: 256,
    height: 256,
    borderRadius: 4,
    border: 'solid 1px #ccc'
  }
}))

function Scanner () {
  const [data, setData] = React.useState('');
  const classes = useStyles();

  const handleError = err => {
    console.error(err);
  }

  const handleScan = data => {
    if (!data) return

    const values = data.split(',')

    if (!values[0]) {
      alert('데이터가 올바르지 않습니다. 다시 한번 시도해 주세요.')
    }

    alert(`${values[0]} 님 반갑습니다.`)
    setData(data)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        facingMode="user"
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </div>
  );
}

export default Scanner;
