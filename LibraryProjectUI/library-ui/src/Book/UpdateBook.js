import React from 'react';   
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import axios from 'axios'  
import '../Book/AddBook'  
class Edit extends React.Component {  
    constructor(props) {  
        super(props)  
     
    this.onChangeName = this.onChangeName.bind(this);  
    this.onChangeAuthor = this.onChangeAuthor.bind(this);  
    this.onChangePublishYear = this.onChangePublishYear.bind(this);  
    this.onChangePublisher = this.onChangePublisher.bind(this);
    this.onChangeIsbnNumber = this.onChangeIsbnNumber.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangePageCount = this.onChangePageCount.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);  
  
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
  
  componentDidMount() {
      axios.get('https://localhost:44364/api/Book/get_by_id?id='+this.props.match.params.id, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })  
          .then(response => {  
              this.setState({ 
                name:response.data.name,
                author:response.data.author,  
                publishYear:response.data.publishYear, 
                publisher:response.data.publisher,
                isbnNumber:response.data.isbnNumber,
                language:response.data.language,
                pageCount:response.data.pageCount,
                genre:response.data.genre 
             });  
             console.log(response.data);
  
          })  
          .catch(function (error) {  
              console.log(error);  
          })  
    }  
  
  onChangeName(e) {  
    this.setState({  
        name: e.target.value  
    });  
  }  
  onChangeAuthor(e) {  
    this.setState({  
        author: e.target.value  
    });    
  }  
  onChangePublishYear(e) {  
    this.setState({  
        publishYear: e.target.value  
    });  
}  
onChangePublisher(e) {  
    this.setState({  
        publisher: e.target.value  
    });  
}  
onChangeIsbnNumber(e) {  
    this.setState({  
        isbnNumber: e.target.value  
    });  
}  
onChangeLanguage(e) {  
    this.setState({  
        language: e.target.value  
    });  
}  
onChangePageCount(e) {  
    this.setState({  
        pageCount: e.target.value  
    });  
}  
onChangeGenre(e) {  
    this.setState({  
        genre: e.target.value  
    });  
}  

  
  onSubmit(e) {   
       e.preventDefault();  
    const obj = {  
      id:this.props.match.params.id,  
      name: this.state.name, 
      author: this.state.author,
      publishYear: this.state.publishYear,  
      publisher: this.state.publisher,  
      isbnNumber: this.state.isbnNumber,
      language: this.state.language,
      pageCount: this.state.pageCount,
      genre: this.state.genre
    };  
    axios.post('https://localhost:44364/api/Book/update/', obj,{headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }})  
        .then(res => console.log(res.data));  
        this.props.history.push('/BookList')  
  }  
    render() {  
        return (  
            <Container className="App">  
  
             <h4 className="PageHeading">Update Book Informations</h4>  
                <Form className="form" onSubmit={this.onSubmit}>  
                    <Col>  
                        <FormGroup row className="p-4 pb-0">  
                            <Label for="name" sm={2}>Name</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="name" value={this.state.name} onChange={this.onChangeName}  
                                placeholder="Enter Name" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row className="p-4 pb-0">  
                            <Label for="author" sm={2}>Author</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="author" value={this.state.author} onChange={this.onChangeAuthor} placeholder="Enter Author" />  
                            </Col>  
                        </FormGroup>  
                         <FormGroup row className="p-4 pb-0">  
                            <Label for="publishYear" sm={2}>Publish Year</Label>  
                            <Col sm={10}>  
                                <Input type="number" name="publishYear" value={this.state.publishYear} onChange={this.onChangePublishYear} placeholder="Enter Publish Year" />  
                            </Col>  
                        </FormGroup>   
                        <FormGroup row className="p-4 pb-0">  
                            <Label for="publisher" sm={2}>Publisher</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="publisher" value={this.state.publisher} onChange={this.onChangePublisher} placeholder="Enter Publisher" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row className="p-4 pb-0">  
                            <Label for="isbnNumber" sm={2}>ISBN Number</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="isbnNumber" value={this.state.isbnNumber} onChange={this.onChangeIsbnNumber} placeholder="Enter ISBN Number" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row className="p-4 pb-0">  
                            <Label for="language" sm={2}>Language</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="language" value={this.state.language} onChange={this.onChangeLanguage} placeholder="Enter Language" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row className="p-4 pb-0">  
                            <Label for="pageCount" sm={2}>Page Count</Label>  
                            <Col sm={10}>  
                                <Input type="number" name="pageCount" value={this.state.pageCount} onChange={this.onChangePageCount} placeholder="Enter Page Count" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row className="p-4 pb-0">  
                            <Label for="genre" sm={2}>Genre</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="genre" value={this.state.genre} onChange={this.onChangeGenre} placeholder="Enter Genre" />  
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
  
export default Edit;  