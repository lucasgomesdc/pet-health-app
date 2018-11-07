import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styleSheet = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
}

class MenuDrawer extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      menuOpen: this.props.open
    }
  }

  componentDidMount() {
  }

  handleClick(open){
    this.state.menuOpen = open;
    this.setState(this.state);
  }

  render(){
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return(
      <div>
        <Drawer open={this.state.menuOpen} onClose={()=>{this.handleClick(false)}}>
          <div
            tabIndex={0}
            role="button"
            onClick={()=>{this.handleClick(false)}}
            onKeyDown={()=>{this.handleClick(false)}}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MenuDrawer);