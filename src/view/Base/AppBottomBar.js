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
import { hashHistory } from 'react-router';

const styleSheet = {
  bottomBar: {
    position: "absolute",
    width: "100%", 
    bottom: "0%",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
  }
}

class AppBottomBar extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      value: 'recents'
    };
  }

  componentDidMount() {
  }

  handleChange = (event, page) => {
    this.setState({ page });
    let uri = "/"+page;
    hashHistory.push(uri);
  };

  render(){
    const { classes } = this.props;

    return(
      <BottomNavigation value={this.state.page} onChange={this.handleChange} className={classes.bottomBar}>
        <BottomNavigationAction value="" icon={<Pets />} />
        <BottomNavigationAction value="health" icon={<FavoriteIcon />} />
        <BottomNavigationAction value="local" icon={<Map />} />
        <BottomNavigationAction value="petService" icon={<Store />} />
        <BottomNavigationAction value="test" icon={<Settings />} />
      </BottomNavigation>
    );
  }
}

export default withStyles(styleSheet)(AppBottomBar);