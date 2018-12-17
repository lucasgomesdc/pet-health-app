import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';

import MyPetView from './view/Pet/MyPetView';
import HealthView from './view/Health/HealthView';
import LocalView from './view/Locals/LocalView';
import PetServiceView from './view/PetServices/PetServiceView';

export default () => (
  <Router history={hashHistory}>
    <Route path='/' component={MyPetView}/>
    <Route path='/health' component={HealthView}/>
    <Route path='/local' component={LocalView}/>
    <Route path='/petService' component={PetServiceView}/>
  </Router>
);