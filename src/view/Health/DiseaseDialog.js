import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisease, faBallotCheck, faAllergies } from '@fortawesome/pro-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

import ApiService from '../../service/ApiService';

const categoryType = [
  {
    value: 'alergia',
    label: 'Alergia',
  },
  {
    value: 'outro',
    label: 'Outro',
  }
];

const styleSheet = {
  appBar: {
    position: "fixed"
  },
  textField: {
    flexBasis: 200,
  },
  registryDisease: {
    zIndex: "999",
    width: "100%", 
    position: "fixed", 
    marginTop:"64px", 
    backgroundColor: "white"
  },
  iconDesign: {
    height: "100%", 
    marginTop: "24px", 
    marginRight: "8px"
  },
  inputDesign: {
    width: "calc(100% - 50px)"
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DiseaseDialog extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      name: "",
      category: "alergia",
      user: JSON.parse(localStorage.getItem('user')),
      jwt: localStorage.getItem('token'),
      listDiseases: [],
      errorName: false,
    }
  }

  componentDidMount() {
    ApiService.requestListHealth(`disease/${this.state.user.id}`, this.state.jwt).then((result)=>{
      this.state.listDiseases =  result.diseases ? result.diseases : [];
      this.setState(this.state);
    }).catch((err)=>{
      console.log("Error: ", err);
    });
  }

  handleChangeSelect(name, event) {
    this.state[name] = event.target.value;
    this.setState(this.state);
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
    this.setState(this.state);
    return(withoutError);
  }

  saveDiseaseRegister() {
    if(this.validation()){
      let diseaseObj = {
        user: this.state.user.id,
        name: this.state.name,
        category: this.state.category
      }
      ApiService.requestSaveHealth('disease', diseaseObj, this.state.jwt).then((result)=>{
        this.state.listDiseases.push(result.disease);
        this.setState(this.state);
        this.clearForm();
      }).catch((err)=>{
        console.log("Erro: ", err);
      });
    }
  }

  deleteDisease(id) {
    ApiService.requestDeleteHealth(`disease/${id}`, this.state.jwt).then((result)=>{
      ApiService.requestListHealth(`disease/${this.state.user.id}`, this.state.jwt).then((result)=>{
        this.state.listDiseases = result.diseases ? result.diseases : [];
        this.setState(this.state);
      }).catch((err)=>{
        console.log("Error: ", err);
      });
    }).catch((err)=>{
      console.log("Error: ", err);
    })
  }

  clearForm() {
    this.state = {
      name: "",
      category: "alergia"
    }
    this.setState(this.state);
  }

  render(){
    const { classes } = this.props;

    let diseases = this.state.listDiseases.map((disease, index)=>{
      return(
        <Grid key={index} item xs={12} style={{marginBottom: "4px"}}>
          <Paper style={{borderRight: '5px solid #8bc34a'}}>
            <Grid container style={{height: "80px"}}>
              <Grid item xs={2}>
                <Typography variant="display1" style={{textAlign: "center"}}>
                  {disease.category == "alergia" ? 
                    <FontAwesomeIcon icon={faAllergies} className={classes.iconDesign} style={{fontSize: "40px"}} /> 
                  :
                    <FontAwesomeIcon icon={faDisease} className={classes.iconDesign} style={{fontSize: "40px"}} />       
                  }
                </Typography>
              </Grid>
              <Grid item xs={8} style={{padding: "0px 12px 0px 12px"}}>
                <Typography variant="title" style={{padding: "8px 0px 6px 0px"}}>
                  {disease.name}
                </Typography>
                <Typography variant="subheading" style={{padding: "6px 0px 8px 0px"}}>
                  {disease.category == "alergia" ? "Alergia" : "Outros"}
                </Typography>
              </Grid>
              <Grid item xs={2} style={{textAlign: "right"}}>
                <IconButton onClick={()=>{this.deleteDisease(disease._id)}} aria-label="Delete" className={classes.margin}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      );
    })

    return(
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={() => this.props.close()}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar} style={{backgroundColor: "#8bc34a"}}>
            <Toolbar>
              <IconButton color="inherit" onClick={()=>{this.props.close()}} aria-label="Close">
                <ExpandMore style={{fontSize: "2.5rem"}}/>
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Alergias e Doenças
              </Typography>
            </Toolbar>
          </AppBar>
          
          <div id="registryDisease" className={classes.registryDisease}>
            <Typography variant="title" gutterBottom style={{marginTop: "8px", textAlign: "center"}}>
              Novo Registro de Doenças
            </Typography>
            <div style={{padding: "0px 8px"}}>
              {this.state.category == "alergia" ? 
                <FontAwesomeIcon icon={faAllergies} className={classes.iconDesign} style={{fontSize: "24px"}} />
              :
                <FontAwesomeIcon icon={faDisease} className={classes.iconDesign} style={{fontSize: "24px"}} />
              }
              <TextField error={this.state.errorName && this.state.name == ""} label="Nome ou sigla da doença" value={this.state.name} className={classes.inputDesign}  onChange={this.handleChangeInput('name')}/>
            </div>
            <div style={{padding: "0px 10px"}}>
              <FontAwesomeIcon icon={faBallotCheck} style={{margin: "30px 16px 4px 0px", fontSize: "22px"}}/>
              <TextField
                select
                label="Categoria"
                className={classes.textField}
                value={this.state.category}
                onChange={(evt)=>this.handleChangeSelect('category', evt)}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                style={{width:"calc(100% - 49px)"}}
                margin="normal"
                fullWidth
              >
                {categoryType.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div style={{textAlign: "center", marginTop: "16px"}}>
              <Button onClick={()=>{this.saveDiseaseRegister()}} variant="outlined" color="primary" style={{fontWeight: "bold", margin: "0px 6px 0px 6px"}}>
                Salvar
              </Button>
              <Button onClick={()=>{this.clearForm()}} variant="outlined" color="secondary" style={{fontWeight: "bold", margin: "0px 6px 0px 6px"}}>
                Limpar
              </Button>
            </div>
          </div>
          <div style={{marginTop: "290px"}}>
            <Grid container style={{padding: "0px 8px 0px 8px"}}>
              {diseases}
            </Grid>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(DiseaseDialog);