import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { 
  Movie, 
  NotFound
} from '../../view';

export default () => (
  <Switch>
    <Route exact path='/' render={ () => <Redirect to='/movies' /> } />
    <Route path='/movies' component={ Movie } />
    <Route component={ NotFound } />
  </Switch>
)