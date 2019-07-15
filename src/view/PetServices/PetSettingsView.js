import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import { customEvent } from '../../library';
import GPSService from '../../service/GPSService';
import ApiService from '../../service/ApiService';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const styleSheet = {

}

class PetSettingsView extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      checkedMeetings: false,
      instagram: "",
      user: JSON.parse(localStorage.getItem('user')),
      pet: JSON.parse(localStorage.getItem('pet')),
      GPS:  JSON.parse(localStorage.getItem('GPS')),
      open: false
    }
  }

  componentDidMount() {
    customEvent('showBar', true);
    customEvent('selectActiveAppBottomBar', 'petService');
    if(this.state.user.meetings){
      this.state.checkedMeetings = true;
    }
    this.state.instagram = this.state.user.instagram;
    this.setState(this.state);
  }

  handleChangeGPS(event) {
    this.state.checkedMeetings = event.target.checked;
    if(event.target.checked){
      this.openLoadingDialog();
      GPSService.initGPS((position)=>{
        this.state.GPS = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        localStorage.setItem('GPS', JSON.stringify(this.state.GPS));
        this.state.changed = true;
        this.setState(this.state);
        this.closeLoadingDialog();
      },(error)=>{
        console.log(error);
        this.closeLoadingDialog();
      });
    } else {
      this.state.changed = true;
    }
    this.setState(this.state);
  }
  
  handleChange(event) {
    if(event.target.value != this.state.instagram){
      this.state.changed = true;
    }
    this.state.instagram = event.target.value;
    this.setState(this.state);
  }

  logoff(){
    localStorage.setItem('user', null);
    localStorage.setItem('pet', null);
    localStorage.setItem('token', null);
    localStorage.setItem('meeting', null);
    localStorage.setItem('GPS', null);
    customEvent('showBar', false);
    this.props.history.push('/auth');
  }

  saveSettings(){
    this.openLoadingDialog();
    let obj = {
      meetings: this.state.checkedMeetings,
      instagram: this.state.instagram
    }
    let jwt = localStorage.getItem('token');

    ApiService.requestUpdateUser(this.state.user.id, obj, jwt).then((result) => {
      this.state.user.meetings = result.user.meetings;
      this.state.user.instagram = result.user.instagram;
      this.state.user.geometry = result.user.geometry;
      localStorage.setItem('user', JSON.stringify(this.state.user));
      this.state.changed = false;
      this.setState(this.state);
    }).catch((err)=>{
      console.log(err);
    });
    
    if(this.state.checkedMeetings) {
      ApiService.requestMeeting(this.state.user.id, jwt).then((result)=>{
        if(result.code == "302"){
          let meetingObj = {
            geometry: {
              coordinates: [this.state.GPS.latitude, this.state.GPS.longitude]
            }
          }
          ApiService.requestUpdateMeetings(result.meeting[0].user, meetingObj, jwt).then((result) => {
            localStorage.setItem('meeting', JSON.stringify(result.meeting));
            this.closeLoadingDialog();
          }).catch((err)=>{
            console.log(err);
            this.closeLoadingDialog();
          });
        } else if (result.code == "404") {
          let meetingObj = { 
            user: this.state.user.id,
            pet: this.state.pet._id,
            breed: this.state.pet.breed._id,
            geometry: { 
              coordinates: [this.state.GPS.latitude, this.state.GPS.longitude]
            }
          }
          ApiService.requestRegisterMeetings(meetingObj, jwt).then((result) => {
            localStorage.setItem('meeting', JSON.stringify(result.meeting));
            this.closeLoadingDialog();
          }).catch((err)=>{
            console.log(err);
            this.closeLoadingDialog();
          });
        }
      });
    } else {
      ApiService.requestMeeting(this.state.user.id, jwt).then((result)=>{
        if(result.code == "302"){
          ApiService.requestDeleteMeetings(this.state.user.id, jwt).then(()=>{
            localStorage.setItem('meeting', null);
            this.closeLoadingDialog();
          }).catch((err)=>{
            console.log(err);
            this.closeLoadingDialog();
          });
        }
      }).catch((err)=>{
        console.log(err);
        this.closeLoadingDialog();
      });
    }
  }

  openLoadingDialog() {
    this.state.open = true;
    this.setState(this.state);
  };

  closeLoadingDialog() {
    this.state.open = false;
    this.setState(this.state);
  };

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
              checked={this.state.checkedMeetings}
              onChange={(evt)=>this.handleChangeGPS(evt)}
              value="checkedMeetings"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} style={{padding: "0px 16px"}}>
            <TextField
              id="instagram"
              label="Instagram"
              placeholder="@"
              value={this.state.instagram}
              onChange={(evt)=>this.handleChange(evt)}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        {this.state.changed ? 
          <div style={{marginTop: "35px", padding: "0px 10px"}}>
            <Button onClick={()=>{this.saveSettings()}} color="primary" >
              Salvar Configuração
            </Button>
          </div>
        :
          null
        }
        <div style={{marginTop: "18px"}}>
          <Button onClick={()=>{this.logoff()}} color="primary" >
            Sair
          </Button>
        </div>
        <Typography style={{
          marginTop: "20px",
          padding: "0px 10px",
          textAlign: "justify",
        }}>
          Aplicativo desenvolvido como fim educacional em um Trabalho de Conclusão de Curso do aluno Lucas Eduardo Gomes orientado por Felipe Domingos da Cunha na 
Pontifícia Universidade Católica de Minas Gerais
        </Typography>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        </Dialog>

      </div>
    );
  }
}

export default withStyles(styleSheet)(PetSettingsView);