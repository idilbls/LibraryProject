import React from 'react';  
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap'; 
import axios from 'axios';  
import "./Register.css";
class Register extends React.Component{
    constructor(props){  
        super(props)  
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.state = {
            username: '',
            password: '',
            email:''
          };
      }   

      async handleSubmit(e){  
        e.preventDefault(); 
      await  axios.post('https://localhost:44364/api/User/add/', 
      {   id: 0,
          username: this.state.username,
          password: this.state.password,
          email:this.state.email})  
          .then(res => res => console.log(res.data));  
          this.props.history.push('/') 
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
                <FormGroup size="lg" controlId="email">
                  <Label for="email">Email</Label>
                  <Input type="text" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Enter Email" required/>  
                </FormGroup>
                <Button block="true" size="lg" type="submit">
                  Register
                </Button>
              </Form>
              </Container>
          ); 
        } 
}
export default Register;  