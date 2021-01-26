import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button } from '@material-ui/core'

// import MenuIcon from '@material-ui/icons/Menu'

// import MenuDrawer from './Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  header: {
    color: '#242424',
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  ellipse: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 200,
  },
  generator: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#639aa2',
  },
}))

function Header({ auth, onLogout, onClearDeviceId }) {
  const classes = useStyles()
  // const [openMenu, setOpenMenu] = React.useState(false)
  const { name, grade, org } = auth

  // const handleMenuClose = () => {
  //   setOpenMenu(false)
  // }

  return (
    <React.Fragment>
      <AppBar
        elevation={0}
        className={classes.header}
      >
        <Toolbar className={classNames([classes.root, classes.toolbar])}>
          {/* <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MenuIcon />
          </IconButton> */}
          <div className={classes.left}>
            {`${org} / ${grade} / ${name}`}
          </div>
          <div className={classes.right}>
            {grade && grade.startsWith('V') && (
              <Button
                variant="contained"
                aria-label="초기화"
                className={classes.generator}
                onClick={onClearDeviceId}
                style={{ marginRight: '4px' }}
              >
                초기화
              </Button>
            )}
            <Button
              variant="contained"
              aria-label="로그아웃"
              className={classes.generator}
              onClick={onLogout}
            >
              로그아웃
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {/* <MenuDrawer open={openMenu} onClose={handleMenuClose} /> */}
    </React.Fragment>
  )
}

PropTypes.propTypes = {
  auth: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  onClearDeviceId: PropTypes.func.isRequired
}

export default Header