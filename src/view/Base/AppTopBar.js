import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styleSheet = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  appBar: { 
    height: "60px"
  }
}

class AppTopBar extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {

    }
  }

  componentDidMount() {
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
        <AppBar position="fixed">
          <Toolbar className={classes.appBar}>
            <Typography variant="h6" color="inherit" style={{width: "100%", textAlign: "center"}}>
              Pet Safe Care
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styleSheet)(AppTopBar);