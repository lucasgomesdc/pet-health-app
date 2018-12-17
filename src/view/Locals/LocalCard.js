import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Map from '@material-ui/icons/Map';
import IconButton from '@material-ui/core/IconButton';


const styleSheet = {
  card: {
    minHeight: "300px",
    maxWidth: "95%",
    margin: "auto"
  },
  media: {
    width: "100%",
    height: "213px",
    objectFit: "cover"
  }
}

class LocalCard extends Component {
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
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Parque Municipal"
            className={classes.media}
            height="140"
            image="https://prefeitura.pbh.gov.br/sites/default/files/styles/slideshow/public/noticia/img/2018-07/Parque%20Municipal%20-%20Foto%20Stenio%20Lima%20PBH.jpg?itok=OJEXzMk6"
            title="Parque Municipal"
          />
          <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Parque Municipal
          </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton className={classes.button} aria-label="favorite">
            <FavoriteBorder />
          </IconButton>
          <Typography>
            23923
          </Typography>
          <IconButton className={classes.button} aria-label="map">
            <Map />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styleSheet)(LocalCard);