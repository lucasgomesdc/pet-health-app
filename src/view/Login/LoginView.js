import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styleSheet = {

}

class ComponentBasis extends Component {
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
        <Typography component="h2" variant="display1" gutterBottom>
          Componente Basico de Replicação
        </Typography>
      </div>
    );
  }
}

export default withStyles(styleSheet)(ComponentBasis);