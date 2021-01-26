import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

const useStyles = makeStyles({
  paper: {
    width: '85%',
    backgroundColor:'#fff',
  },
});

const MenuDrawer = (props) => {
  const classes = useStyles();
  const { anchor, open, onClose } = props;

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      anchor={anchor}
      open={open}
      onClose={onClose}
    >
      Menu
    </Drawer>
  );
};

MenuDrawer.propTypes = {
  type: PropTypes.string,
  anchor: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

MenuDrawer.defaultProps = {
  anchor: 'left',
};

export default MenuDrawer
