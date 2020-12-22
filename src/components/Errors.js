import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Lottie from 'react-lottie';
import * as NotFoundData from '../images/404.json';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  error_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth:'320px',
    width: '100%',
    flexDirection: 'column',
  },
  logo: {
    padding: '0 0 10px 0',
    margin: '0',
  },
  errors_img: {
    padding: '2.5rem 0',
    '& img': {
      width: '100%',
    },
  },
  btn_home: {
    color: '#29b6f6',
    '& p': {
      fontWeight: 'bold',
    },
  },
}));

function ErrorPage(props) {
  const classes = useStyles();
  const { title, sub } = props;

  return (
    <div className={classes.root}>
      <div className={classes.error_container}>
        <Typography variant='h5' style={{ fontWeight: '800' }} gutterBottom>
          {title}
        </Typography>
        {sub &&
          <Typography variant='body2' gutterBottom>
            {sub}
          </Typography>
        }
        <div className={classes.errors_img}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: NotFoundData.default,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            height={200}
            width={200}
          />
        </div>
        <Link to='/' className={classes.btn_home}>
          <Typography variant='body2'>
            메인으로 이동
          </Typography>
        </Link>
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
  title: PropTypes.string,
  sub: PropTypes.string,
};

export const NotFound = () => (
  <ErrorPage title='찾으시는 페이지가 없습니다.' sub='주소를 정확하게 입력하였는지 확인해보세요.' />
);

export const InternalServerError = () => (
  <ErrorPage title='서버에서 오류가 발생되었습니다.' />
);

export default ErrorPage;