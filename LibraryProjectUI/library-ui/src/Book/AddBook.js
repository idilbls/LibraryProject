import React from 'react';  
import axios from 'axios';  
import '../Book/AddBook.css'  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
class AddBook extends React.Component{  

constructor(props){  
  super(props)  
  this.createBook = this.createBook.bind(this);  
  this.state = {  
    name:'',  
    author:'',
    publishYear: 0,
    publisher: '',
    isbnNumber:'', 
    language: '',
    pageCount: 0,
    genre: ''
  }  
}   
async createBook(e){  
  e.preventDefault(); 
await  axios.post('https://localhost:44364/api/Book/add/', 
{   id: 0,
    name: this.state.name,
    author: this.state.author,
    publishYear: this.state.publishYear,
    publisher:  this.state.publisher,
    isbnNumber:  this.state.isbnNumber,
    language:  this.state.language,
    pageCount:  this.state.pageCount,
    genre:  this.state.genre,
    },{headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }})  
    .then(res => console.log(res.data));  
    this.props.history.push('/BookList') 
} 

handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});  
}  
   
render() {  
return (  
   <Container className="App">  
    <h4 className="PageHeading">Enter Book Informations</h4>  
    <Form className="form" onSubmit={this.createBook}>  
      <Col>  
        <FormGroup row className="p-4 pb-0">  
          <Label for="name" sm={2}>Name</Label>  
          <Col sm={10}>  
            <Input type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Enter Name" required/>  
          </Col>  
        </FormGroup>  
        <FormGroup row className="p-4 pb-0">  
          <Label for="author" sm={2}>Author</Label>  
          <Col sm={10}>  
            <Input type="text" name="author" onChange={this.handleChange} value={this.state.author} placeholder="Enter Author" required/>  
          </Col>  
        </FormGroup>  
        <FormGroup row className="p-4 pb-0">  
          <Label for="publishYear" sm={2}>Publish Year</Label>  
          <Col sm={10}>  
            <Input type="number" name="publishYear" onChange={this.handleChange} value={this.state.publishYear} placeholder="Enter Publish Year" required/>  
          </Col>  
        </FormGroup>  
        <FormGroup row className="p-4 pb-0">  
          <Label for="publisher" sm={2}>Publisher</Label>  
          <Col sm={10}>  
            <Input type="text" name="publisher" onChange={this.handleChange} value={this.state.publisher} placeholder="Enter Publisher" required/>  
          </Col>  
        </FormGroup>  
        <FormGroup row className="p-4 pb-0">  
          <Label for="isbnNumber" sm={2}>ISBN Number</Label>  
          <Col sm={10}>  
            <Input type="text" name="isbnNumber" onChange={this.handleChange} value={this.state.isbnNumber} placeholder="Enter ISBN Number" required/>  
          </Col>  
        </FormGroup>  
        <FormGroup row className="p-4 pb-0">  
          <Label for="language" sm={2}>Language</Label>  
          <Col sm={10}>  
            <Input type="text" name="language" onChange={this.handleChange} value={this.state.language} placeholder="Enter Language" required/>  
          </Col>  
        </FormGroup>  
        <FormGroup row className="p-4 pb-0">  
          <Label for="pageCount" sm={2}>Page Count</Label>  
          <Col sm={10}>  
            <Input type="text" name="pageCount" onChange={this.handleChange} value={this.state.pageCount} placeholder="Enter Page Count" required/>  
          </Col>  
        </FormGroup> 
        <FormGroup row className="p-4 pb-0">  
          <Label for="Genre" sm={2}>genre</Label>  
          <Col sm={10}>  
            <Input type="text" name="genre" onChange={this.handleChange} value={this.state.genre} placeholder="Enter Genre" required/>  
          </Col>  
        </FormGroup>   
      </Col>  
      <Col>  
        <FormGroup row className="mt-4">  
          <Col sm={5}>  
          </Col>  
          <Col sm={1}>  
          <Button variant="contained" type="submit" color="success">Submit</Button>

          </Col>  
          <Col sm={1}>  
            <Button variant="contained" color="danger">Cancel</Button>
          </Col>  
          <Col sm={5}>  
          </Col>  
        </FormGroup>  
      </Col>  
    </Form>  
  </Container>  
);  
}  
   
}  
   
export default AddBook;  
   