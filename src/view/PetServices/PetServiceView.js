import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styleSheet = {

}

class PetServiceView extends Component {
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
        <Typography variant="h2" gutterBottom>
          Pet Service View
        </Typography>
      </div>
    );
  }
}

export default withStyles(styleSheet)(PetServiceView);