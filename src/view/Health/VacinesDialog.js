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
import Button from '@material-ui/core/Button';
import Event from '@material-ui/icons/Event';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faWeight } from '@fortawesome/pro-regular-svg-icons';
import ApiService from '../../service/ApiService';

const styleSheet = {
  registryVacine: {
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

class VacinesDialog extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      name: "",
      apply: "",
      reapply: "",
      applyBy: "",
      user: JSON.parse(localStorage.getItem('user')),
      jwt: localStorage.getItem('token'),
      listVacines: [],
    }
  }

  componentDidMount() {
    ApiService.requestListHealth(`vacine/${this.state.user.id}`, this.state.jwt).then((result)=>{
      this.state.listVacines =  result.vacines ? result.vacines : [];
      this.setState(this.state);
    }).catch((err)=>{
      console.log("Error: ", err);
    });
  }  

  handleChangeInput = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  clearForm() {
    this.state = {
      name: "",
      apply: "",
      reapply: "",
      applyBy: "",
      errorName: false,
      errorApply: false,
      errorApplyBy: false
    }
    this.setState(this.state);
  }

  validation() {
    let withoutError = true;
    if(this.state.name != "") {
      this.state.errorName = false;
    } else { 
      this.state.errorName = true;
      withoutError = false;
    }
    if(this.state.apply != "") {
      this.state.errorApply = false;
    } else { 
      this.state.errorApply = true;
      withoutError = false;
    }
    if(this.state.applyBy != "") {
      this.state.errorApplyBy = false;
    } else { 
      this.state.errorApplyBy = true;
      withoutError = false;
    }
    this.setState(this.state);
    return(withoutError);
  }

  saveVacine() {
    if(this.validation()) {
      let vacineObj = {
        user: this.state.user.id,
        name: this.state.name,
        apply: this.state.apply,
        reapply: this.state.reapply,
        applyBy: this.state.applyBy
      }
      ApiService.requestSaveHealth('vacine', vacineObj, this.state.jwt).then((result)=>{
        this.state.listVacines.push(result.vacine);
        this.setState(this.state);
        this.clearForm();
      }).catch((err)=>{
        console.log("Erro: ", err);
      });
    }
  }

  deleteVacine(id) {
    ApiService.requestDeleteHealth(`vacine/${id}`, this.state.jwt).then((result)=>{
      ApiService.requestListHealth(`vacine/${this.state.user.id}`, this.state.jwt).then((result)=>{
        this.state.listVacines = result.vacines ? result.vacines : [];
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
              <Grid item xs={6} style={{padding: "0px 12px 0px 12px"}}>
                <Typography variant="title" style={{padding: "8px 0px 8px 0px"}}>
                  {vacine.name}
                </Typography>
                <Typography variant="subheading">
                  <FontAwesomeIcon icon={faUserMd} style={{marginRight: "8px"}}/>
                  {vacine.applyBy}
                </Typography>
              </Grid>
              <Grid item xs={2} style={{textAlign: "right"}}>
                <IconButton onClick={()=>{this.deleteVacine(vacine._id)}} aria-label="Delete" className={classes.margin}>
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
          <AppBar className={classes.appBar} style={{backgroundColor: "#90caf9"}}>
            <Toolbar>
              <IconButton color="inherit" onClick={()=>{this.props.close()}} aria-label="Close">
                <ExpandMore style={{fontSize: "2.5rem"}}/>
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Vacinas
              </Typography>
            </Toolbar>
          </AppBar>
          <div id="registryVacine" className={classes.registryVacine}>
            <Typography variant="title" gutterBottom style={{marginTop: "8px", textAlign: "center"}}>
              Novo Registro de Vacina
            </Typography>
            <div style={{padding: "0px 8px"}}>
              <Assignment className={classes.iconDesign} />
              <TextField error={this.state.errorName && this.state.name == ""} label="Nome da Vacina" onChange={this.handleChangeInput('name')}value={this.state.name} className={classes.inputDesign} />
            </div>
            <div style={{padding: "0px 8px"}}>
              <Event className={classes.iconDesign} />
              <TextField error={this.state.errorApply && this.state.apply == ""} label="Data Aplicação" onChange={this.handleChangeInput('apply')} type="date" value={this.state.apply} style={{width: "calc(50% - 50px)", marginRight: "16px"}} />
              <Event className={classes.iconDesign} />
              <TextField label="Data Reaplicação" onChange={this.handleChangeInput('reapply')} type="date" value={this.state.reapply} style={{width: "calc(50% - 50px)"}}/>
            </div>   
            <div style={{padding: "0px 8px"}}>
              <FontAwesomeIcon icon={faUserMd} className={classes.iconDesign} style={{fontSize: "24px"}}/>
              <TextField error={this.state.errorApplyBy && this.state.applyBy == ""} label="Nome do Aplicador" onChange={this.handleChangeInput('applyBy')}value={this.state.applyBy} className={classes.inputDesign} />
            </div>
            <div style={{textAlign: "center", marginTop: "16px"}}>
              <Button onClick={()=>{this.saveVacine()}}variant="outlined" color="primary" style={{fontWeight: "bold", margin: "0px 6px 0px 6px"}}>
                Salvar
              </Button>
              <Button variant="outlined" color="secondary" style={{fontWeight: "bold", margin: "0px 6px 0px 6px"}}>
                Limpar
              </Button>
            </div>         
          </div>
          <div style={{marginTop: "325px"}}>
            <Grid container style={{padding: "0px 8px 0px 8px"}} >
              {vacines}
            </Grid>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(VacinesDialog);