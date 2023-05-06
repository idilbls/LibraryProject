import React,{Component} from "react";
import { Table } from "react-bootstrap";
export class Book extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]}
    }
    componentDidMount(){  
        debugger;  
        axios.get('http://localhost:44364/api/Book/get_all')  
          .then(response => {  
            this.setState({ deps: response });  
            debugger;  
    
          })  
          .catch(function (error) {  
            console.log(error);  
          })  
      }  
      tabRow(){  
        return this.state.deps.map(function(object, i){  
            return <Table obj={object} key={i} />;  
        });  
      }  

    render(){
        const{deps}=this.state;
        return(
            <div className="mt-5 d-flex justify-content-left">
                Book Page
                <table className="table table-striped" style={{ marginTop: 10 }}>  
            <thead>  
              <tr>  
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