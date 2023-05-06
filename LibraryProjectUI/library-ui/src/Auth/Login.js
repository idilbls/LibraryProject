import React from 'react';  
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap'; 
import axios from 'axios';  
import "./Login.css";
class Login extends React.Component{
    constructor(props){  
        super(props)  
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.state = {
            username: '',
            password: ''
          };
      }   

      async handleSubmit(e){  
        e.preventDefault(); 
      await  axios.post('https://localhost:44364/api/User/login/', 
      {   id: 0,
          username: this.state.username,
          password: this.state.password})  
          .then(res => this.setToken(res.data.token));  
          this.props.history.push('/BookList') 
      } 

     setToken(token) {
        sessionStorage.setItem('token', token);
      }

      handleChange= (e)=> {  
        this.setState({[e.target.name]:e.target.value});  
        }  

      render() {  
        return (
            <Container className="App">
              <Form className="form" onSubmit={this.handleSubmit}>               
                <FormGroup size="lg" controlId="username">
                  <Label for="username">Username</Label>
                  <Input type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter Name" required/>  
                </FormGroup>
                <FormGroup size="lg" controlId="password">
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Enter Password" required/> 
                </FormGroup>
                <Button block="true" size="lg" type="submit">
                  Login
                </Button>
              </Form>
              </Container>
          ); 
        } 
}
export default Login;  