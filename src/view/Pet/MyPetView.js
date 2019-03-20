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
  }
}

class MyPetView extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      petName: "Chiquinho",
      ownerName: "Lucas",
      breed: "Sim",
      chip: "123456789012345",
      born: "01/01/2017",
      location: "Belo Horizonte - MG",
    }
  }

  componentDidMount() {
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
        <div className={classes.row}>
          <Avatar
            alt="Pet Picture"
            src=""
            className={classes.bigAvatar}
          >
            <Camera className={classes.cameraIcon}/>
          </Avatar>
          <div style={{textAlign: "right", width: "100%", padding: "15px 20px 0px 0px"}}>
            <Typography style={{fontWeight: "500"}} component="h2" variant="headline" gutterBottom>
              {this.state.petName}
            </Typography>
            <Typography style={{color: "gray"}} variant="body1" gutterBottom>
              {this.state.chip}
            </Typography>
            <Typography style={{marginBottom: "unset"}} variant="subheading" gutterBottom>
              {this.state.ownerName}
            </Typography>
            <Typography variant="subheading" gutterBottom>
              {this.state.location}
            </Typography>
          </div>
        </div>
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
        <div style={{padding: "50px"}}>
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MyPetView);