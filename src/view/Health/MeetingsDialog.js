import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Slide from '@material-ui/core/Slide';

import { customEvent } from '../../library';

const styleSheet = {
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class MeetingsDialog extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
    }
  }
  componentDidMount() {
    customEvent('showBar', true);
  }

  render(){
    const { classes } = this.props;

    return(
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={() => this.props.close()}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar} style={{backgroundColor: "#b39ddb"}}>
            <Toolbar>
              <IconButton color="inherit" onClick={()=>{this.props.close()}} aria-label="Close">
                <ExpandMore style={{fontSize: "2.5rem"}}/>
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Encontros
              </Typography>
            </Toolbar>
          </AppBar>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MeetingsDialog);