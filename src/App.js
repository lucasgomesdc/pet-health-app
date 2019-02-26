import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppNavBar from "./view/Base/AppNavBar";
import MyPetView from "./view/Pet/MyPetView";
import Routes from './routes';
import AppBottomBar from './view/Base/AppBottomBar';

const styleSheet = {
  content: {
    marginTop: "68px",
  }
}

class App extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <AppNavBar title="Pet Health App"/>
        <div className={classes.content}>
          <Routes />
        </div>
        <AppBottomBar />
      </div>
    );
  }
}

export default  withStyles(styleSheet)(App);
