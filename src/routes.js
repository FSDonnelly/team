import React from 'react';
import { Switch } from 'react-router-dom';
import Layout from './HOC/Layout';

import PrivateRoute from './Components/authRoutes/PrivateRoute';
import PublicRoute from './Components/authRoutes/PublicRoute';

import Home from './Components/home';
import SignIn from './Components/signin';
import Team from './Components/team';
import Matches from './Components/matches';

import Dashboard from './Components/admin/Dashboard';
import AdminMatches from './Components/admin/matches';
import AdminPlayers from './Components/admin/players';
import EditMatch from './Components/admin/matches/EditMatch';
import EditPlayer from './Components/admin/players/EditPlayer';

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

        <PrivateRoute
          {...props}
          path='/admin_players/add_players'
          exact
          component={EditPlayer}
        />
        <PrivateRoute
          {...props}
          path='/admin_players/add_players/:id'
          exact
          component={EditPlayer}
        />
        <PrivateRoute
          {...props}
          path='/admin_matches/edit_match'
          exact
          component={EditMatch}
        />
        <PrivateRoute
          {...props}
          path='/admin_matches/edit_match/:id'
          exact
          component={EditMatch}
        />
        <PrivateRoute
          {...props}
          path='/admin_players'
          exact
          component={AdminPlayers}
        />
        <PublicRoute
          {...props}
          exact
          restricted={false}
          component={Team}
          path='/the_team'
        />
        <PublicRoute
          {...props}
          exact
          restricted={false}
          component={Matches}
          path='/the_matches'
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
