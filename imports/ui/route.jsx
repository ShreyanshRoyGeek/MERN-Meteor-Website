import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import Login from './Login';
import Signup from './Signup';
import DashboardNew from './DashboardNew';
import Sorting from './Sorting.jsx';
import { App } from './App';



FlowRouter.route('/login', {
    name: 'Login',
    action(){
      mount(
        App, {
          content: <Login/>
        }
      )
    }
})


FlowRouter.route('/signup', {
    name: 'Signup',
    action(){
      mount(
        App, {
          content: <Signup/>
        }
      )
    }
})


FlowRouter.route('/dashboard', {
    name: 'Dashboard',
    action(){
      mount(
        App, {
          content: <DashboardNew/>
        }
      )
    }
})

FlowRouter.route('/sorting', {
  name: 'Sorting',
  action(){
    mount(
      App, {
        content: <Sorting/>
      }
    )
  }
})


FlowRouter.route('/', {
    name: 'Home',
    action(){
      mount(
        App, {
          content: <Login/>
        }
      )
    }
})