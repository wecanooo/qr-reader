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

import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import {
  Button,
  Grid,
  Paper,
  TextField,
  CssBaseline
} from '@material-ui/core'

import { withAppContext } from '../AppContext'
import { LoginFormValidator } from '../validators/LoginFormValidator'
import { api } from '../config/constants'
import logo from '../images/bi_logo.png'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    padding: '1.5rem',
    backgroundColor: 'white',
  },
  logo: {
    width: '60%',
    marginTop: '3rem',
    marginBottom: '0.5rem'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '1rem'
  },
  submit: {
    marginTop: '2rem',
    padding: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#576090',
  }
}));

function Login ({ appClient }) {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()

  const onSubmit = async (formData) => {
    LoginFormValidator.validate(formData)
      .then(() => {
        const params = new URLSearchParams()
        params.append('loginId', formData.email)
        params.append('password', formData.password)

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

        axios.post(`${api.baseUrl}${api.login}`, params, config)
          .then(response => {
            const { result, message, data } = response.data
            if (result === 'FAIL') {
              alert(message)
              return;
            }

            const { empName, empKey, organizationId, organizationName, positionCode } = data
            appClient.setAuthInfo(empName, empKey, organizationId, organizationName, positionCode)

            window.location.href ="/"
          })
          .catch(err => {
            // 서버처리에 대한 오류가 발생했을 때
            alert(`로그인 처리 중 오류가 발생되었습니다. 관리자에게 문의 바랍니다. 오류: ${err.message}`)

            // TEST 를 위한 코드입니다. 실제 서비스 때는 아래의 구문을 주석해야 합니다.
            // const mock = require('../config/mock/login/success.json')
            // if (data.remember && mock.result === 'SUCCESS') {
            //   appClient.setAuthInfo(data.email, mock.data.empName, mock.data.empKey, mock.data.organizationId, mock.data.positionCode)
            // }
          })
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        alert(err.message)
      })
  }

  return (
    <div className={classes.container}>
      <CssBaseline />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} component={Paper} elevation={0} square>
          <div className={classes.paper}>
            <img src={logo} className={classes.logo} alt="logo" />
            <div className={classes.title}>키즈라운지 로그인</div>
            <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                required
                fullWidth
                id="email"
                label="로그인 아이디"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                로그인
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

Login.propTypes = {
  appClient: PropTypes.object.isRequired
}

export default withAppContext(Login)