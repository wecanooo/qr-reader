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
import QRCode from 'react-qr-code';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import FullScreenDialog from './FullScreenDialog';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100vh'
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

const INTERVAL = 15;
let   current = 0;
let   timer = null;

function Generator (props) {
  const { cid, uuid, open, onClose } = props;
  const [remain, setRemain] = React.useState(INTERVAL)
  const [data, setData] = React.useState('')
  const [expires, setExpires] = React.useState(false)
  const classes = useStyles();

  React.useEffect(() => {
    generate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const generate = async () => {
    const now = Date.now();
    const qr = `kids-lounge,${cid},${uuid},${now}`
    current = 0;

    setRemain(INTERVAL)
    setExpires(false);

    setData(qr)

    if (timer !== null) clearInterval(timer)
    timer = setInterval(checkInterval, 1000)
  }

  const checkInterval = () => {
    current = current + 1
    if (current > INTERVAL) {
      setExpires(true)
      // generate();
    } else {
      setRemain(prev => prev - 1)
    }
  }

  const handleRefresh = () => {
    generate()
  }

  return (
    <FullScreenDialog
      title="QR 체크인"
      onClose={onClose}
      open={open}
      bg='transparent'
    >
      <div className={classes.root}>
        <Divider />
        <div className={classes.center}>
          {/* <QRCode className={classes.width} value={`${cid},${email},${username}`} /> */}
          <div className={classes.qr}>
            {expires ? (
              <div>
                <IconButton
                  onClick={handleRefresh}
                  className={classes.retry}
                >
                  <Refresh />
                </IconButton>
              </div>
            ) : <QRCode value={data} />}
          </div>
          <Typography variant="subtitle1" component="div">
            {expires ? '인증 시간이 만료되었습니다.' : `${remain} 초 남았습니다.`}
          </Typography>
          <Typography variant="caption">
            {expires ? 'QR코드 스캔을 다시 시도하시려면 [재시도]를 눌러주세요.' : '입장하려는 라운지의 QR 스캐너에 인식시켜 주세요.'}
          </Typography>
        </div>
      </div>
    </FullScreenDialog>
  );
}

Generator.propTypes = {
  cid: PropTypes.string,
  uuid: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

Generator.defaultProps = {
  open: true
}

const mapStateToProps = (state) => ({
  cid: state.auth.cid,
  uuid: state.app.uuid
})

export default connect(mapStateToProps)(Generator);
