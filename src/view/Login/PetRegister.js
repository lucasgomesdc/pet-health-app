import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Fab from '@material-ui/core/Fab';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Camera from '@material-ui/icons/CameraAlt';
import Delete from '@material-ui/icons/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/pro-solid-svg-icons';
import { faStars } from '@fortawesome/pro-solid-svg-icons';
import { faPawAlt } from '@fortawesome/pro-solid-svg-icons';
import { faMicrochip } from '@fortawesome/pro-solid-svg-icons';
import { faBirthdayCake } from '@fortawesome/pro-solid-svg-icons';
import { faWeight } from '@fortawesome/pro-solid-svg-icons';
import { faCat } from '@fortawesome/pro-solid-svg-icons';
import { faDog } from '@fortawesome/pro-solid-svg-icons';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';

import CameraService from '../../service/CameraService';
import UploadImageService from '../../service/UploadImageService';

const animalType = [
  {
    value: 'dog',
    label: 'Cachorro',
  },
  {
    value: 'cat',
    label: 'Gato',
  }
];

const animalBreed = [
  {
    value: 'golden',
    label: 'Golden Retriever',
  },
  {
    value: 'labrador',
    label: 'Labrador',
  }
];

const styleSheet = theme =>({
  textField: {
    flexBasis: 200,
  },
  selectionSection: {
    marginTop: "16px"
  },
  image: {
    width: "150px",
    height: "150px",
  },
  avatarWithoutImage: {
    overflow: "inherit",
    position: "relative",
    margin: "auto",
    width: "150px",
    height: "150px",
    fontSize: "40px"
  },
  avatarWithImage: {
    width: "150px",
    height: "150px",
    position: "relative",
    margin: "auto"
  },
  cameraButton: {
    position: "absolute",
    bottom: "0%",
    right: "0%"
  }
});


class PetRegister extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      type: "dog",
      name: "",
      microchip: "",
      gender: "macho",
      breed: "",
      born: "",
      weight: "",
      castrated: "nao",
      media: null,
      imageRaw: "",
      pedigree: "nao",
      anchorEl: null,
    }
  }

  componentDidMount() {
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeGender = event => {
    this.setState({ gender: event.target.value });
  };

  handleChangeCastrated = event => {
    this.setState({ castrated: event.target.value });
  };

  handleChangePedigree = event => {
    this.setState({ pedigree: event.target.value });
  };

  handleChangeDate = date => {
    this.setState({ born: date });
  };

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = (value) => {
    if(value == "camera") {
      this.startCamera();
    } else {
      this.startGallery();
    }
    this.setState({ anchorEl: null });
  };

  startCamera() {
    CameraService.initCamera((imageRaw)=>{
      this.state.imageRaw = "data:image/png;base64,"+imageRaw;
      this.setState(this.state);
      this.handleSendAWS(imageRaw);
    }, (err)=>{
      console.log("Error: ", err);
    });
  }

  startGallery() { 
    CameraService.initGallery((imageRaw)=>{
      this.state.imageRaw = "data:image/png;base64,"+imageRaw;
      this.setState(this.state);
      this.handleSendAWS(imageRaw);
    }, (err)=>{
      console.log("Error: ", err);
    });
  }

  handleSendAWS(imageRaw){
    const jwt = localStorage.getItem("token");
    let imageObj = {
      mediaRaw: imageRaw,
      user_id: JSON.parse(localStorage.getItem("user")).id
    }
    UploadImageService.sendImageToAWS(Object.assign({}, imageObj), jwt).then((result)=>{
      this.state.media = result.Location;
      this.setState(this.state);
    }).catch((err)=>{
      console.log(err);
    });
  }

  deleteImage() { 
    this.state.imageRaw = "";
    this.setState(this.state);
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Cadastrar Pet
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{padding: "16px"}}>
          <div>
            {this.state.imageRaw == "" ? 
              <Avatar
                alt="Pet Picture"
                src=""
                className={classes.avatarWithoutImage}
              >
                {this.state.type === "dog" ? 
                  <FontAwesomeIcon icon={faDog} style={{fontSize: "60px"}}/>
                :
                  <FontAwesomeIcon icon={faCat} style={{fontSize: "60px"}}/>
                }
                <Fab aria-owns={this.state.anchorEl ? 'simple-menu' : undefined} onClick={this.handleMenuOpen} size="small" color="primary" aria-label="Add" className={classes.cameraButton}>
                  <Camera />
                </Fab>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleMenuClose}
                >
                  <MenuItem onClick={()=>this.handleMenuClose("camera")}>Camera</MenuItem>
                  <MenuItem onClick={()=>this.handleMenuClose("gallery")}>Galeria</MenuItem>
                </Menu>
              </Avatar>
            :
            <div className={classes.avatarWithImage}>
              <Avatar 
                alt="Teste" 
                src={this.state.imageRaw} 
                className={classes.image} 
              />
              <Fab onClick={()=>{this.deleteImage()}}size="small" color="secondary" aria-label="Remove" className={classes.cameraButton}>
                <Delete />
              </Fab>
            </div>
            }
          </div>
          <div>
            {this.state.type === "dog" ? 
              <FontAwesomeIcon icon={faDog} style={{color: "rgba(0, 0, 0, 0.54)", margin: "30px 16px 4px 0px", fontSize: "22px"}}/>
            :
              <FontAwesomeIcon icon={faCat} style={{color: "rgba(0, 0, 0, 0.54)", margin: "30px 16px 4px 0px", fontSize: "22px"}}/>
            }
            <TextField
              select
              label="Tipo do Animal"
              className={classes.textField}
              value={this.state.type}
              onChange={this.handleChange('type')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              style={{width:"calc(100% - 38px)"}}
              helperText="Escolha o seu animal"
              margin="normal"
              fullWidth
            >
              {animalType.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <FontAwesomeIcon icon={faStars} style={{color: "rgba(0, 0, 0, 0.54)", margin: "30px 16px 4px 0px", fontSize: "22px"}}/>
            <TextField
              select
              label="Raça do Animal"
              className={classes.textField}
              value={this.state.breed}
              onChange={this.handleChange('breed')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              style={{width: "calc(100% - 38px)"}}
              helperText="Escolha a raça do seu animal"
              margin="normal"
              fullWidth
            >
              {animalBreed.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            {this.state.type === "dog" ? 
              <FontAwesomeIcon icon={faPaw} style={{color: "rgba(0, 0, 0, 0.54)", margin: "30px 16px 4px 0px", fontSize: "22px"}}/>
            :
              <FontAwesomeIcon icon={faPawAlt} style={{color: "rgba(0, 0, 0, 0.54)", margin: "30px 16px 4px 0px", fontSize: "22px"}}/>
            }
            <TextField
              label="Nome"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              style={{width: "calc(100% - 38px)"}}
            />
          </div>
          <div>
            <FontAwesomeIcon icon={faMicrochip} style={{color: "rgba(0, 0, 0, 0.54)", margin: "30px 16px 4px 0px", fontSize: "22px"}}/>
            <TextField
              label="Chip"
              className={classes.textField}
              value={this.state.microchip}
              onChange={this.handleChange('microchip')}
              helperText="Opicional"
              margin="normal"
              style={{width: "calc(100% - 38px)"}}
            />
          </div>
          <div>
            <FontAwesomeIcon icon={faBirthdayCake} style={{color: "rgba(0, 0, 0, 0.54)", margin: "30px 16px 4px 0px", fontSize: "22px"}}/>
            <TextField
              label="Aniversário"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.born}
              onChange={this.handleChange('born')}
              margin="normal"
              fullWidth
              style={{width: "calc(100% - 36px)"}}
            />
          </div>
          <div>
            <FontAwesomeIcon icon={faWeight} style={{color: "rgba(0, 0, 0, 0.54)", margin: "30px 16px 4px 0px", fontSize: "20px"}}/>
            <TextField
              label="Peso"
              id="simple-start-adornment"
              className={classes.textField}
              value={this.state.weight}
              onChange={this.handleChange('weight')}
              InputProps={{
                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
              }}
              margin="normal"
              fullWidth
              style={{width: "calc(100% - 36px)"}}
            />
          </div>
          <div className={classes.selectionSection}>
            <FormLabel component="legend" required>Genero</FormLabel>
            <RadioGroup
              aria-label="Genero"
              name="genero"
              className={classes.group}
              value={this.state.gender}
              onChange={this.handleChangeGender}
            >
              <FormControlLabel value="macho" control={<Radio color="primary"/>} label="Macho" />
              <FormControlLabel value="femea" control={<Radio color="primary"/>} label="Fêmea" />
            </RadioGroup>
          </div>
          <div className={classes.selectionSection}>
            <FormLabel component="legend" required>Pedigree</FormLabel>
            <RadioGroup
              aria-label="Pedigree"
              name="pedigree"
              className={classes.group}
              value={this.state.pedigree}
              onChange={this.handleChangePedigree}
            >
              <FormControlLabel value="nao" control={<Radio color="primary"/>} label="Não" />
              <FormControlLabel value="sim" control={<Radio color="primary"/>} label="Sim" />
            </RadioGroup>
          </div>
          <div className={classes.selectionSection}>
            <FormLabel component="legend" required>Castrado</FormLabel>
            <RadioGroup
              aria-label="Castrado"
              name="castrado"
              className={classes.group}
              value={this.state.castrated}
              onChange={this.handleChangeCastrated}
            >
              <FormControlLabel value="nao" control={<Radio color="primary"/>} label="Não" />
              <FormControlLabel value="sim" control={<Radio color="primary"/>} label="Sim" />
            </RadioGroup>
          </div>
          <div style={{textAlign: "center", margin:"12px 0px"}}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="Concluir"
              onClick={()=>{console.log(this.state)}}
            >
              <FontAwesomeIcon icon={faCheck} style={{marginRight: "12px"}}/>
              Concluir
            </Fab>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet)(PetRegister);