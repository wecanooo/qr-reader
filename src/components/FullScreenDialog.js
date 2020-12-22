import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      top: '70px !important',
      left: 'auto !important',
      width: 382,
    },
  },
  dialogPaper: {
    [theme.breakpoints.up('sm')]: {
      borderRadius: '10px 0 0 0',
    },
  },
  dialogScrollPaper:{
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },
  },
  backDrop: {
    [theme.breakpoints.up('sm')]: {
      background: 'none',
      top: '70px !important',
      left: 'auto !important',
      width: 382,
    },
  },
  paperFullScreen: {
    background: props => props.bgFullScreen,
  },
  appBar: {
    position: 'relative',
    color: props => props.bg === 'secondary' ? 'white' : 'inherit',
    borderBottom: props => props.border ? '1px solid #f5f5f5' : null,
  },
  closeButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const FullScreenDialog = (props) => {
  const classes = useStyles(props);
  const { open, children, title, bg, onClose, prefix, rightButtons, shadow, icon } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      className={classes.root}
      classes={{ scrollPaper: classes.dialogScrollPaper, paper: classes.dialogPaper, paperFullScreen: classes.paperFullScreen }}
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
    >
      <AppBar color={bg} elevation={shadow ? 4 : 0} className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={onClose}
            aria-label='close'
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          {prefix}
          <Typography variant='h6' className={classes.title}>
            {title} {icon}
          </Typography>
          {rightButtons}
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
};

FullScreenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.any.isRequired,
  border: PropTypes.bool.isRequired,
  shadow: PropTypes.bool.isRequired,
  bg: PropTypes.string,
  prefix: PropTypes.any,
  children: PropTypes.any,
  onClose: PropTypes.func,
  rightButtons: PropTypes.any,
  icon: PropTypes.any,
  bgFullScreen: PropTypes.string,
};

FullScreenDialog.defaultProps = {
  open: false,
  border: false,
  shadow: false,
};

export default FullScreenDialog;
