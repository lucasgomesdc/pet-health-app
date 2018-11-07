import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Favorite from '@material-ui/icons/Favorite';
import Pets from '@material-ui/icons/Pets';
import Map from '@material-ui/icons/Map';
import Store from '@material-ui/icons/Store';
import Exit from '@material-ui/icons/ExitToApp';
import Phone from '@material-ui/icons/PhoneInTalk';
import Settings from '@material-ui/icons/Settings';

import MenuDrawer from './MenuDrawer';


const styleSheet = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  appBar: { 
    height: "60px"
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
}

class AppNavBar extends Component {

  constructor(props, context){
    super(props, context);
    this.props = props;
    this.state = {
      title: this.props.title,
      menuOpen: false
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
            <ListItem button>
              <ListItemIcon>
                <Pets />
              </ListItemIcon>
              <ListItemText primary={"Meu Pet"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Favorite />
              </ListItemIcon>
              <ListItemText primary={"Saúde"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Map />
              </ListItemIcon>
              <ListItemText primary={"Locais"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Store />
              </ListItemIcon>
              <ListItemText primary={"Serviços"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText primary={"Emergência"} />
            </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={"Ajustes"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Exit />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
          </ListItem>
        </List>
      </div>
    );


    return(
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar variant="dense" className={classes.appBar} style={{backgroundColor: "#9cf4e6"}}>
            <IconButton className={classes.menuButton} onClick={()=>{this.handleClick(true)}}color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              {this.state.title}
            </Typography>
          </Toolbar>
        </AppBar>
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
export default withStyles(styleSheet)(AppNavBar);