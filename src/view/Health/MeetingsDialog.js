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
import { faMapMarkerAlt, faMars, faVenus, faChartNetwork } from '@fortawesome/pro-solid-svg-icons';
import { faEnvelope } from '@fortawesome/pro-regular-svg-icons';
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
      meetingList: [],
      meeting: JSON.parse(localStorage.getItem('meeting')),
      pet: JSON.parse(localStorage.getItem('pet')),
      jwt: localStorage.getItem('token'),
      loading: false
    }
  }

  componentDidMount() {
    this.state.loading = true;
    this.setState(this.state);
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
          this.state.loading = false;
        }
        this.setState(this.state);
        if(this.state.meeting != null) {
          let meetingObj = { 
            gemonetry: {
              coordinates: [this.state.gps.latitude, this.state.gps.longitude]
            }
          }
          ApiService.requestUpdateMeetings(this.state.meeting.user, meetingObj, this.state.jwt).then((result) => {
            localStorage.setItem('meeting', JSON.stringify(result.meeting));
            this.state.loading = false;
            this.setState(this.state);
          }).catch((err)=>{
            console.log(err);
            this.state.loading = false;
            this.setState(this.state);
          });
        }        
      }).catch((err)=>{
        console.log(err);
        this.state.loading = false;
        this.setState(this.state);
      });
    });
  }
  
  openInstagram(instagramProfile) {
    window.open("https://www.instagram.com/"+instagramProfile)
  }

  openEmail(email) {
    window.open("mailto:"+email);
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
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
          </div>
          <div style={{width: "60%", padding: "12px"}}>
            <div style={{fontSize: "30px"}}>
              {meeting.pet.name}
              <Typography>
                {"("+meeting.breed.name+")"}
              </Typography>
            </div>
            <div style={{marginTop: "12px"}}>
              <FontAwesomeIcon icon={ faMapMarkerAlt } style={{color: "rgba(0, 0, 0, 0.54)", marginRight: '8px'}}/>
              {distanceInKm < 1 ? "menos de 1"+' ' : distanceInKm+' '}km
              {meeting.pet.gender == "femea" ? 
              <FontAwesomeIcon icon={ faVenus } style={{color: "rgba(0, 0, 0, 0.54)", marginLeft: '12px', fontSize: "18px"}}/>
              :
              <FontAwesomeIcon icon={ faMars } style={{color: "rgba(0, 0, 0, 0.54)", marginLeft: '12px', fontSize: "18px"}}/>
              }
              {meeting.pet.pedigree ? 
              <FontAwesomeIcon icon={ faChartNetwork } style={{color: "rgba(0, 0, 0, 0.54)", marginLeft: '12px', fontSize: "18px"}}/>
              :
              null
              }
            </div>
          </div>
          <div style={{width: "15%", position: "relative"}}>
            {meeting.user.instagram ?  
              <IconButton 
                onClick={()=>{this.openInstagram(meeting.user.instagram)}}
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
            : 
              <IconButton 
                onClick={()=>{this.openEmail(meeting.user.email)}}
                className={classes.button}
                aria-label="contact"
                style={{
                  position:"absolute",
                  top: "calc(50% - 30px)",
                  fontSize: "30px"
                }}
              >
                <FontAwesomeIcon icon={ faEnvelope } style={{color: "rgba(0, 0, 0, 0.54)"}}/>
              </IconButton>
            }
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
            {this.state.loading ? 
              <div style={{width: "100%", textAlign: "center", marginTop: "22px"}}>
                <CircularProgress className={classes.progress} />
              </div>
              : 
              listItem
            }
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MeetingsDialog);