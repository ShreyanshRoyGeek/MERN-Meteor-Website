import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,ListGroup, InputGroup, FormControl, Button, Form, Placeholder 
  } from 'react-bootstrap';
  
import './DashboardStyle.css'
import { FlowRouter } from 'meteor/kadira:flow-router';

import Paper from '@mui/material/Paper';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {
    PagingState,
    SortingState,
    IntegratedPaging,
    IntegratedSorting,
  } from '@devexpress/dx-react-grid';
import { Dropdown, DropdownButton, MenuItem } from 'react-bootstrap';
import moment from 'moment'




export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          userData : [],

          employee: [{
            name: "Shreyansh Roy",
            role: "Software Engineer"
          },{
            name: "Shai Krishna",
            role: "Senior Software Developer"
          }],

          columns: [
            { name: 'username', title: 'User' },
            { name: '_id', title: 'Employee ID' },
            // { name: 'createdAt', title: 'Date' },
            { 
              name: 'emails',
              title: 'Email' ,
              getCellValue: (row) => {
                return <span > { row.emails[0].address } </span>
              },
            },
            
          ],

          rows: [],

          findUsername: "",

          findEmail: "",

          dropdownUername: "a",

          dropdownEmail: "",

          placeholderInput: "find username",

          dropdownInput: "Options to Search"
        };
      }
    
    getData = function(){
        Meteor.call('getData', (error, result)=>{
          if(result) {
            console.log("successfull ",result);
            this.setState({ userData : result});
            this.setState({ rows : result});
            console.log("userdata",this.state.userData);
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

      getFindData = () => {
        Meteor.call('getFindData', this.state.findUsername, this.state.findEmail, (error, result)=>{
          if(result) {
            console.log("successfull_find",result);
            this.setState({ rows : result});
          } 
          else {
            console.log("fail_find",error);
          }
        })
      } 

      getFilteredUsername = () => {
        this.setState({dropdownUername: "user"})
        this.setState({dropdownEmail: ""})
        this.setState({findEmail: ""})
        this.setState({placeholderInput: "find username"})
        this.setState({dropdownInput: "Find by Username"})
      }

      getFilteredEmail = () => {
        this.setState({dropdownEmail: "email"})
        this.setState({dropdownUername: ""})
        this.setState({findUsername: ""})
        this.setState({placeholderInput: "find email"})
        this.setState({dropdownInput: "Find by Email"})
      }



  render() {
    const { userData, employee } = this.state
    // console.log(userData);
    // console.log(employee);
    // this.rows = userData;
    // this.setState({findUsername: dropdownUername});
    console.log("rows",this.state.rows);
    console.log("columns",this.state.columns);
    console.log("findUserName",this.state.findUsername);
    console.log("findUserEmail",this.state.findEmail);
    console.log("drop_username", this.state.dropdownUername);
    console.log("drop_email", this.state.dropdownEmail);
    let date = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(date);
    return (
      <Container>
          <Button block size="lg" type="submit" variant="success" className='logout_button'  onClick={this.logout}>
            Logout
          </Button>
          <div className='dropdown_button'>
          <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic"  size="sm">
            { this.state.dropdownInput }
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={this.getFilteredUsername} >
                    UserName</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={this.getFilteredEmail} >
                    Email</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
          <div>
            <input type="search"  onChange={(e) => this.state.dropdownUername ? this.setState({findUsername: e.target.value})
                  : this.setState({findEmail: e.target.value}) }
                value = { this.state.dropdownUername ? this.state.findUsername : this.state.findEmail }
                placeholder = { this.state.placeholderInput }   />
            <Button  size="sm" type="submit" variant="success"  onClick={this.getFindData}>
               Find
          </Button>
          </div>
            <Paper>
                <Grid
                  rows={this.state.rows}
                  columns={this.state.columns}
                >
                <SortingState
                    defaultSorting={[{ columnName: 'username', direction: 'asc' }]}
                />
                <IntegratedSorting />
                <PagingState
                    defaultCurrentPage={0}
                    pageSize={4}
                />
                <IntegratedPaging />
                <Table />
                <TableHeaderRow showSortingControls />
                <PagingPanel />
                </Grid>
            </Paper>
      </Container>    
    )
  }
}
