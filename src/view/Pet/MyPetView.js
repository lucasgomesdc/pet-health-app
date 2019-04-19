import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Camera from '@material-ui/icons/CameraAlt';
import Call from '@material-ui/icons/Call';
import Pets from '@material-ui/icons/Pets';
import Person from '@material-ui/icons/Person';
import SdStorage from '@material-ui/icons/SdStorage';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars } from '@fortawesome/pro-solid-svg-icons';
import { faVenus } from '@fortawesome/pro-solid-svg-icons';
import { faWeight } from '@fortawesome/pro-solid-svg-icons';
import { faChartNetwork } from '@fortawesome/pro-solid-svg-icons';
import { customEvent } from '../../library';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';

import ApiService from '../../service/ApiService';


const styleSheet = {
  bigAvatar: {
    marginLeft: "20px",
    width: "150px",
    height: "150px",
    fontSize: "40px"
  },
  row: {
    display: 'flex',
    padding: "8px"
  },
  cameraIcon: { 
    fontSize: "40px"
  },
  details: {
    display: "inline-block",
    width: "80px",
    height: "50px"
  }
}

class MyPetView extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      media: "",
      name: "",
      ownerName: "",
      breed: "",
      microchip: "",
      born: "",
      weight: "",
      gender: null,
      pedigree: null,
      castrated: null,
      user: "",
      showDetails: false,
    }
  }

  componentDidMount() {
    customEvent('showBar', true);
    this.state.user = JSON.parse(localStorage.getItem('user'));
    let petInfo = JSON.parse(localStorage.getItem('pet'));
    if(petInfo != null){
      this.initStates(petInfo);
    } else {
      ApiService.requestPet(this.state.user.id, localStorage.getItem('token')).then((data)=>{
        localStorage.setItem('pet', JSON.stringify(data));
        if(data){
          this.initStates(data);
        }
      }).catch((err)=>{
        console.log("Error ", err);
      });
    }
  }

  initStates(petInfo){
    this.state = {
      media: petInfo.media ? petInfo.media : "",
      name: petInfo.name,
      ownerName: petInfo.user.name,
      breed: petInfo.breed.name,
      microchip: petInfo.microchip,
      born: petInfo.born,
      weight: petInfo.weight,
      gender: petInfo.gender == "macho" ? "Macho" : "Fêmea",
      pedigree: petInfo.pedigree ? "Sim" : "Não",
      castrated: petInfo.castrated ? "Sim" : "Não",
      location: "Belo Horizonte - MG",
    }
    this.setState(this.state);
  }

  handleShowDetails(){
    let showDetails = this.state.showDetails;
    this.state.showDetails = !showDetails;
    this.setState(this.state);
  }

  render(){
    const { classes } = this.props;
    return(
      <div style={{padding: "0px 8px"}}>
        <Paper>
          <div className={classes.row}>
            {this.state.media ? 
            <Avatar
              alt="Pet Picture"
              src={this.state.media}
              className={classes.bigAvatar}
            />
            :
            <Avatar
              alt="Pet Picture"
              src=""
              className={classes.bigAvatar}
            >
              <Camera className={classes.cameraIcon}/>
            </Avatar>
            }
            <div style={{textAlign: "right", width: "100%", padding: "15px 20px 0px 0px"}}>
              <Typography style={{fontWeight: "500"}} component="h2" variant="headline" gutterBottom>
                {this.state.name}
              </Typography>
              <Typography style={{color: "gray"}} variant="body1" gutterBottom>
                {this.state.microchip}
              </Typography>
              <Typography style={{marginBottom: "unset"}} variant="subheading" gutterBottom>
                {this.state.ownerName}
              </Typography>
              <Typography variant="subheading" gutterBottom>
                {this.state.breed}
              </Typography>
            </div>
          </div>
          {this.state.showDetails ? 
            <div style={{textAlign: "center", margin: "8px auto"}}>
              <div id="weight" className={classes.details} style={{width: "60px"}}>
                <FontAwesomeIcon icon={faWeight} style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "25px"}}/>
                <div>
                {this.state.weight}kg
                </div>
              </div>
              <div id="gender" className={classes.details}>
                {this.state.gender == "Macho" ? 
                  <FontAwesomeIcon icon={faMars} style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "30px"}}/>
                :
                  <FontAwesomeIcon icon={faVenus} style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "25px"}}/>
                }
                <div>
                  {this.state.gender}
                </div>
              </div>
              <div id="pedigree" className={classes.details}>
                <FontAwesomeIcon icon={faChartNetwork} style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "25px"}}/>
                <div>
                  Pedigree
                </div>
              </div>
              <div id="castrated" className={classes.details}>
                Castrado 
                <div>
                  {this.state.castrated}
                </div>
              </div>
            </div>
          :
            null
          }
          <div style={{textAlign: "center", borderTopStyle: "solid", borderWidth: "0.01rem"}}>
            <IconButton onClick={()=>{this.handleShowDetails()}}className={classes.button} aria-label="Expand">
              {this.state.showDetails ? 
              <ExpandLess />
              :
              <ExpandMore />
              }
            </IconButton>
          </div>
        </Paper>
        <div style={{padding: "20px", textAlign: "center"}}>
          <Fab
            variant="extended"
            size="medium"
            style={{backgroundColor: "#4caf50", color: "white", width: "188px"}}
            aria-label="Add"
            className={classes.margin}
          >
            <Call />
            Emergência
          </Fab>
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MyPetView);