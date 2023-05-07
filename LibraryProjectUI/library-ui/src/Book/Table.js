import React, { Component } from 'react';  
import axios from 'axios';  
import { Link } from 'react-router-dom';  
class Table extends Component {  
  constructor(props) {  
    super(props);  
    }  

    DeleteBook= () =>{  
        axios.delete('https://localhost:44364/api/Book/delete?id='+this.props.obj.id, {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
     .then(json => {  
     if(json.data.Status==='Delete'){  
     alert('Record deleted successfully!!');  
     }  
     })  
     }  
  render() {  
    return (  
        <tr>  
          <td>  
            {this.props.obj.id}  
          </td>  
          <td>  
            {this.props.obj.name}  
          </td>  
          <td>  
            {this.props.obj.author}  
          </td>  
          <td>  
            {this.props.obj.publishYear}  
          </td>
          <td>  
            {this.props.obj.publisher}  
          </td>  
          <td>  
            {this.props.obj.isbnNumber}  
          </td> 
          <td>  
            {this.props.obj.language}  
          </td> 
          <td>  
            {this.props.obj.pageCount}  
          </td> 
          <td>  
            {this.props.obj.genre}  
          </td> 
          <td>  
          <Link to={"/edit/"+this.props.obj.id} className="btn btn-success">Edit</Link>  
          </td>  
          <td>  
            <button type="button" onClick={this.DeleteBook} className="btn btn-danger">Delete</button>  
          </td>  
        </tr>  
    );  
  }  
}  
  
export default Table;  