import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './HOC/Layout';

import Home from './Components/home';
import SignIn from './Components/signin';

import PrivateRoute from './Components/authRoutes/PrivateRoute';
import Dashboard from './Components/admin/Dashboard';

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          path='/dashboard'
          exact
          component={Dashboard}
        />
        <Route exact component={SignIn} path='/sign_in' />
        <Route exact component={Home} path='/' />
      </Switch>
    </Layout>
  );
};
export default Routes;
