import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/pro-light-svg-icons'
import { faSyringe } from '@fortawesome/pro-light-svg-icons'
import { faCapsules } from '@fortawesome/pro-light-svg-icons'
import Typography from '@material-ui/core/Typography';

import LunchDialog from './LunchDialog';
import MedicinesDialog from './MedicinesDialog';
import VacinesDialog from './VacinesDialog';

const styleSheet = {
}

class HealthView extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      categoryOpen: false
    }
  }

  componentDidMount() {
  }

  handleClickOpen(value){
    this.state.categoryOpen = value;
    this.setState(this.state);
  };

  handleClose(){
    this.state.categoryOpen = false;
    this.setState(this.state);
  };

  render(){
    const { classes } = this.props;

    return(
      <div style={{flexGrow: 1}}>
        <Typography variant="body2" gutterBottom style={{fontWeight: "600", textAlign: "center"}}>
          Escolha qual funcionalidade deseja usar
        </Typography>
        <Grid container spacing={8}  style={{width: "unset", margin: "unset", paddingRight: "8px", paddingLeft: "8px"}}>
          <Grid item xs={6}>
            <Paper onClick={()=>{this.handleClickOpen("lunch")}} className={classes.paper} style={{padding: "40px 0px 40px 0px", backgroundColor: "#ff7043"}}>
              <div style={{textAlign: "center", fontSize: "3rem", color: "white"}}><FontAwesomeIcon icon={faUtensils} /></div>
            </Paper>
          </Grid>     
          <Grid item xs={6}>
            <Paper onClick={()=>{this.handleClickOpen("vacines")}} className={classes.paper} style={{padding: "40px 0px 40px 0px", backgroundColor: "#90caf9"}}>
              <div style={{textAlign: "center", fontSize: "3rem", color: "white"}}><FontAwesomeIcon icon={faSyringe} /></div>
            </Paper>
          </Grid>       
          <Grid item xs={6}>
            <Paper onClick={()=>{this.handleClickOpen("medicines")}} className={classes.paper} style={{padding: "40px 0px 40px 0px", backgroundColor: "#80deea"}}>
              <div style={{textAlign: "center", fontSize: "3rem", color: "white"}}><FontAwesomeIcon icon={faCapsules} /></div>
            </Paper>
          </Grid>
        </Grid>

        <LunchDialog open={this.state.categoryOpen == "lunch" ? true : false} close={()=> this.handleClose()}/>
        <MedicinesDialog open={this.state.categoryOpen == "medicines" ? true : false} close={()=> this.handleClose()}/>
        <VacinesDialog open={this.state.categoryOpen == "vacines" ? true : false} close={()=> this.handleClose()}/>
      </div>
    );
  }
}

export default withStyles(styleSheet)(HealthView);