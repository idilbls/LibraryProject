import './App.css';
import AddBook from './Book/AddBook';  
import BookList from './Book/BookList';  
import UpdateBook from './Book/UpdateBook'; 
import Login from './Auth/Login';
import Register from './Auth/Register';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router forceRefresh={true}>  
      <div>  
      {isAuthenticated ? (      
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
      </nav>) : (
        <nav className="navbar navbar-expand navbar-dark bg-dark p-2">
        <a href="/" className="navbar-brand">
          Library
        </a>
      </nav>
      ) }
      {isAuthenticated?(<div></div>):(
        <div>
          <NavLink to="/Login" activeClassName="active">Login</NavLink>
          <NavLink to="/Register" activeClassName="active">Register</NavLink>
        </div>
      )}
      

          <div className="container mt-3">
          <Switch>  
          <Route path='/Login' component={Login} />
          <Route path='/Register' component={Register} />
          <Route path='/BookList' component={BookList} />
          <Route path='/AddBook' component={AddBook} />  
          <Route path='/edit/:id' component={UpdateBook} />              
        </Switch>
          </div>  
      </div>  
    </Router>  


  );
}

export default App;
