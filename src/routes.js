import React from 'react';
import { Switch } from 'react-router-dom';
import Layout from './HOC/Layout';

import Home from './Components/home';
import SignIn from './Components/signin';

import PrivateRoute from './Components/authRoutes/PrivateRoute';
import PublicRoute from './Components/authRoutes/PublicRoute';
import Dashboard from './Components/admin/Dashboard';
import AdminMatches from './Components/admin/matches';

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
        <PrivateRoute
          {...props}
          path='/admin_matches'
          exact
          component={AdminMatches}
        />
        <PublicRoute
          {...props}
          exact
          restricted={true}
          component={SignIn}
          path='/sign_in'
        />
        <PublicRoute
          {...props}
          exact
          restricted={false}
          component={Home}
          path='/'
        />
      </Switch>
    </Layout>
  );
};
export default Routes;
