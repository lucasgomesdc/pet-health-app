import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppTopBar from "./view/Base/AppTopBar";
import Routes from './routes';
import AppBottomBar from './view/Base/AppBottomBar';
import { HashRouter } from 'react-router-dom';
import { isAuthenticated } from './library/auth';
import constants from './Constants';

const styleSheet = {
  content: {
    marginTop: "68px",
  }
}

class App extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;

    this.state = {
      showBar: false,
    }

    this.showBarFn = (event)=>{this.showBar(event.detail)};
    window.addEventListener('showBar', this.showBarFn)
  }

  componentWillUnmount(){
    window.removeEventListener('showBar', this.showBarFn);
  }

  showBar(option) {
    this.state.showBar = option;
    this.setState(this.state);
  }
  
  render() {
    const { classes } = this.props;

    return (
      <HashRouter>
        {this.state.showBar ?
          <div className="App">
            <AppTopBar />
            <div className={classes.content}>
              <Routes />
            </div>
            <AppBottomBar />
          </div>
          :
          <div className="App">
            <Routes />
          </div>
        }
      </HashRouter>
    );
  }
}

export default  withStyles(styleSheet)(App);
