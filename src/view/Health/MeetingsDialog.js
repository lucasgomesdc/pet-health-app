import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Slide from '@material-ui/core/Slide';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { customEvent } from '../../library';
import ApiService from '../../service/ApiService';
import GPSService from '../../service/GPSService';

const styleSheet = {
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class MeetingsDialog extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      coordinates: [],
      meetingList: []
    }
  }
  componentDidMount() {
    GPSService.initGPS((position)=>{
      this.state.coordinates = [position.coords.latitude, position.coords.longitude];
      ApiService.requestMeetings(this.state.coordinates, localStorage.getItem('token')).then((result)=>{
        if(result){
          this.state.meetingList = result;
        }
        this.setState(this.state);
      }).catch((err)=>{
        console.log(err);
      });
    });
  }

  render(){
    const { classes } = this.props;
    let image = "https://s3-sa-east-1.amazonaws.com/pet-health-storage/image-profile/5c9d6d250ab50145bca492ff.png";

    return(
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={() => this.props.close()}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar} style={{backgroundColor: "#b39ddb"}}>
            <Toolbar>
              <IconButton color="inherit" onClick={()=>{this.props.close()}} aria-label="Close">
                <ExpandMore style={{fontSize: "2.5rem"}}/>
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Encontros
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{width: "100%", marginTop: "64px"}}>
            <div style={{height: "95px", display: "inline-flex", width: "100%"}}>
              <div style={{
                backgroundImage: `url('${image}')`, 
                width: "25%", 
                height: "100px",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat"
              }}>
              </div>
              <div style={{width: "60%", padding: "12px"}}>
                <div style={{fontSize: "30px"}}>
                  Ayla
                </div>
                <div style={{marginTop: "12px"}}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{color: "rgba(0, 0, 0, 0.54)", marginRight: '8px'}}/>
                  26km
                </div>
              </div>
              <div style={{width: "15%", position: "relative"}}>
                <IconButton className={classes.button} aria-label="contact" style={{
                  position:"absolute",
                  left:0,
                  right:0,
                  top:0,
                  bottom:0,
                  margin:"auto",
                  fontSize: "30px"
                }}>
                  <FontAwesomeIcon icon={faInstagram} style={{color: "rgba(0, 0, 0, 0.54)"}}/>
                </IconButton>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MeetingsDialog);