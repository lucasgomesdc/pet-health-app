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
    }
  }

  componentDidMount() {
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
              Novo Registro de Vacine
            </Typography>
            <div style={{padding: "0px 8px"}}>
              <Assignment className={classes.iconDesign} />
              <TextField label="Nome da Vacina" className={classes.inputDesign} />
            </div>
            <div style={{padding: "0px 8px"}}>
              <Event className={classes.iconDesign} />
              <TextField label="Data Aplicação" style={{width: "calc(50% - 50px)", marginRight: "16px"}} />
              <Event className={classes.iconDesign} />
              <TextField label="Data Reaplicação" style={{width: "calc(50% - 50px)"}}/>
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
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(VacinesDialog);