import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

const styleSheet = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  appBar: { 
    height: "60px",
    position: "relative"
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AppTopBar extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;

    this.state = { 
      addIconOpened: false
    }

    this.handleOpenAddIconFn = (event)=>{this.handleOpenAddIcon(event.detail)};
    window.addEventListener('handleOpenAddIcon', this.handleOpenAddIconFn)
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    window.removeEventListener('handleOpenAddIcon', this.handleOpenAddIconFn)
  }

  handleOpenAddIcon(value) {
    this.state.addIconOpened = value;
    this.setState(this.state);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render(){
    const { classes } = this.props;
    return(
      <div>
        <AppBar position="fixed">
          <Toolbar className={classes.appBar}>
            <Typography variant="h6" color="inherit" style={{width: "100%", textAlign: "center"}}>
              Pet Safe Care
            </Typography>
            {this.state.addIconOpened ?
            <IconButton onClick={this.handleClickOpen} style={{position: "absolute", right: "16px"}} color="inherit" aria-label="Menu">
              <Add />
            </IconButton>
            :
              null
            }
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(AppTopBar);