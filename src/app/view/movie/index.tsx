import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const MovieList = lazy(() => import('./list'));
const MovieEdit = lazy(() => import('./edit'));

export default () => {
  return (
    <Suspense fallback='Carregando...'>
      <Switch>
        <Route exact path='/movies' component={MovieList} />
        <Route path='/movies/edit/:movieId' component={MovieEdit} />
        <Route path='/movies/add' component={MovieEdit} />
      </Switch>
    </Suspense>
  )
}