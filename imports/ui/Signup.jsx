import React, { Component } from 'react';
import "./SignupStyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Meteor } from 'meteor/meteor';
import moment from 'moment'


export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          confirm_password: "",
          username: "",
          role: ""
        };
      }

   validateForm() {
    return (this.state.email).length > 0 && (this.state.password).length > 0;
  }

    handleSubmit = (event) =>  {
    event.preventDefault();
    console.log(this.state.email); 
    let date = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(date);

    if(!(this.state.email && this.state.password && this.state.confirm_password && this.state.username && this.state.role)) {
      return alert("Please enter all the details");
    }
    Meteor.call('postData', this.state.username, this.state.email, this.state.password, this.state.role, date, (error, result)=>{
      if(result) {
        console.log("successfull ",result);
        // this.setState({ email : "", password: "", confirm_password: "", username: "", role: "" });
        FlowRouter.go('/login');
      } 
      else {
        console.log("fail ",error);
      }
    })
  }

  signup_complete = () => {
    
  }
    
  render() {
    const { email, password, confirm_password, username, role }  = this.state;
    console.log("email & password",email,password, role);
    return (
        <>
        <h1 className='header'> Fill up the  details ~ {username} </h1>
        <div className="Login">
        <Form onSubmit={this.handleSubmit} >
        <Form.Group size="lg" controlId="username" className='form_group'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="name"
              value={this.username}
              onChange={(e) => this.setState({username : e.target.value})}
            />
        </Form.Group>  
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
          <Form.Group size="lg" controlId="confirm_password" className='form_group'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={this.confirm_password}
              onChange={(e) => this.setState({confirm_password : e.target.value})}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="role" className='form_group'>
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="role"
              value={this.role}
              onChange={(e) => this.setState({role : e.target.value})}
            />
          </Form.Group>
          <Button block size="lg" type="submit" variant="success" disabled={!this.validateForm()} className='form_group'
              >
            Submit
          </Button>
          
        </Form>
      </div>
      </>
    )
  }
}
