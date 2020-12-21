import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { Button, makeStyles, Link, CssBaseline } from '@material-ui/core';
import logo from './images/bi_logo.png'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100vh',
    padding: '1rem'
  },
  logo: {
    marginBottom: '2rem'
  },
}))

function App (props) {
  // const { cid } = props;
  const classes = useStyles();

  // if (!cid) return <Redirect to="/login" />

  return (
    <div className={classes.root}>
      <CssBaseline />
      <img src={logo} className={classes.logo} alt="logo" width="70%" />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        component={Link}
        href="/scanner"
        style={{
          width: '100%',
          height: '200px',
          marginBottom: '1rem',
          fontWeight: 800
        }}
      >
        QR 스캐너
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        href="/generator"
        style={{
          width: '100%',
          height: '200px',
          fontWeight: 800
        }}
      >
        QR 코드생성
      </Button>
    </div>
  );
}

App.propTypes = {
  email: PropTypes.string,
  username: PropTypes.string,
  cid: PropTypes.string
}

const mapStateToProps = (state) => ({
  email: state.auth.email,
  username: state.auth.username,
  cid: state.auth.cid
})

export default connect(mapStateToProps)(App);
