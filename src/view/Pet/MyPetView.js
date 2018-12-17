import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Camera from '@material-ui/icons/CameraAlt';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'


const styleSheet = {
  bigAvatar: {
    width: "150px",
    height: "150px",
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    padding: "8px"
  },
  icon: {
    fontSize: "40px"
  },
  cardContent:{
    marginLeft: "8px",
    marginRight: "8px",
  },
  textField: {
    width:"90%"
  },
  title: {
    paddingLeft: "7%",
    fontSize: "0.96em",
    fontWeight: "bolder"
  }, 
  divider: {
    marginTop: "8px",
    marginBottom: "8px"
  }
}

class MyPetView extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      petName: "",
      ownerName: "",
      breed: "",
      born: "",
      location: "",
    }
  }

  componentDidMount() {
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render(){
    const { classes } = this.props;
    return(
      <div>
        <div className={classes.row}>
          <Avatar
            alt="Pet Picture"
            src=""
            className={classes.bigAvatar}
          >
            <Camera className={classes.icon}/>
          </Avatar>
        </div>
        <div className={classes.row}>
          <Button color="primary" style={{fontWeight: "bold"}}>
            Trocar Foto
          </Button> 
        </div>
        <Typography variant="h6" className={classes.title} gutterBottom>
          Profile
        </Typography>
        <div className={classes.row}>
          <TextField
            id="petname"
            label="Nome do Pet"
            value={this.state.petName}
            className={classes.textField}
            onChange={this.handleChange('petName')}
          />
        </div>
        <div className={classes.row}>
          <TextField
            id="ownerName"
            label="Nome do Dono"
            value={this.state.ownerName}
            className={classes.textField}
            onChange={this.handleChange('ownerName')}
          />
        </div>
        <div className={classes.row}>
          <TextField
            id="breed"
            label="Raça do Pet"
            value={this.state.breed}
            className={classes.textField}
            onChange={this.handleChange('breed')}
          />
        </div>
        <div className={classes.row}>
          <TextField
            id="born"
            label="Nascimento do Pet"
            value={this.state.born}
            className={classes.textField}
            onChange={this.handleChange('born')}
          />
        </div>
        <div className={classes.row}>
          <TextField
            id="location"
            label="Localização"
            value={this.state.location}
            className={classes.textField}
            onChange={this.handleChange('location')}
          />
        </div>
        <Divider className={classes.divider}/>
        <Typography variant="h6" className={classes.title} gutterBottom>
          Informações de Contato
        </Typography>
        <div className={classes.row}>
          <TextField
            id="phone"
            label="Telefone"
            value={this.state.location}
            className={classes.textField}
            onChange={this.handleChange('location')}
          />
        </div>
        <div className={classes.row}>
          <TextField
            id="email"
            label="E-mail"
            value={this.state.location}
            className={classes.textField}
            onChange={this.handleChange('location')}
          />
        </div>
        <div className={classes.row}>
          <Button variant="outlined" color="primary">
            Salvar
          </Button>
        </div>
        </div>
    );
  }
}

export default withStyles(styleSheet)(MyPetView);