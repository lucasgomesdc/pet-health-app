import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LoginImg from '../../static/img/login-image.png';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import AuthenticateApiService from '../../service/AuthenticateApiService';
import ApiService from '../../service/ApiService';


const styleSheet = {
  backgroundLogo: {
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${LoginImg})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "flex-end"
  },
  loginPaper: { 
    height: "300px",
    width: "calc(100% - 50px)",
    margin: "0px auto 50px"
  },
  registerPaper: {
    height: "415px",
    width: "calc(100% - 50px)",
    margin: "0px auto 50px"
  },
  iconDesign: {
    height: "100%", 
    marginTop: "24px", 
    marginRight: "8px"
  },
  inputDesign: {
    width: "calc(100% - 50px)",
    margin: "12px auto"
  },
  textFieldDesign: {
    width: "calc(100% - 35px)"
  },
  textFieldRegister: {
    width: "100%"
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AuthenticateView extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      showPassword: false,
      sign: true,
      emailLogin: "",
      passwordLogin: "",
      nameRegister: "",
      emailRegister: "",
      passwordRegister: "",
      repeatPasswordRegister: "",
      errorLogin: false,
      errorRegister: false,
      registerErrorMessage: "",
      openModal: false
    }
  }

  componentDidMount() {
  }

  handleChangeView(option) {
    if(option == "register"){
      this.state.sign = false;
    } else if(option == "sign") {
      this.state.sign = true;
    }
    this.setState(this.state);
  }

  handleChangeInput = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleModalClose = () => {
    this.setState({ openModal: false });
  };

  handleClickRegister() {
    this.state.openModal = false;
    this.setState(this.state);
    this.props.history.push('/petRegister');
  }

  requestSign(){
    if(this.state.emailLogin == "" || this.state.passwordLogin == "") {
      this.state.errorLogin = true;
      this.setState(this.state);
      return;
    }
    let prepareObj = {
      email: this.state.emailLogin,
      password: this.state.passwordLogin
    }

    AuthenticateApiService.requestLogin(prepareObj).then((result)=>{
      let user = {
        id: result.user._id,
        nome: result.user.name,
      }
      let jwt = result.token;

      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(user));
      
      //Antes de ir pra home, verifica se o pet já está criado com request
      ApiService.requestPet(user.id, jwt).then((pet)=>{
        if(pet){ 
          this.props.history.push('/');
        }else{
          this.state.openModal = true;
          this.setState(this.state);
        }
      }).catch((err)=>{
        console.log("Erro: ", err);
      });
    }).catch((err)=>{
      console.log("Erro: ", err);
      this.state.errorLogin = true;
      this.setState(this.state);
    });
  }

  requestRegister(){
    if(this.state.nameRegister == ""){
      this.state.errorRegister = true;
      this.state.registerErrorMessage = "Erro ao registrar - Nome obrigatório!"
      this.setState(this.state);
      return;
    }

    if(this.state.emailRegister == ""){
      this.state.errorRegister = true;
      this.state.registerErrorMessage = "Erro ao registrar - E-mail obrigatório!"
      this.setState(this.state);
      return;
    }
    if(this.state.passwordRegister == this.state.repeatPasswordRegister){
      let prepareObj = {
        name: this.state.nameRegister,
        email: this.state.emailRegister,
        password: this.state.passwordRegister
      }

      AuthenticateApiService.requestRegister(prepareObj).then((result) => {
        let user = {
          id: result.user._id,
          nome: result.user.name,
        }
        let jwt = result.token;
  
        localStorage.setItem('token', jwt);
        localStorage.setItem('user', JSON.stringify(user));
        this.props.history.push('/petRegister');
      }).catch((err)=>{
        console.log("Erro: ", err);
        this.state.errorRegister = true;
        this.setState(this.state);
      });
    } else {
      this.state.errorRegister = true;
      this.state.registerErrorMessage = "Erro ao registrar - Senhas diferentes!"
      this.setState(this.state);
    }
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.backgroundLogo}>
        {this.state.sign ? 
        <Paper className={classes.loginPaper}>
          <div style={{margin: "12px 0px 12px 0px"}}>
            <Typography variant="h6" gutterBottom style={{textAlign: "center"}}>
              Entrar | Pet Safe Care
            </Typography>
          </div>
          <div className={classes.inputDesign}>
            <AccountCircle className={classes.iconDesign}/>
            <TextField label="E-mail" className={classes.textFieldDesign} onChange={this.handleChangeInput('emailLogin')}/>
          </div>
          <div className={classes.inputDesign}>
            <Lock className={classes.iconDesign}/>
            <TextField label="Senha" className={classes.textFieldDesign} type={'password'} onChange={this.handleChangeInput('passwordLogin')}/>
          </div>
          {this.state.errorLogin ? 
            <div>
              <Typography variant="body2" gutterBottom style={{textAlign: "center", color: "red"}}>
                Erro ao entrar - Usuário ou senha invalida!
              </Typography>
            </div>
          :
            null
          }
          <div style={{textAlign: "center", margin: "8px 0px"}}>
            <Button onClick={()=>this.requestSign()} variant="contained" color="primary" style={{width: "calc(100% - 50px)"}}>
              Entrar
            </Button>
          </div>
          <div style={{textAlign: "center"}}>
              Não tem uma conta? 
            <Button onClick={()=>{this.handleChangeView("register")}} color="primary" style={{fontWeight: "600"}}>
              Registrar
            </Button>
          </div>
        </Paper>
        :
        <Paper className={classes.registerPaper}>
          <div style={{margin: "12px 0px 12px 0px"}}>
            <Typography variant="h6" gutterBottom style={{textAlign: "center"}}>
              Registrar | Pet Safe Care
            </Typography>
          </div>
          <div className={classes.inputDesign}>
            <TextField label="Nome" className={classes.textFieldRegister} onChange={this.handleChangeInput('nameRegister')}/>
          </div>
          <div className={classes.inputDesign}>
            <TextField label="E-mail" className={classes.textFieldRegister} onChange={this.handleChangeInput('emailRegister')}/>
          </div>
          <div className={classes.inputDesign}>
            <TextField label="Repita a senha" className={classes.textFieldRegister} type={'password'} onChange={this.handleChangeInput('passwordRegister')}/>
          </div>
          <div className={classes.inputDesign}>
            <TextField label="Repita a senha" className={classes.textFieldRegister} type={'password'} onChange={this.handleChangeInput('repeatPasswordRegister')}/>
          </div>
          {this.state.errorRegister ? 
            <div>
              <Typography variant="body2" gutterBottom style={{textAlign: "center", color: "red"}}>
                {this.state.registerErrorMessage}
              </Typography>
            </div>
          :
            null
          }
          <div style={{textAlign: "center", margin: "6px 0px 12px 0px"}} >
            <Button onClick={()=>this.requestRegister()} variant="contained" color="primary" style={{width: "calc(100% - 50px)"}}>
              Registrar
            </Button>
          </div>
          <div style={{textAlign: "center", margin: "6px 0px 6px 0px"}}>  
            Já tem uma conta? 
            <Button onClick={()=>{this.handleChangeView("sign")}} color="primary" style={{fontWeight: "600"}}>
              Entrar
            </Button>
          </div>
        </Paper>
        }
        <Dialog
          open={this.state.openModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <DialogTitle id="modal-title">
            {"Nenhum animal registrado!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="modal-description">
              Não encontrei nenhum registro de um animal de estimação na sua conta.
              Adicione um animal para utilizar o Pet Health App
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.handleClickRegister()} color="primary">
              Adicionar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(AuthenticateView);