import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
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
import { faMars, faChartNetwork, faVenus, faWeight, faUserMd, faFlagCheckered, faCalendarDay, faDog, faIdCard, faUserAstronaut, faStars, faCat } from '@fortawesome/pro-solid-svg-icons';
import { faTimesCircle, faCheckCircle } from '@fortawesome/pro-regular-svg-icons';
import { customEvent } from '../../library';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DateRange from '@material-ui/icons/DateRange';
import Edit from '@material-ui/icons/Edit';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';

import ApiService from '../../service/ApiService';
import GPSService from '../../service/GPSService';
import moment from 'moment';

const styleSheet = {
  bigAvatar: {
    width: "130px",
    height: "130px",
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
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
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
      species: "",
      showDetails: false,
      jwt: localStorage.getItem('token'),
      listLunches: [],
      listMedicines: [],
      listVacines: [],
      openDialogPhone: false,
      numberPhone: '(  )    -    ',
      saveDisable: true,
      editDialog: false,
      loading: false,
      user: JSON.parse(localStorage.getItem('user')),
      jwt: localStorage.getItem('token'),
      imageHash: Date.now()
    }

    this.handleEditPetRegisterFn = (event)=>{this.handleEditPetRegister(event.detail)};
    window.addEventListener('handleEditPetRegister', this.handleEditPetRegisterFn);
  }

  componentDidMount() {
    customEvent('showBar', true);
    customEvent('selectActiveAppBottomBar', 'home');
    if(this.state && this.state.user.id) {
      GPSService.initGPS((position)=>{
        this.state.gps = { 
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude
        };
        let userObj ={
          geometry: {
            coordinates: [this.state.gps.latitude, this.state.gps.longitude]
          }
        }
        localStorage.setItem('GPS', JSON.stringify(this.state.gps));
        ApiService.requestUpdateUser(this.state.user.id, userObj, this.state.jwt).then((result)=>{
          this.state.user.geometry = result.user.geometry;
          localStorage.setItem('user', JSON.stringify(this.state.user));
        }).catch((err)=>{
          console.log("Error ", err);
        });
      });
      this.state.loading = true;
      this.setState(this.state);
      this.loadHealth();
      let petInfo = JSON.parse(localStorage.getItem('pet'));
      if(petInfo != null){
        this.initStates(petInfo);
        customEvent('handleOpenEditIcon', true);
      } else {
        ApiService.requestPet(this.state.user.id, localStorage.getItem('token')).then((data)=>{
          if(data) {
            localStorage.setItem('pet', JSON.stringify(data));
            if(data){
              this.initStates(data);
              customEvent('handleOpenEditIcon', true);
            }
          } else {
            localStorage.setItem('token', null);
            this.props.history.replace('/auth');
          }
        }).catch((err)=>{
          console.log("Error ", err);
        });
      }
    }
  }

  componentWillUnmount() {
    customEvent('handleOpenEditIcon', false);
  }

  handleEditPetRegister() {
    let pet = JSON.parse(localStorage.getItem('pet'));
    this.props.history.push({
      pathname: '/petRegister',
      state: {
        pet: pet
      }
    });
  }

  initStates(petInfo){
    this.state = {
      media: petInfo.media ? petInfo.media : "",
      name: petInfo.name,
      ownerName: petInfo.user.name,
      breed: petInfo.breed.name,
      species: petInfo.breed.species,
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

  loadHealth() { 
    if(this.state.user && this.state.user.id) { 
      let now = moment();
      let day = now.format('dddd').toLowerCase();
      ApiService.requestListHealth(`lunch/${this.state.user.id}`, this.state.jwt).then((result)=>{
        let lunches = result.lunches ? result.lunches : [];
        lunches.forEach((lunch)=>{
          if(lunch[day]){
            this.state.listLunches.push(lunch);
          }
        });
        ApiService.requestListHealth(`medicine/${this.state.user.id}`, this.state.jwt).then((result)=>{
          let medicines = result.medicines ? result.medicines : [];
          medicines.forEach((medicine)=>{
            let start = moment(moment.utc(medicine.start).format('YYYY-MM-DD'));
            let end;
            if(medicine.end){
              end = moment(moment.utc(medicine.end).format('YYYY-MM-DD'));
              if(now >= start && now <= end){
                this.state.listMedicines.push(medicine);
              }
            } else { 
              if(now == start) {
                this.state.listMedicines.push(medicine);
              }
            }
          });
          ApiService.requestListHealth(`vacine/${this.state.user.id}`, this.state.jwt).then((result)=>{
            let vacines = result.vacines ? result.vacines : [];
            vacines.forEach((vacine)=>{
              let apply = moment(moment.utc(vacine.apply).format('dddd'));
              let reapply;
              if(vacine.reapply) {
                reapply = moment(moment.utc(vacine.reapply).format('dddd'));
                if(reapply == day) {
                  this.state.listVacines.push(vacine);
                }
              } else {
                if(apply == day){
                  this.state.listVacines.push(vacine);
                }
              }
            });
            this.state.loading = false;
            this.setState(this.state);
          }).catch((err)=>{
            console.log("Error: ", err);
            this.state.loading = false;
            this.setState(this.state);
          });
        }).catch((err)=>{
          console.log("Error: ", err);
          this.state.loading = false;
          this.setState(this.state);
        });
      }).catch((err)=>{
        console.log("Error: ", err);
        this.state.loading = false;
        this.setState(this.state);
      });
    }
  }

  handleShowDetails() {
    let showDetails = this.state.showDetails;
    this.state.showDetails = !showDetails;
    this.setState(this.state);
  }

  healthScreen() {
    this.props.history.push('/health');
  }

  handleDialogPhoneClickOpen(value){
    this.state.openDialogPhone = true;
    if(value) {
      this.state.editDialog = true;
      this.state.numberPhone = this.state.user.contactEmergency;
    } else {
      this.state.numberPhone = '(  )    -    ';
      this.state.editDialog = false;
    }
    this.setState(this.state);
  };

  handleDialogPhoneClose = () => {
    this.setState({ openDialogPhone: false });
  };

  callEmergency() {
    if(this.state.user.contactEmergency){
      document.addEventListener('deviceready', ()=>{
        window.plugins.CallNumber.callNumber(()=>{
          console.log('Calling');
        }, ()=>{
          console.log('Not calling');
        }, this.state.user.contactEmergency, false);
      });
    } else {
      this.handleDialogPhoneClickOpen();
    }
  }

  handleChangeNumberPhone(event){
    this.state.numberPhone = event.target.value;
    let validationNumber = this.state.numberPhone.replace(/\D+/g, '');
    if(validationNumber.length == 10) {
      this.state.saveDisable = false;
    } else { 
      this.state.saveDisable = true;
    }
    this.setState(this.state);
  };

  saveNumber(){
    let number = this.state.numberPhone.replace(/\D+/g, '');

    if(number[2] >= 6) {
      let celular = "";
      for(let x = 0; x < number.length; x++) {
        if(x == 2){
          celular+= "9";
        }
        celular+= number[x];
      }
      number = celular;
    }
    let userObj = { 
      contactEmergency: number
    }
    ApiService.requestUpdateUser(this.state.user.id, userObj, this.state.jwt).then((result)=>{
      this.state.user.contactEmergency = result.user.contactEmergency;
      this.setState(this.state);
      localStorage.setItem('user', JSON.stringify(this.state.user));
    }).catch((err)=>{
      console.log("Erro: ", err);
    });
    this.handleDialogPhoneClose();
  }

  removeNumber() {
    let userObj = { 
      contactEmergency: ""
    }
    ApiService.requestUpdateUser(this.state.user.id, userObj, this.state.jwt).then((result)=>{
      this.state.user.contactEmergency = result.user.contactEmergency;
      this.setState(this.state);
      localStorage.setItem('user', JSON.stringify(this.state.user));
    }).catch((err)=>{
      console.log("Erro: ", err);
    });
    this.handleDialogPhoneClose();
  }

  render() {
    const { classes } = this.props;
    let phoneRegistered = false;

    let medicines = this.state.listMedicines.map((medicine, index)=>{
      let dataEnd;
      if(medicine.end) { 
        dataEnd = moment.utc(medicine.end).format('DD/MM/YYYY');
      }
      return(
        <Grid item xs={12} style={{marginBottom: "4px"}}>
          <Paper style={{borderRight: '5px solid #80deea'}}>
            <Grid container style={{height: "80px"}}>
              <Grid item xs={2}>
                <Typography variant="display1" style={{fontSize: "24px", textAlign: "center", margin: "26px 0px 26px 0px"}}>
                  {medicine.time}
                </Typography>
              </Grid>
              <Grid item xs={10} style={{padding: "0px 0px 0px 12px"}}>
                <Typography variant="subheading" style={{padding: "8px 0px 8px 0px"}}>
                  {medicine.name}
                </Typography>
                <Typography variant="subheading" style={{fontSize: "0.9rem"}}>
                    <FontAwesomeIcon icon={faFlagCheckered} />
                    {dataEnd ? 
                      <div style={{display: "inline-block", padding: "0px 6px 0px 6px"}}>
                        {dataEnd}
                      </div>
                    :
                      null
                    }
                    <FontAwesomeIcon icon={faCalendarDay} style={{marginLeft: "10px", marginRight: "10px"}}/>
                    <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: medicine.sunday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)" }}>
                      D
                    </div>
                    <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: medicine.monday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                      S
                    </div>
                    <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: medicine.tuesday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                      T
                    </div>
                    <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: medicine.wednesday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                      Q
                    </div>
                    <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: medicine.thursday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                      Q
                    </div>
                    <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: medicine.friday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                      S
                    </div>
                    <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: medicine.saturday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                      S
                    </div>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      );
    });

    let lunches = this.state.listLunches.map((lunch, index)=>{
      return(
      <Grid key={index} item xs={12} style={{marginBottom: "4px"}}>
        <Paper style={{borderRight: '5px solid #ff7043'}}>
          <Grid container style={{height: "80px"}}>
            <Grid item xs={2}>
              <Typography variant="display1" style={{fontSize: "24px", textAlign: "center", margin: "26px 0px 26px 0px"}}>
                {lunch.time}
              </Typography>
            </Grid>
            <Grid item xs={10} style={{padding: "0px 12px 0px 12px"}}>
              <Typography variant="subheading" style={{padding: "8px 0px 8px 0px"}}>
                {lunch.name}
              </Typography>
              <Typography variant="subheading">
                  <FontAwesomeIcon icon={faWeight} />
                  <div style={{display: "inline-block", padding: "0px 6px 0px 6px"}}>
                  {lunch.weight}g
                  </div>
                  <FontAwesomeIcon icon={faCalendarDay} style={{marginLeft: "20px", marginRight: "10px"}}/>
                  <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: lunch.sunday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                    D
                  </div>
                  <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: lunch.monday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                    S
                  </div>
                  <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: lunch.tuesday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                    T
                  </div>
                  <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: lunch.wednesday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                    Q
                  </div>
                  <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: lunch.thursday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                    Q
                  </div>
                  <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: lunch.friday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                    S
                  </div>
                  <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: lunch.saturday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)"}}>
                    S
                  </div>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      );
    });

    let vacines = this.state.listVacines.map((vacine, index)=>{
      let dataApply, dataReApply;
      if(vacine.apply) { 
        dataApply = moment.utc(vacine.apply).format('DD/MM/YYYY');
      }
      if(vacine.reapply) {
        dataReApply = moment.utc(vacine.reapply).format('DD/MM/YYYY');
      }

      return(
        <Grid key={index} item xs={12} style={{marginBottom: "4px"}}>
          <Paper style={{borderRight: '5px solid #90caf9'}}>
            <Grid container style={{height: "80px"}}>
              <Grid item xs={4}>
                <Typography variant="display1" style={{fontSize: "18px", textAlign: "center", margin: "12px 0px"}}>
                  {dataApply}
                </Typography>
                <Typography variant="display1" style={{fontSize: "18px", textAlign: "center", margin: "12px 0px"}}>
                  {dataReApply}
                </Typography>
              </Grid>
              <Grid item xs={8} style={{padding: "0px 12px 0px 12px"}}>
                <Typography variant="title" style={{padding: "8px 0px 8px 0px"}}>
                  {vacine.name}
                </Typography>
                <Typography variant="subheading">
                  <FontAwesomeIcon icon={faUserMd} style={{marginRight: "8px"}}/>
                  {vacine.applyBy}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      );
    });

    return(
      <div style={{padding: "0px 8px"}}>
        <Paper>
          <div className={classes.row}>
            {this.state.media ? 
            <Avatar
              alt="Pet Picture"
              src={`${this.state.media}?${this.state.imageHash}`}
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
            <div style={{textAlign: "right", width: "100%"}}>
              <Typography style={{fontWeight: "500"}} component="h2" variant="headline" gutterBottom>
                {this.state.name}
                {this.state.species == "cachorro" ? 
                <FontAwesomeIcon icon={faDog} style={{margin: "0px 0px 0px 14px", color: "gray", fontSize: "35px"}}/>
                :
                <FontAwesomeIcon icon={faCat} style={{margin: "0px 0px 0px 14px", color: "gray", fontSize: "35px"}}/>
                }
              </Typography>
              {this.state.microchip ? 
                <Typography style={{color: "gray"}} variant="body1" gutterBottom>
                  {this.state.microchip}
                  <FontAwesomeIcon icon={faIdCard} style={{margin: "0px 9px 0px 20px", fontSize: "18px"}}/>
                </Typography>
              :
                null
              }
              <Typography style={{marginBottom: "unset"}} variant="subheading" gutterBottom>
                {this.state.ownerName}
                <FontAwesomeIcon icon={faUserAstronaut} style={{margin: "0px 12px 0px 23px", color: "gray", fontSize: "18px"}}/>
              </Typography>
              <Typography variant="subheading" gutterBottom>
                {this.state.breed}
                <FontAwesomeIcon icon={faStars} style={{margin: "0px 10px 0px 22px", color: "gray", fontSize: "18px"}}/>
              </Typography>
            </div>
          </div>
          {this.state.showDetails ? 
            <div style={{textAlign: "center", margin: "8px auto"}}>
              {this.state.weight ? 
                <div id="weight" className={classes.details} style={{width: "60px"}}>
                  <FontAwesomeIcon icon={faWeight} style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "25px"}}/>
                  <div>
                  {this.state.weight}kg
                  </div>
                </div>
              :
                null
              }
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
              {this.state.pedigree == "Sim" ?
                <div id="pedigree" className={classes.details}>
                  <FontAwesomeIcon icon={faChartNetwork} style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "25px"}}/>
                  <div>
                    Pedigree
                  </div>
                </div>
              :
                null
              }
              <div id="castrated" className={classes.details}>
              {this.state.castrated == "Sim" ? 
                <FontAwesomeIcon icon={faTimesCircle} style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "25px"}}/>
              :
                <FontAwesomeIcon icon={faCheckCircle} style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "25px"}}/>
              }
              Castrado
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
        <Paper style={{margin: "8px 0px", height: "64px", position: "relative"}}>
          <Typography variant="h5" gutterBottom style={{position: "absolute", left: "8px", top: "19px", fontSize:"18px"}}>
            Emergência
          </Typography>
          {this.state.user.contactEmergency ? 
            <Fab
              onClick={()=>{this.callEmergency()}}
              variant="extended"
              size="medium"
              style={{backgroundColor: "#4caf50", color: "white", position: "absolute", right: "8px", top: "10px"}}
              aria-label="Call"
              className={classes.margin}
            >
              <Call />
              Chamar
            </Fab>
          :
            null
          }
          {this.state.user.contactEmergency ? 
            <Fab
              onClick={()=>{this.handleDialogPhoneClickOpen(true)}}
              size="small"
              style={{backgroundColor: "#2196f3", color: "white", position: "absolute", right: "136px", top: "10px"}}
              aria-label="Edit"
              className={classes.margin}
            >
              <Edit />
            </Fab>
          :
            null
          }
          {this.state.user.contactEmergency == "" || this.state.user.contactEmergency == null? 
            <Fab
              onClick={()=>{this.handleDialogPhoneClickOpen(false)}}
              variant="extended"
              size="medium"
              style={{backgroundColor: "#2196f3", color: "white", position: "absolute", right: "12px", top: "10px"}}
              aria-label="Add Phone"
              className={classes.margin}
            >
              <AddIcon />
              Adicionar
            </Fab>
          :
            null
          }

        </Paper>
        {this.state.loading ? 
          <div style={{width: "100%", textAlign: "center", padding: "100px 0px"}}>
            <CircularProgress className={classes.progress} />
            <Typography style={{width: "100%", textAlign: "center", marginTop: "16px"}}>
              Carregando registros de saúde ...
            </Typography>
          </div>
        : 
          lunches.length == 0 && medicines.length == 0 && vacines.length == 0 ?
            <div style={{height: "250px", width: "100%", position: "relative"}}>
                <div style={{  position: "absolute" , top: "125px", right: 0, left: 0, margin: "auto", textAlign: "center"}}>
                  Não encontrei nenhum registro de saúde
                  <div>
                    <Button onClick={()=>{this.healthScreen()}} color="primary">
                      Adicionar
                    </Button>
                  </div>
                </div>
            </div>
          :
            <div>
              <Grid container>
                {lunches}
                {medicines}
                {vacines}
              </Grid>
            </div>
        }
        <Dialog
          open={this.state.openDialogPhone}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleDialogPhoneClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Configure um número para chamada de emergência!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Ao clicar no botão seu dispositivo iniciará uma chamada de ligação para o número configurado.
            </DialogContentText>
            <div style={{textAlign: "center", marginTop: "8px"}}>
              <Input
                value={this.state.numberPhone}
                onChange={(evt)=>{this.handleChangeNumberPhone(evt)}}
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
                style={{fontSize: "22px"}}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogPhoneClose} color="primary">
              Cancelar
            </Button>
            {this.state.editDialog ?
              <Button onClick={()=>{this.removeNumber()}} color="primary" disabled={this.state.editDialog ? false : this.state.saveDisable}>
                Remover
              </Button>
            :
              null
            }
            <Button onClick={()=>{this.saveNumber()}} color="primary" disabled={this.state.editDialog ? false : this.state.saveDisable}>
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MyPetView);