import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Slide from '@material-ui/core/Slide';
import Assignment from '@material-ui/icons/Assignment';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Event from '@material-ui/icons/Event';
import Alarm from '@material-ui/icons/Alarm';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging, faWeight } from '@fortawesome/pro-solid-svg-icons';
import { faFlagCheckered } from '@fortawesome/pro-light-svg-icons';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import ApiService from '../../service/ApiService';

const styleSheet = {
  dayCheckbox: {
    display: "inline-block"
  },
  dayTextCheckbox: {
    textAlign: "center"
  },
  inputDesign: {
    width: "calc(100% - 50px)"
  },
  iconDesign: {
    height: "100%", 
    marginTop: "24px", 
    marginRight: "8px"
  },
  registryMedicine: {
    width: "100%", 
    position: "fixed", 
    marginTop:"64px", 
    backgroundColor: "white"
  },
  inputDesign: {
    width: "calc(100% - 50px)"
  },
  iconDesign: {
    height: "100%", 
    marginTop: "24px", 
    marginRight: "8px"
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class MedicinesDialog extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      name: "",
      time: "",
      start: "",
      end: "",
      checkedTodos: false,
      checkedSeg: false,
      checkedTer: false,
      checkedQua: false,
      checkedQui: false,
      checkedSex: false,
      checkedSab: false,
      checkedDom: false,
      listMedicines: [],
      user: JSON.parse(localStorage.getItem('user')),
      jwt: localStorage.getItem('token'),
      errorName: false,
      errorTime: false,
      errorStart: false
    }
  }

  componentDidMount() {
    ApiService.requestListHealth(`medicine/${this.state.user.id}`, this.state.jwt).then((result)=>{
      this.state.listMedicines =  result.medicines ? result.medicines : [];
      this.setState(this.state);
    }).catch((err)=>{
      console.log("Error: ", err);
    });
  }  

  handleChange = name => event => {
    if(name == "checkedTodos"){
      this.state = {
        checkedTodos: event.target.checked,
        checkedSeg: event.target.checked,
        checkedTer: event.target.checked,
        checkedQua: event.target.checked,
        checkedQui: event.target.checked,
        checkedSex: event.target.checked,
        checkedSab: event.target.checked,
        checkedDom: event.target.checked
      }
      this.setState(this.state);
    } else {
      this.state[name] = event.target.checked;
      if(!event.target.checked) {
        this.state.checkedTodos = false;
      }
      this.setState(this.state);
    }
  }

  handleChangeInput = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  validation() {
    let withoutError = true;
    if(this.state.name != ""){
      this.state.errorName = false;
    } else {
      this.state.errorName = true;
      withoutError = false;
    }
    if(this.state.time != "") { 
      this.state.errorTime = false;
    }else {
      this.state.errorTime = true;
      withoutError = false;
    }
    if(this.state.start != "") { 
      this.state.errorStart = false;
    }else {
      this.state.errorStart = true;
      withoutError = false;
    }
    this.setState(this.state);
    return(withoutError);
  }

  saveMedicineRegister() {
    if(this.validation()) {
      let medicineObj = {
        user: this.state.user.id,
        name: this.state.name,
        time: this.state.time,
        start: this.state.start,
        end: this.state.end,
        monday: this.state.checkedSeg,
        tuesday: this.state.checkedTer,
        wednesday: this.state.checkedQua,
        thursday: this.state.checkedQui,
        friday: this.state.checkedSex,
        saturday: this.state.checkedSab,
        sunday: this.state.checkedDom
      }
  
      ApiService.requestSaveHealth('medicine', medicineObj, this.state.jwt).then((result)=>{
        this.state.listMedicines.push(result.medicine);
        this.setState(this.state);
        this.clearForm();
      }).catch((err)=>{
        console.log("Erro: ", err);
      });
    }
  }

  clearForm() {
    this.state = {
      name: "",
      time: "",
      start: "",
      end: "",
      checkedTodos: false,
      checkedSeg: false,
      checkedTer: false,
      checkedQua: false,
      checkedQui: false,
      checkedSex: false,
      checkedSab: false,
      checkedDom: false,
    }
    this.setState(this.state);
  }

  deleteMedicine(id) { 
    ApiService.requestDeleteHealth(`medicine/${id}`, this.state.jwt).then((result)=>{
      ApiService.requestListHealth(`medicine/${this.state.user.id}`, this.state.jwt).then((result)=>{
        this.state.listMedicines = result.medicines ? result.medicines : [];
        this.setState(this.state);
      }).catch((err)=>{
        console.log("Error: ", err);
      });
    }).catch((err)=>{
      console.log("Error: ", err);
    })
  }

  render(){
    const { classes } = this.props;

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
              <Grid item xs={8} style={{padding: "0px 0px 0px 12px"}}>
                <Typography variant="subheading" style={{padding: "8px 0px 8px 0px"}}>
                  {medicine.name}
                </Typography>
                <Typography variant="subheading">
                    <FontAwesomeIcon icon={faFlagCheckered} />
                    {dataEnd ? 
                      <div style={{display: "inline-block", padding: "0px 6px 0px 6px", marginRight: "22px"}}>
                        {dataEnd}
                      </div>
                    :
                      null
                    }
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
              <Grid item xs={2} style={{textAlign: "right"}}>
                <IconButton onClick={()=>{this.deleteMedicine(medicine._id)}} aria-label="Delete" className={classes.margin}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
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
          <AppBar className={classes.appBar} style={{backgroundColor: "#80deea"}}>
            <Toolbar>
              <IconButton color="inherit" onClick={()=>{this.props.close()}} aria-label="Close">
                <ExpandMore style={{fontSize: "2.5rem"}}/>
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Remédios
              </Typography>
            </Toolbar>
          </AppBar>
          <div id="registryMedicine" className={classes.registryMedicine}>
            <Typography variant="title" gutterBottom style={{marginTop: "8px", textAlign: "center"}}>
              Novo Registro de Remédio
            </Typography>
            <div style={{padding: "0px 8px"}}>
              <Assignment className={classes.iconDesign} />
              <TextField error={this.state.errorName && this.state.name == ""} label="Nome do Remédio" onChange={this.handleChangeInput('name')} value={this.state.name} style={{width: "calc(60% - 50px)", marginRight: "16px"}} />
              <Alarm className={classes.iconDesign} />
              <TextField error={this.state.errorTime && this.state.time == ""} label="Definir Hora" onChange={this.handleChangeInput('time')} value={this.state.time} type="time" style={{width: "calc(40% - 50px)", marginRight: "16px"}}/>
            </div>
            <div style={{padding: "0px 8px"}}>
              <Event className={classes.iconDesign} />
              <TextField error={this.state.errorStart && this.state.start == ""} label="Data do Começo" onChange={this.handleChangeInput('start')} type="date" value={this.state.start} style={{width: "calc(50% - 50px)", marginRight: "16px"}} />
              <Event className={classes.iconDesign} />
              <TextField label="Data do Fim" onChange={this.handleChangeInput('end')} type="date" value={this.state.end} style={{width: "calc(50% - 50px)"}}/>
            </div>
            <div>
              <Typography variant="body2" gutterBottom style={{marginTop: "12px", fontWeight: "600", textAlign: "center"}}>
                Selecione os dias
              </Typography>
              <div className={classes.dayCheckbox}>
                <Checkbox
                  checked={this.state.checkedTodos}
                  onChange={this.handleChange('checkedTodos')}
                  color="primary"
                />
                <div className={classes.dayTextCheckbox}>
                  Todos
                </div>
              </div>
              <div className={classes.dayCheckbox}>
                <Checkbox
                  checked={this.state.checkedSeg}
                  onChange={this.handleChange('checkedSeg')}
                  color="primary"
                />
                <div className={classes.dayTextCheckbox}>
                  Seg
                </div>
              </div>
              <div className={classes.dayCheckbox}>
                <Checkbox
                  checked={this.state.checkedTer}
                  onChange={this.handleChange('checkedTer')}
                  color="primary"
                />
                <div className={classes.dayTextCheckbox}>
                  Ter
                </div>
              </div>
              <div className={classes.dayCheckbox}>
                <Checkbox
                  checked={this.state.checkedQua}
                  onChange={this.handleChange('checkedQua')}
                  color="primary"
                />
                <div className={classes.dayTextCheckbox}>
                  Qua
                </div>
              </div>
              <div className={classes.dayCheckbox}>
                <Checkbox
                  checked={this.state.checkedQui}
                  onChange={this.handleChange('checkedQui')}
                  color="primary"
                />
                <div className={classes.dayTextCheckbox}>
                  Qui
                </div>
              </div>
              <div className={classes.dayCheckbox}>
                <Checkbox
                  checked={this.state.checkedSex}
                  onChange={this.handleChange('checkedSex')}
                  color="primary"
                />
                <div className={classes.dayTextCheckbox}>
                  Sex
                </div>
              </div>
              <div className={classes.dayCheckbox}>
                <Checkbox
                  checked={this.state.checkedSab}
                  onChange={this.handleChange('checkedSab')}
                  color="primary"
                />
                <div className={classes.dayTextCheckbox}>
                  Sab
                </div>
              </div>
              <div className={classes.dayCheckbox}>
                <Checkbox
                  checked={this.state.checkedDom}
                  onChange={this.handleChange('checkedDom')}
                  color="primary"
                />
                <div className={classes.dayTextCheckbox}>
                  Dom
                </div>
              </div>
            </div>
            <div style={{textAlign: "center", marginTop: "16px"}}>
              <Button onClick={()=>{this.saveMedicineRegister()}} variant="outlined" color="primary" style={{fontWeight: "bold", margin: "0px 6px 0px 6px"}}>
                Salvar
              </Button>
              <Button variant="outlined" color="secondary" style={{fontWeight: "bold", margin: "0px 6px 0px 6px"}}>
                Limpar
              </Button>
            </div>
          </div>
          <div style={{marginTop: "382px"}}>
            <Grid container style={{padding: "0px 8px 0px 8px"}}>
              {medicines}
            </Grid>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MedicinesDialog);