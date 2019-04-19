import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

import { customEvent } from '../../library';
import GPSService from '../../service/GPSService';

const styleSheet = {

}

class PetSettingsView extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      checkedGPS: false,
    }
  }

  componentDidMount() {
    customEvent('showBar', true);
  }

  handleChangeGPS(event) {
    this.state.checkedGPS = event.target.checked;
    this.setState(this.state);
    if(this.state.checkedGPS){
      GPSService.initGPS(function(position){
        let GPS = {
          latitude: position.coords.latitude,
          longitude: position.coords.latitude
        };
        localStorage.setItem('GPS', JSON.stringify(GPS));
      }, function(error){
        console.log(error);
      });
    } else {
      localStorage.setItem('GPS', null);
    }
  };

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
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h5" gutterBottom style={{padding: "8px 16px"}}>
              Ativar Encontros
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Switch
              checked={this.state.checkedGPS}
              onChange={(evt)=>this.handleChangeGPS(evt)}
              value="checkedGPS"
              color="primary"
            />
          </Grid>
        </Grid>
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