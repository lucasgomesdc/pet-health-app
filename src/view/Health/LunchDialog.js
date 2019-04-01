import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/NavigateBefore';
import Alarm from '@material-ui/icons/Alarm';
import Slide from '@material-ui/core/Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging } from '@fortawesome/pro-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Assignment from '@material-ui/icons/Assignment';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

import { customEvent } from '../../library';

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
      lunchType: false,
      lunchHour: false,
      lunchWeight: false,
      checkedTodos: false,
      checkedSeg: false,
      checkedTer: false,
      checkedQua: false,
      checkedQui: false,
      checkedSex: false,
      checkedSab: false,
      checkedDom: false
    }
  }

  componentDidMount() {
    customEvent('showBar', true);
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

  render(){
    const { classes } = this.props;

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
                <ArrowBack style={{fontSize: "2.5rem"}}/>
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
              <TextField label="Tipo de Alimento" className={classes.inputDesign} />
            </div>
            <div style={{padding: "0px 8px"}}>
              <Alarm className={classes.iconDesign} />
              <TextField label="Definir Hora" style={{width: "calc(50% - 50px)", marginRight: "16px"}} />
              <FontAwesomeIcon icon={faWeightHanging} style={{margin: "20px 8px 4px 0px", fontSize: "22px"}}/>
              <TextField label="Peso (grama)" style={{width: "calc(50% - 50px)"}}/>
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
              <Button variant="outlined" color="primary" style={{fontWeight: "bold", margin: "0px 6px 0px 6px"}}>
                Salvar
              </Button>
              <Button variant="outlined" color="secondary" style={{fontWeight: "bold", margin: "0px 6px 0px 6px"}}>
                Limpar
              </Button>
            </div>
          </div>
          <div style={{marginTop: "382px"}}>
            <Grid container style={{padding: "0px 8px 0px 8px"}}>
              <Grid item xs={12}>
                <Paper>
                  <Grid container style={{height: "80px"}}>
                    <Grid item xs={2}>
                      <Typography variant="display1" style={{fontSize: "24px", textAlign: "center", margin: "26px 0px 26px 0px"}}>
                        18:30
                      </Typography>
                    </Grid>
                    <Grid item xs={8} style={{padding: "0px 12px 0px 12px"}}>
                      <Typography variant="subheading" style={{padding: "8px 0px 8px 0px"}}>
                        Ração do almoço
                      </Typography>
                      <Typography variant="subheading">
                          <FontAwesomeIcon icon={faWeightHanging} />
                          <div style={{display: "inline-block", padding: "0px 6px 0px 6px"}}>
                          22kg
                          </div>
                          <div style={{display: "inline-block", padding: "0px 3px 0px 3px"}}>
                            D
                          </div>
                          <div style={{display: "inline-block", padding: "0px 3px 0px 3px"}}>
                            S
                          </div>
                          <div style={{display: "inline-block", padding: "0px 3px 0px 3px"}}>
                            T
                          </div>
                          <div style={{display: "inline-block", padding: "0px 3px 0px 3px"}}>
                            Q
                          </div>
                          <div style={{display: "inline-block", padding: "0px 3px 0px 3px"}}>
                            Q
                          </div>
                          <div style={{display: "inline-block", padding: "0px 3px 0px 3px"}}>
                            S
                          </div>
                          <div style={{display: "inline-block", padding: "0px 3px 0px 3px"}}>
                            S
                          </div>
                      </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: "right"}}>
                      <IconButton aria-label="Delete" className={classes.margin}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(LunchDialog);