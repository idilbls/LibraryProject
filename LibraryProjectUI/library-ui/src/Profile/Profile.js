import React from 'react';  
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap'; 
import {Link} from 'react-router-dom';
import axios from 'axios';  
import "./Profile.css";

class Profile extends React.Component{
    constructor(props){  
        super(props)  
        this.state = {
            username: '',
            email: ''
          };
      }   

      componentDidMount(){
        axios.get('https://localhost:44364/api/User/get_by_name?username='+sessionStorage.getItem('username'), {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response=>{
            this.setState({ 
                username: response.data.userName,
                email: response.data.email
             });
        })
        .catch(function (error){
            console.log(error);
        })
    }

      render() {  
        return (
            <Container className="App col-3">
                <h2>User Information</h2>
                <p className='p-text'>Username: <span className='p-inner'>{this.state.username}</span></p>
                <p className='p-text'>Email: <span className='p-inner'>{this.state.email}</span></p>
                <Link to={"/ChangePassword"} className="nav-link">
                  ChangePassword
                </Link>
              </Container>
          ); 
        } 
}
export default Profile;  