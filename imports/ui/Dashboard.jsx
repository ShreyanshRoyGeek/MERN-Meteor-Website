import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,ListGroup, InputGroup, FormControl, Button, Form, Placeholder 
  } from 'react-bootstrap';
  
import './DashboardStyle.css'
import Table from 'react-bootstrap/Table';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          userData : []
        };
      }
    
    getData = function(){
        Meteor.call('getData', (error, result)=>{
          console.log("dashboard1")
          if(result) {
            console.log("dashboard2")
            console.log("successfull ",result);
            this.setState({ userData : result})
          } 
          else {
            console.log("fail ",error);
          }
        })
      } 
      
      componentDidMount(){
        this.getData();
      }

      logout = () => {
        Meteor.logout();
        FlowRouter.go('/login');
      }


  render() {
    const { userData } = this.state
    console.log(userData);
    return (
      <Container>
          <Button block size="lg" type="submit" variant="success" className='logout_button'  onClick={this.logout}>
            Logout
          </Button>
        {/* <h1> Welcome to Dashboard </h1> */}
        <div className='mcontainer d-flex justify-content-flex-end flex-column'> 
            <div className='note-wrapper'>
              <ListGroup className='list-group'>
              </ListGroup>
                  <table striped bordered hover size="sm">
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    {/* <th>Role</th> */}
                  </tr>
                  {userData.map((user, key) => {
                    return (
                      <tr key={key}>
                        <td>{ user.username}</td>
                        <td>{user.emails[0].address}</td>
                        {/* <td>{user.Role}</td> */}
                      </tr>
                    )
                  })}
                  </table>
            </div>
        </div>
    </Container>    
    )
  }
}
