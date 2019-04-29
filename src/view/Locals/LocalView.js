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
  }
}

class LocalView extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      local: { 
        "_id": "5cc60461a4c6702e781253b8",
        "__v": 0,
        "securityDislike": 0,
        "securityLike": 0,
        "diseaseDislike": 0,
        "diseaseLike": 0,
        "cleanDislike": 0,
        "cleanLike": 0,
        "like": 0,
        "address": "Av. Afonso Pena, 1377 - Centro, Belo Horizonte - MG, 30130-002",
        "media": "https://s3-sa-east-1.amazonaws.com/pet-health-storage/image-local/parque-municipal.png",
        "name": "Parque Municipal",
        "geometry": {
          "coordinates": [
              -19.924449,
              -43.935141
          ],
          "type": "Point"
        }
      },
      listLocals: [],
      user: JSON.parse(localStorage.getItem('user')),
      jwt: localStorage.getItem('token')
    }
  }

  componentDidMount() {
    customEvent('showBar', true);
    customEvent('selectActiveAppBottomBar', 'local');
    
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
        this.setState(this.state);
      }).catch((err)=>{
        console.log(err);
      });
    });
  }

  registerLike(localId, index) { 
    ApiService.requestLikeLocal(this.state.user.id, localId, { like: true }, this.state.jwt).then((result)=>{
      this.state.listLocals[index].like = result.likes;
      this.setState(this.state);
    }).catch((err)=>{ 
      console.log(err);
    });
  }
  
  render(){
    const { classes } = this.props;

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
          <Button className={classes.rateButton}>
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
            <Typography>
              {local.like}
            </Typography>
            :
            null
            }
            <Security style={{color: "rgba(0, 0, 0, 0.54)"}}/>
            <Typography>
              75%
            </Typography>
            <IconButton className={classes.button} aria-label="map">
              <Map />
            </IconButton>
          </CardActions>
        </Card>
      );
    });

    return(
      <div>
        {locals}
        <div style={{height: "50px"}}>
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet)(LocalView);