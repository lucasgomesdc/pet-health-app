import React from 'react';
import { Switch , Route, Redirect } from 'react-router';
import { isAuthenticated } from './library/auth';

import MyPetView from './view/Pet/MyPetView';
import HealthView from './view/Health/HealthView';
import LocalView from './view/Locals/LocalView';
import PetSettingsView from './view/PetServices/PetSettingsView';
import AuthenticateView from './view/Login/AuthenticateView';
import PetRegister from './view/Login/PetRegister';

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props=> 
      !isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/petRegister', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <Switch>
    <PrivateRoute exact path='/' component={MyPetView}/>
    <PrivateRoute exact path='/health' component={HealthView}/>
    <PrivateRoute exact path='/local' component={LocalView}/>
    <PrivateRoute exact path='/petService' component={PetSettingsView}/>
    <Route exact path='/petRegister' component={PetRegister} />
    <Route exact path='/auth' component={AuthenticateView} />
  </Switch>
);

export default Routes;