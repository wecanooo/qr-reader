import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button, makeStyles, Link, CssBaseline } from '@material-ui/core';
import CropFreeIcon from '@material-ui/icons/CropFree';
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus';

import * as authActions from './actions/auth'
import * as appActions from './actions/app'

import logo from './images/bi_logo.png'
import Generator from './components/Generator';
import Header from './components/Header';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '70px',
    color: '#242424'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  buttonContainer: {
    margin: theme.spacing(2, 0)
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1, 3),
    borderRadius: "5em",
    color: 'white',
    fontWeight: 'bold'
  },
  scanner: {
    background: '#639aa2',
  },
  generator: {
    backgroundColor: '#576090',
  },
  content: {
    margin: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: '1em',
    color: '#121212',
    background: '#f5f5f5',
    border: '1px solid #dedede',
    '& li': {
      fontWeight: 'bold',
      fontSize: '0.875rem',
      marginBottom: theme.spacing(1.5)
    }
  },
}))

function App ({ auth, uuid, onClearAuth, onSetDeviceId, onClearDeviceId }) {
  const { cid, grade } = auth;
  const [open, setOpen] = React.useState(false)
  const classes = useStyles();

  React.useEffect(() => {
    if (!uuid) {
      onSetDeviceId(uuidv4())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!cid) return <Redirect to="/login" />

  const handleLogout = () => {
    onClearAuth()
  }

  const handleClearDeviceId = () => {
    onClearAuth()
    onClearDeviceId()
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header auth={auth} onLogout={handleLogout} onClearDeviceId={handleClearDeviceId} />
      <div className={classes.root}>
        <img src={logo} className={classes.logo} alt="logo" width="60%" />
        <div className={classes.title}>키즈스콜레 아침미팅 인증</div>
        <div className={classes.buttonContainer}>
          {grade && grade.startsWith('V') && (
            <Button
              variant="contained"
              startIcon={<CropFreeIcon />}
              className={classnames([classes.button, classes.scanner])}
              href="/scanner"
              component={Link}
            >
              QR 스캐너
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<FilterCenterFocusIcon />}
            className={classnames([classes.button, classes.generator])}
            onClick={() => setOpen(true)}
          >
            QR 코드생성
          </Button>
        </div>
        <div className={classes.content}>
          <ol>
            <li>반드시 본인 계정으로 접속하여 아침미팅 인증을 진행해 주세요.</li>
            <li>"QR 코드생성" 버튼을 클릭하여 라운지 코드 리더기에서 인증을 진행해 주세요.</li>
            <li>코드 발급 후 15초가 지나면 새로고침으로 새로운 코드를 발급하실 수 있습니다.</li>
            <li>아침미팅 인정시간은 07시 ~ 10시 59분입니다. 이후 인증 건은 인정되지 않습니다.</li>
          </ol>
        </div>
      </div>
      <Generator open={open} onClose={() => setOpen(false)} />
    </React.Fragment>
  );
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  uuid: PropTypes.string,
  onClearAuth: PropTypes.func.isRequired,
  onSetDeviceId: PropTypes.func.isRequired,
  onClearDeviceId: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  uuid: state.app.uuid
})

const mapDispatchToProps = (dispatch) => {
  return {
    onClearAuth: () => dispatch(authActions.clear()),
    onSetDeviceId: (uuid) => dispatch(appActions.setId(uuid)),
    onClearDeviceId: () => dispatch(appActions.clearId())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
