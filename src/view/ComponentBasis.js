import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

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
    return(<div />);
  }
}

export default withStyles(styleSheet)(ComponentBasis);