import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Alarm from '@material-ui/icons/Alarm';
import Slide from '@material-ui/core/Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging, faWeight } from '@fortawesome/pro-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Assignment from '@material-ui/icons/Assignment';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

import { customEvent } from '../../library';
import ApiService from '../../service/ApiService';

const styleSheet = {
  appBar: {
    position: "fixed"
  },
  inputDesign: {
    width: "calc(100% - 50px)"
  },
  iconDesign: {
    height: "100%", 
    marginTop: "24px", 
    marginRight: "8px"
  },
  dayCheckbox: {
    display: "inline-block"
  },
  dayTextCheckbox: {
    textAlign: "center"
  },
  registryLunch: {
    zIndex: "999",
    width: "100%", 
    position: "fixed", 
    marginTop:"64px", 
    backgroundColor: "white"
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class LunchDialog extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      name: "",
      time: "",
      weight: false,
      checkedTodos: false,
      checkedSeg: false,
      checkedTer: false,
      checkedQua: false,
      checkedQui: false,
      checkedSex: false,
      checkedSab: false,
      checkedDom: false,
      user: JSON.parse(localStorage.getItem('user')),
      jwt: localStorage.getItem('token'),
      listLunches: [],
      errorName: false,
      errorTime: false,
    }
  }

  componentDidMount() {
    ApiService.requestListHealth(`lunch/${this.state.user.id}`, this.state.jwt).then((result)=>{
      this.state.listLunches =  result.lunches ? result.lunches : [];
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

  validation(){
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
    this.setState(this.state);
    return(withoutError);
  }

  saveLunchRegister() {
    if(this.validation()){
      let lunchObj = {
        user: this.state.user.id,
        name: this.state.name,
        time: this.state.time,
        weight: this.state.weight,
        monday: this.state.checkedSeg,
        tuesday: this.state.checkedTer,
        wednesday: this.state.checkedQua,
        thursday: this.state.checkedQui,
        friday: this.state.checkedSex,
        saturday: this.state.checkedSab,
        sunday: this.state.checkedDom
      }
      ApiService.requestSaveHealth('lunch', lunchObj, this.state.jwt).then((result)=>{
        this.state.listLunches.push(result.lunch);
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
      weight: false,
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

  deleteLunch(id) { 
    ApiService.requestDeleteHealth(`lunch/${id}`, this.state.jwt).then((result)=>{
      ApiService.requestListHealth(`lunch/${this.state.user.id}`, this.state.jwt).then((result)=>{
        this.state.listLunches = result.lunches ? result.lunches : [];
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
            <Grid item xs={8} style={{padding: "0px 12px 0px 12px"}}>
              <Typography variant="subheading" style={{padding: "8px 0px 8px 0px"}}>
                {lunch.name}
              </Typography>
              <Typography variant="subheading">
                  <FontAwesomeIcon icon={faWeight} />
                  <div style={{display: "inline-block", padding: "0px 6px 0px 6px"}}>
                  {lunch.weight}g
                  </div>
                  <div style={{display: "inline-block", padding: "0px 3px 0px 3px", color: lunch.sunday === true ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.05)" }}>
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
            <Grid item xs={2} style={{textAlign: "right"}}>
              <IconButton onClick={()=>{this.deleteLunch(lunch._id)}} aria-label="Delete" className={classes.margin}>
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
          <AppBar className={classes.appBar} style={{backgroundColor: "#ff7043"}}>
            <Toolbar>
              <IconButton color="inherit" onClick={()=>{this.props.close()}} aria-label="Close">
                <ExpandMore style={{fontSize: "2.5rem"}}/>
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Alimentação
              </Typography>
            </Toolbar>
          </AppBar>
          <div id="registryLunch" className={classes.registryLunch}>
            <Typography variant="title" gutterBottom style={{marginTop: "8px", textAlign: "center"}}>
              Novo Registro de Alimentação
            </Typography>
            <div style={{padding: "0px 8px"}}>
              <Assignment className={classes.iconDesign} />
              <TextField error={this.state.errorName && this.state.name == ""} label="Tipo de Alimento" value={this.state.name} className={classes.inputDesign}  onChange={this.handleChangeInput('name')}/>
            </div>
            <div style={{padding: "0px 8px"}}>
              <Alarm className={classes.iconDesign} />
              <TextField label="Definir Hora" error={this.state.errorTime && this.state.time == ""} value={this.state.time} type="time" style={{width: "calc(50% - 50px)", marginRight: "16px"}}  onChange={this.handleChangeInput('time')}/>
              <FontAwesomeIcon icon={faWeight} style={{margin: "20px 8px 4px 0px", fontSize: "22px"}}/>
              <TextField label="Peso (grama)" value={this.state.weight} type="number" style={{width: "calc(50% - 50px)"}}  onChange={this.handleChangeInput('weight')}/>
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
              <Button onClick={()=>{this.saveLunchRegister()}} variant="outlined" color="primary" style={{fontWeight: "bold", margin: "0px 6px 0px 6px"}}>
                Salvar
              </Button>
              <Button onClick={()=>{this.clearForm()}} variant="outlined" color="secondary" style={{fontWeight: "bold", margin: "0px 6px 0px 6px"}}>
                Limpar
              </Button>
            </div>
          </div>
          <div style={{marginTop: "382px"}}>
            <Grid container style={{padding: "0px 8px 0px 8px"}}>
              {lunches}
            </Grid>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(LunchDialog);