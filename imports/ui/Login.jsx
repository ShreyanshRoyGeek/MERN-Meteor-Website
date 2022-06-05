import React, { Component } from 'react';
import "./LoginStyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';



export default class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: ""
        };
    }

   validateForm() {
    return (this.state.email).length > 0 && (this.state.password).length > 0;
  }

    handleSubmit = (event) => {
    event.preventDefault();
    Meteor.loginWithPassword(this.state.email, this.state.password, (err, result)=>{
      if(err){
        console.log(err);
          return alert("Please enter right credentails!!");
      }
      
        FlowRouter.go('/dashboard');
      
    });
  }

  signup = () => {
    FlowRouter.go('/signup');
  }

    
  render() {
    const { email, password }  = this.state;
    console.log("email & password",email,password);
    return (
     <div className="Login">
       <h1 className='header'> Login to visit Dashboard </h1>
        <Form onSubmit={this.handleSubmit} >
          <Form.Group size="lg" controlId="email" className='form_group'>
         
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.email}
              onChange={(e) => this.setState({email : e.target.value})}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password" className='form_group'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.password}
              onChange={(e) => this.setState({password : e.target.value})}
            />
          </Form.Group>
          <Button block size="lg" type="submit" variant="success" disabled={!this.validateForm()} className='form_group'>
            Login
          </Button>
          <Button block size="lg"  disabled={this.validateForm()} className='form_group form_signup' onClick={this.signup} >
            Signup
          </Button>
          
        </Form>
      </div>
    )
  }
}
