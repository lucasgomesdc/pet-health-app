import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppTopBar from "./view/Base/AppTopBar";
import Routes from './routes';
import AppBottomBar from './view/Base/AppBottomBar';
import { HashRouter } from 'react-router-dom';

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
      <HashRouter>
        <div className="App">
          <AppTopBar />
          <div className={classes.content}>
            <Routes />
          </div>
          <AppBottomBar />
        </div>
      </HashRouter>
    );
  }
}

export default  withStyles(styleSheet)(App);
