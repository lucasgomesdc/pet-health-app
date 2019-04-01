import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { customEvent } from '../../library';

const styleSheet = {

}

class PetSettingsView extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {

    }
  }

  componentDidMount() {
    customEvent('showBar', true);
  }

  logoff(){
    localStorage.setItem('token', null);
    localStorage.setItem('user', null);
    customEvent('showBar', false);
    this.props.history.push('/auth');
  }

  render(){
    //const { classes } = this.props;
    return(
      <div>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>
        <div style={{textAlign: "center"}}>
          <Button onClick={()=>{this.logoff()}} variant="contained" color="secondary" >
            Sair
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet)(PetSettingsView);