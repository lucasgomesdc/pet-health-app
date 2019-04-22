import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      gps: [],
      meetingList: []
    }
  }

  componentDidMount() {
    GPSService.initGPS((position)=>{
      this.state.gps = { 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      };
      let obj = [this.state.gps.latitude, this.state.gps.longitude];
      localStorage.setItem('GPS', JSON.stringify(this.state.gps));
      ApiService.requestListMeetings(obj, localStorage.getItem('token')).then((result)=>{
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

    let listItem = this.state.meetingList.map((meeting, index)=>{
      let distanceInKm = parseInt(meeting.distance/1000);
      return(
        <div key={index} style={{height: "95px", display: "inline-flex", width: "100%"}}>
          <div style={{
            backgroundImage: `url('${meeting.pet.media}')`, 
            width: "25%", 
            height: "100px",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat"
          }}>
          </div>
          <div style={{width: "60%", padding: "12px"}}>
            <div style={{fontSize: "30px"}}>
              {meeting.pet.name}
            </div>
            <div style={{marginTop: "12px"}}>
              <FontAwesomeIcon icon={ faMapMarkerAlt } style={{color: "rgba(0, 0, 0, 0.54)", marginRight: '8px'}}/>
              {distanceInKm+' '}km
            </div>
          </div>
          <div style={{width: "15%", position: "relative"}}>
            <IconButton 
              className={classes.button}
              aria-label="contact"
              style={{
                position:"absolute",
                top: "calc(50% - 30px)",
                fontSize: "30px"
              }}
            >
              <FontAwesomeIcon icon={ faInstagram } style={{color: "rgba(0, 0, 0, 0.54)"}}/>
            </IconButton>
          </div>
        </div>
      );
    });
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
            {listItem && listItem.length > 0 ? 
              listItem 
              : 
              <div style={{width: "100%", textAlign: "center", marginTop: "22px"}}>
                <CircularProgress className={classes.progress} />
              </div>
            }
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MeetingsDialog);