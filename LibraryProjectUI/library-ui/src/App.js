import './App.css';
import AddBook from './Book/AddBook';  
import BookList from './Book/BookList';  
import UpdateBook from './Book/UpdateBook'; 
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

function App() {
  return (
    <Router>  
      <div>  
      <nav className="navbar navbar-expand navbar-dark bg-dark p-2">
            <a href="/BookList" className="navbar-brand">
              Library
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/BookList"} className="nav-link">
                  Book List
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/AddBook"} className="nav-link">
                  Add Book
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
          <Switch>  
          <Route exact path='/AddBook' component={AddBook} />  
          <Route path='/edit/:id' component={UpdateBook} />  
          <Route path='/BookList' component={BookList} />  
        </Switch>
          </div>  
      </div>  
    </Router>  


  );
}

export default App;
