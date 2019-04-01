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
import AuthenticateApiService from '../../service/AuthenticateApiService';

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
    height: "400px",
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

  requestSign(){
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
      this.props.history.push('/');
      console.log(result);
    }).catch((err)=>{
      console.log("Erro: ", err);
    })
  }

  requestRegister(){
    console.log("aqui registra");
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
          <div>
            <Typography variant="body2" gutterBottom style={{textAlign: "center", fontWeight: "600"}}>
              Erro ao entrar - Usuário ou senha invalida!
            </Typography>
          </div>
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
          <div style={{textAlign: "center", margin: "24px 0px 12px 0px"}} >
            <Button onClick={()=>this.requestRegister()} variant="contained" color="primary">
              Registrar
            </Button>
          </div>
          <div style={{textAlign: "center", margin: "12px 0px 12px 0px"}}>  
            <Button onClick={()=>{this.handleChangeView("sign")}} color="primary" style={{fontWeight: "600"}}>
              Entrar
            </Button>
          </div>
        </Paper>
        }
      </div>
    );
  }
}

export default withStyles(styleSheet)(AuthenticateView);