import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAltSmile } from '@fortawesome/pro-light-svg-icons';
import ApiService from '../../service/ApiService';
import { customEvent } from '../../library';

const styleSheet = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  appBar: { 
    height: "60px",
    position: "relative"
  },
  textField: {
    width: "100%"
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AppTopBar extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;

    this.state = { 
      open: false,
      addIconOpened: false,
      editIconOpened: false,
      name: "",
      address: "",
    }

    this.handleOpenAddIconFn = (event)=>{this.handleOpenAddIcon(event.detail)};
    window.addEventListener('handleOpenAddIcon', this.handleOpenAddIconFn);

    this.handleOpenEditIconFn = (event)=>{this.handleOpenEditIcon(event.detail)};
    window.addEventListener('handleOpenEditIcon', this.handleOpenEditIconFn);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    window.removeEventListener('handleOpenAddIcon', this.handleOpenAddIconFn);
    window.removeEventListener('handleOpenEditIcon', this.handleOpenEditIconFn);
  }

  handleOpenAddIcon(value) {
    this.state.addIconOpened = value;
    this.setState(this.state);
  }

  handleOpenEditIcon(value) {
    this.state.editIconOpened = value;
    this.setState(this.state);
  }

  handleClickOpen = () => {
    this.setState({ open: true, name: "", address: "", });
  };

  handleClose = () => {
    this.setState({ open: false, sendSuccess: false });
  };

  handleChangeInput = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleOpenEditPetRegister() {
    customEvent('handleEditPetRegister');
  }

  saveSuggestion() {
    let user = JSON.parse(localStorage.getItem('user'));
    let jwt = localStorage.getItem('token');

    let suggestionObj = {
      user: user.id,
      name: this.state.name,
      address: this.state.address
    }
    ApiService.requestSuggestionLocal(suggestionObj, jwt).then((result)=>{
      if(result.suggestionLocal){
        this.state.sendSuccess = true;
        this.setState(this.state);
      }
    }).catch((err)=>{
      console.log('Error: ', err)
    });
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
        <AppBar position="fixed">
          <Toolbar className={classes.appBar}>
            <Typography variant="h6" color="inherit" style={{width: "100%", textAlign: "center"}}>
              Pet Safe Care
            </Typography>
            {this.state.addIconOpened ?
              <IconButton onClick={this.handleClickOpen} style={{position: "absolute", right: "16px"}} color="inherit" aria-label="Menu">
                <Add />
              </IconButton>
            :
              null
            }
            {this.state.editIconOpened ?
              <IconButton onClick={()=>{this.handleOpenEditPetRegister()}} style={{position: "absolute", right: "16px"}} color="inherit" aria-label="Menu">
                <Edit />
              </IconButton>
            :
              null
            }
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.state.sendSuccess ? "Obrigado pela sugestão!" : "Não encontrou um local? De uma sugestão"}
          </DialogTitle>
          {this.state.sendSuccess ?
            <DialogContent style={{marginTop: "12px"}}>
              <div style={{textAlign: "center"}}>
                <FontAwesomeIcon icon={ faCommentAltSmile } style={{color: "rgba(0, 0, 0, 0.54)", width: "50px", height: "50px"}}/>
              </div>
              <Typography style={{textAlign: "center"}}>
                Obrigado pela sugestão, vou analisar o local!
              </Typography>
            </DialogContent>
          :
            <DialogContent>
              <TextField
                id="standard-name"
                label="Nome"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChangeInput('name')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Endereço"
                className={classes.textField}
                value={this.state.address}
                onChange={this.handleChangeInput('address')}
                margin="normal"
              />
            </DialogContent>
          }
          {this.state.sendSuccess ?
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Fechar
              </Button>
            </DialogActions>
          :
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Cancelar
              </Button>
              <Button onClick={()=>{this.saveSuggestion()}} color="primary">
                Enviar
              </Button>
            </DialogActions>
          }
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(AppTopBar);