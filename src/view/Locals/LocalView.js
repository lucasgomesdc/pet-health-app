import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import Map from '@material-ui/icons/Map';
import Button from '@material-ui/core/Button';
import Security from '@material-ui/icons/Security';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as likeSolid, faThumbsDown as dislikeSolid } from '@fortawesome/pro-solid-svg-icons';
import { faShieldCheck, faMapMarked } from '@fortawesome/pro-regular-svg-icons';
import { faThumbsUp as likeLight, faThumbsDown as dislikeLight, faCommentAltSmile } from '@fortawesome/pro-light-svg-icons';
import Paper from '@material-ui/core/Paper';

import { customEvent } from '../../library';
import ApiService from '../../service/ApiService';
import GPSService from '../../service/GPSService';

const styleSheet = {
  bottomMenu: {
    position: "fixed",
    width: "100%",
    top: "0%",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
  },
  card: {
    minHeight: "300px",
    maxWidth: "95%",
    margin: "auto",
    marginBottom: "12px",
    position: "relative"
  },
  media: {
    width: "100%",
    height: "213px",
    objectFit: "cover"
  },
  rateButton: {
    position: "absolute",
    top: "1%",
    right: "1%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    color: "white"
  },
  svgIcon: {
    color: "rgba(0, 0, 0, 0.54)",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fontSize: "24px",
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
}

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class LocalView extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      listLocals: [],
      user: JSON.parse(localStorage.getItem('user')),
      localId: "",
      jwt: localStorage.getItem('token'),
      localRate: "",
      localClean: true,
      localSecurity: true,
      localDisease: true,
      openDialog: false,
      loading: false,
      likeClean: false,
      likeSecurity: false,
      likeDisease: false,
      dislikeClean: false,
      dislikeSecurity: false,
      dislikeDisease: false,
      clean: null,
      security: null,
      disease: null,
      ratingEnd: false
    }
    this.index = 0;
  }

  componentDidMount() {
    customEvent('showBar', true);
    customEvent('handleOpenAddIcon', true);
    customEvent('selectActiveAppBottomBar', 'local');
    this.state.loading = true;
    this.setState(this.state);
    
    GPSService.initGPS((position)=>{
      this.state.gps = { 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      };
      let obj = [this.state.gps.latitude, this.state.gps.longitude];
      localStorage.setItem('GPS', JSON.stringify(this.state.gps));
      ApiService.requestListLocals(obj, this.state.jwt).then((result)=>{
        if(result){
          this.state.listLocals = result;
        }
        this.state.loading = false;
        this.setState(this.state);
      }).catch((err)=>{
        this.state.loading = false;
        this.setState(this.state);
        console.log(err);
      });
    });
  }

  componentWillUnmount() {
    customEvent('handleOpenAddIcon', false);
  }

  registerLike(localId, index) { 
    ApiService.requestLikeLocal(this.state.user.id, localId, { like: true }, this.state.jwt).then((result)=>{
      this.state.listLocals[index].like = result.likes;
      this.setState(this.state);
    }).catch((err)=>{ 
      console.log(err);
    });
  }

  handleCloseDialog = () => {
    this.setState({ openDialog: false, ratingEnd: false });
  };

  openRatingDialog(local, index) {
    this.state.localRate = local.name;
    this.state.localId = local._id;
    this.index = index;
    this.state.openDialog = true;
    this.setState(this.state);
  }

  onClickRating(prop, value) { 
    if(prop == "clean"){
      this.state.clean = value;
      if(value == true){
        this.state.likeClean = true;
        this.state.dislikeClean = false;
      } else {
        this.state.likeClean = false;
        this.state.dislikeClean = true;
      }
    }
    if(prop == "disease"){
      this.state.disease = value;
      if(value == true){
        this.state.likeDisease = true;
        this.state.dislikeDisease = false;
      } else {
        this.state.likeDisease = false;
        this.state.dislikeDisease = true;
      }
    }
    if(prop == "security"){
      this.state.security = value;
      if(value == true){
        this.state.likeSecurity = true;
        this.state.dislikeSecurity = false;
      } else {
        this.state.likeSecurity = false;
        this.state.dislikeSecurity = true;
      }
    }
    this.setState(this.state);
  }

  saveRating() { 
    let ratingObj = {
      clean: this.state.clean,
      disease: this.state.disease,
      security: this.state.security
    }
    ApiService.requestRatingLocal(this.state.user.id, this.state.localId, ratingObj, this.state.jwt).then((result)=>{
      this.state.listLocals[this.index].safety = result.safety;
      this.state.ratingEnd = true;
      this.setState(this.state);
    }).catch((err)=>{
      console.log("Error: ", err);
    });
  }

  openMaps(coordinates) {
    if(coordinates && coordinates.length > 0) {
      window.open("geo:0,0?q="+ coordinates[0] + ","+coordinates[1]);
    }
  }
  
  render(){
    const { classes } = this.props;

    let loading = true;

    let locals = this.state.listLocals.map((local, index)=> {
      return(
        <Card key={index} className={classes.card}>
          <CardMedia
            component="img"
            alt={local.name}
            className={classes.media}
            height="140"
            image={local.media}
            title={local.name}
          />
          <Button onClick={()=>{this.openRatingDialog(local, index)}} className={classes.rateButton}>
            Avaliar
          </Button>
          <CardContent style={{padding: "8px 16px 0px 16px"}} >
            <Typography gutterBottom variant="h5" component="h2">
              {local.name}
            </Typography>
          </CardContent>
          <CardActions style={{padding: "0px 0px"}}>
            <IconButton onClick={()=>{this.registerLike(local._id, index)}} className={classes.button} aria-label="favorite">
              <FavoriteBorder />
            </IconButton>
            {local.like > 0 ? 
            <Typography style={{marginRight: "12px"}}>
              {local.like}
            </Typography>
            :
              null
            }
            <FontAwesomeIcon icon={ faShieldCheck } style={{color: "rgba(0, 0, 0, 0.54)", width: "21px", height: "21px"}}/>
            <Typography>
              {local.safety}%
            </Typography>
            <IconButton onClick={()=>{this.openMaps(local.geometry.coordinates)}} className={classes.button} aria-label="map">
              <FontAwesomeIcon icon={ faMapMarked } className={classes.svgIcon}/>
            </IconButton>
          </CardActions>
        </Card>
      );
    });

    return(
      <div>
        {this.state.loading ? 
        <div style={{width: "100%", textAlign: "center", paddingTop: "50%"}}>
          <CircularProgress className={classes.progress} />
          <Typography style={{width: "100%", textAlign: "center", marginTop: "16px"}}>
            Carregando lugares ...
          </Typography>
        </div>
        :
        <div>
          {locals.length > 0 ? 
            <Paper style={{
              margin: "11px",
              padding: "12px"
            }}>
              <Typography variant="h5" gutterBottom>
                Locais Pet Friendly 
              </Typography>
              <Typography>
                Seu animal é bem-vindo :)
              </Typography>
            </Paper>
          :
            <Paper style={{
              margin: "11px",
              padding: "12px"
            }}>
              <Typography variant="h5" gutterBottom style={{marginBottom: "28px"}}>
                Que pena! <br/>Não encontrei nenhum local próximo de você :(
              </Typography>
              <Typography>
                Clique no <div style={{display: "inline", fontWeight: "bold"}}>+</div> para sugerir um local que você conheça
              </Typography>
            </Paper>
          }
          {locals}
        </div>
        }
        <div style={{height: "50px"}}>
        </div>
        <Dialog
          open={this.state.openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.state.ratingEnd ? "Avaliação enviada!" : "Avaliar "+this.state.localRate}
          </DialogTitle>
          {this.state.ratingEnd ? 
          <DialogContent style={{marginTop: "16px"}}>
            <div style={{textAlign: "center"}}>
              <FontAwesomeIcon icon={ faCommentAltSmile } style={{color: "rgba(0, 0, 0, 0.54)", width: "50px", height: "50px"}}/>
            </div>
            <Typography style={{textAlign: "center"}}>
              Obrigado por avaliar!
            </Typography>
          </DialogContent>
          :
          <DialogContent>
            <div style={{textAlign: "center", margin:"10px 0px"}}>
              <Typography>
                Livre de doenças
              </Typography>
              <div>
                {this.state.likeDisease ? 
                <IconButton className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ likeSolid } style={{color: "#4caf50"}}/>
                </IconButton>
                :
                <IconButton onClick={()=>this.onClickRating('disease', true)} className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ likeLight } style={{color: "rgba(0, 0, 0, 0.54)"}}/>
                </IconButton>
                }
                {this.state.dislikeDisease ? 
                <IconButton className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ dislikeSolid } style={{color: "#f44336"}}/>
                </IconButton>
                :
                <IconButton onClick={()=>this.onClickRating('disease', false)} className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ dislikeLight } style={{color: "rgba(0, 0, 0, 0.54)"}}/>
                </IconButton>
                }
              </div>
            </div>
            <div style={{textAlign: "center", margin:"10px 0px"}}>
              <Typography>
                Limpeza
              </Typography>
              <div>
                {this.state.likeClean ? 
                <IconButton className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ likeSolid } style={{color: "#4caf50"}}/>
                </IconButton>
                :
                <IconButton onClick={()=>this.onClickRating('clean', true)} className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ likeLight } style={{color: "rgba(0, 0, 0, 0.54)"}}/>
                </IconButton>
                }
                {this.state.dislikeClean ? 
                <IconButton className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ dislikeSolid } style={{color: "#f44336"}}/>
                </IconButton>
                :
                <IconButton onClick={()=>this.onClickRating('clean', false)} className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ dislikeLight } style={{color: "rgba(0, 0, 0, 0.54)"}}/>
                </IconButton>
                }
              </div>
            </div>
            <div style={{textAlign: "center", margin:"10px 0px"}}>
              <Typography>
                Segurança
              </Typography>
              <div>
                {this.state.likeSecurity ? 
                <IconButton className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ likeSolid } style={{color: "#4caf50"}}/>
                </IconButton>
                :
                <IconButton onClick={()=>this.onClickRating('security', true)} className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ likeLight } style={{color: "rgba(0, 0, 0, 0.54)"}}/>
                </IconButton>
                }
                {this.state.dislikeSecurity ? 
                <IconButton className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ dislikeSolid } style={{color: "#f44336"}}/>
                </IconButton>
                :
                <IconButton onClick={()=>this.onClickRating('security', false)} className={classes.button} disableRipple={true} aria-label="like">
                  <FontAwesomeIcon icon={ dislikeLight } style={{color: "rgba(0, 0, 0, 0.54)"}}/>
                </IconButton>
                }
              </div>
            </div>
          </DialogContent>
          }
          {this.state.ratingEnd ? 
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              Fechar
            </Button>
          </DialogActions>
          :
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="secondary">
              Cancelar
            </Button>
            <Button onClick={()=>{this.saveRating()}} disabled={this.state.clean != null && this.state.security != null && this.state.disease != null ? false : true} color="primary">
              Confirmar
            </Button>
          </DialogActions>
          }
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(LocalView);