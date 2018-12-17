import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Terrain from '@material-ui/icons/Terrain';
import Hospital from '@material-ui/icons/LocalHospital';
import LocalCard from './LocalCard';

const styleSheet = {
  bottomMenu: {
    position: "fixed",
    width: "100%",
    bottom: "0%",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
  }
}

class LocalView extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      value: 'recents',
    }
  }

  componentDidMount() {
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render(){
    const { classes } = this.props;
    const { value } = this.state;

    return(
      <div>
        <LocalCard />
        <BottomNavigation value={value} onChange={this.handleChange} className={classes.bottomMenu}>
          <BottomNavigationAction label="Lojas" value="shop" icon={<ShoppingCart />} />
          <BottomNavigationAction label="Tour" value="tour" icon={<Terrain />} />
          <BottomNavigationAction label="Clínicas" value="medicine" icon={<Hospital />} />
        </BottomNavigation>
      </div>
    );
  }
}

export default withStyles(styleSheet)(LocalView);