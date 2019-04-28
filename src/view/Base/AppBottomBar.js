import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Pets from '@material-ui/icons/Pets';
import Map from '@material-ui/icons/Map';
import Store from '@material-ui/icons/Store';
import Settings from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

const styleSheet = {
  bottomBar: {
    position: "fixed",
    width: "100%", 
    bottom: "0%",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
  },
  menuNav: { 
    minWidth: "unset",
  }
}

class AppBottomBar extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      value: 'home',
    };
    this.selectActiveAppBottomBarFn = (event)=>{this.selectActiveAppBottomBar(event.detail)};
    window.addEventListener('selectActiveAppBottomBar', this.selectActiveAppBottomBarFn);
  }

  selectActiveAppBottomBar(value) {
    this.state.value = value;
    this.setState(this.state);
  }

  componentWillUnmount() { 
    window.removeEventListener('selectActiveAppBottomBar', this.selectActiveAppBottomBarFn);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render(){
    const { classes } = this.props;

    return(
      <BottomNavigation value={this.state.value} onChange={this.handleChange} className={classes.bottomBar}>
        <BottomNavigationAction className={classes.menuNav} component={Link} to="/" value="home" icon={<Pets />} />
        <BottomNavigationAction className={classes.menuNav} component={Link} to="/health" value="health" icon={<FavoriteIcon />} />
        <BottomNavigationAction className={classes.menuNav} component={Link} to="/local" value="local" icon={<Map />} />
        <BottomNavigationAction className={classes.menuNav} component={Link} to="/petService" value="petService" icon={<Settings />} />
      </BottomNavigation>
    );
  }
}

export default withStyles(styleSheet)(AppBottomBar);