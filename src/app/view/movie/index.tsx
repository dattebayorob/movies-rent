import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const MovieList = lazy(() => import('./list'));
const MovieEdit = lazy(() => import('./edit'));

export default () => {
  return (
    <Suspense fallback='Carregando...'>
      <Switch>
        <Route exact path='/movies' component={MovieList} />
        <Route path='/movies/:movieid?' component={MovieEdit} />
      </Switch>
    </Suspense>
  )
}