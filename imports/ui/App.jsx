import React from 'react';
import Signup from './Signup';
import { Meteor } from 'meteor/meteor';
import Dashboard from './Dashboard';
import Login from './Login';


export const App = ({content}) => {
  return(
    <div>
      {content}
    </div>
  )
  
};



