import axios from "axios";
import React,{Component} from "react";
import Table from './Table';  


export class BookList extends Component{

  
    constructor(props) {  
        super(props);
        this.state = {books: []};  
      } 
      
      componentDidUpdate() {

        const url = "https://localhost:44364/api/Book/get_all";
        axios.get(url, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response=>{
            this.setState({books: response.data});
        })
        .catch(function (error){
            console.log(error);
        })
      }

 componentDidMount(){
    const url = "https://localhost:44364/api/Book/get_all";
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response=>{
        this.setState({books: response.data});
    })
    .catch(function (error){
        console.log(error);
    })
}

tabRow(){  
    return this.state.books.map(function(object, i){  
        return <Table obj={object} key={i} />;  
    });  
  }  

    render(){
        return(
                <div>   
                    <h4 align="center">Book List</h4>  
          <table className="table table-striped" style={{ marginTop: 10 }}>  
            <thead>  
              <tr>  
                <th>Id</th>  
                <th>Name</th>  
                <th>Author</th>  
                <th>Publish Year</th>  
                <th>Publisher</th> 
                <th>ISBN Number</th>
                <th>Language</th>
                <th>Page Count</th>
                <th>Genre</th>
              <th colSpan="4">Action</th>  
              </tr>  
            </thead>  
            <tbody>  
             { this.tabRow() }   
            </tbody>  
          </table>  
        </div> 
        )
    }
}
export default BookList;  
   