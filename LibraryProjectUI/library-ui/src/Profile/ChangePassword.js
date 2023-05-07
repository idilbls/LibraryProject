import React from 'react';  
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap'; 
import axios from 'axios';  
class ChangePassword extends React.Component{
    constructor(props){  
        super(props)  
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.state = {
            username: '',
            oldPassword: '',
            newPassword:''
          };
      }   

      async handleSubmit(e){  
        e.preventDefault(); 
      await  axios.post('https://localhost:44364/api/User/change_password/', 
      {
          username: this.state.username,
          oldPassword: this.state.oldPassword,
          newPassword:this.state.newPassword}, {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })  
          .then(res => res => console.log(res.data));  
          this.props.history.push('/Profile') 
      } 

      handleChange= (e)=> {  
        this.setState({[e.target.name]:e.target.value});  
        }  

      render() {  
        return (
            <Container className="App col-3">
              <Form className="form" onSubmit={this.handleSubmit}>               
                <FormGroup size="lg" controlId="username">
                  <Label for="username">Username</Label>
                  <Input type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter User Name" required/>  
                </FormGroup>
                <FormGroup size="lg" controlId="oldPassword" className='mt-2'>
                  <Label for="oldPassword">Old Password</Label>
                  <Input type="password" name="oldPassword" onChange={this.handleChange} value={this.state.oldPassword} placeholder="Enter Old Password" required/> 
                </FormGroup>
                <FormGroup size="lg" controlId="newPassword" className='mt-2'>
                  <Label for="newPassword">New Password</Label>
                  <Input type="password" name="newPassword" onChange={this.handleChange} value={this.state.newPassword} placeholder="Enter New Password" required/> 
                </FormGroup>
                <div>
                <Button size="lg" type="submit" className='mt-3 login-button'>
                  Change Password
                </Button> 
                </div>

              </Form>
              </Container>
          ); 
        } 
}
export default ChangePassword;  