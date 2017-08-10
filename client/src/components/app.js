import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './header';

import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import UpdatePassword from './auth/password-edit';
import RequireAuth from './auth/require_auth';

import History from './history/history-list';

import CheckIn from './checkin/checkin';

import LeaderBoard from './leaderboard/leaderboard'

import Profile from './profile/profile';
import ProfileEdit from './profile/profile-edit';
import SearchAddElder from './profile/search-add-elder';

import Welcome from './welcome';

export default () => {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
          <Route path="/checkin" component={RequireAuth(CheckIn)} />
          <Route path="/history" component={RequireAuth(History)} />
          <Route path="/leaderboard" component={RequireAuth(LeaderBoard)} />
          <Route path="/profile/edit" component={RequireAuth(ProfileEdit)} />
          <Route path="/profile" component={RequireAuth(Profile)} /> 
          <Route path="/password" component={RequireAuth(UpdatePassword)} />
          <Route path="/addelder" component={RequireAuth(SearchAddElder)} />
          <Route path="/" component={Welcome} />
        </Switch>
      </div>
    </div>
  );

}
