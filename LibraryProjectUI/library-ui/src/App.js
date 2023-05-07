import './App.css';
import AddBook from './Book/AddBook';  
import BookList from './Book/BookList';  
import UpdateBook from './Book/UpdateBook'; 
import Login from './Auth/Login';
import Register from './Auth/Register';
import {BrowserRouter as Router, Route, Switch, Link, useHistory} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import Profile from './Profile/Profile';
import ChangePassword from './Profile/ChangePassword';


function App() {

  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const Logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    window.open("/");
  };

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
              <li className="nav-item">
                <Link to={"/Profile"} className="nav-link">
                  Profile
                </Link>
              </li>
            </div>
            <div className="navbar-nav ml-auto">
            <li className="nav-item">
                <Button className='nav-link' onClick={Logout}>
                  Log out
                </Button>
              </li>
            </div>
      </nav>) : (
        <nav className="navbar navbar-expand navbar-dark bg-dark p-2">
        <a href="/" className="navbar-brand">
          Library
        </a>
        <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/Login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/Register"} className="nav-link">
                Register
                </Link>
              </li>
            </div>
      </nav>
      ) }
      

          <div className="container mt-3">
          <Switch>  
          <Route path='/Login' component={Login} />
          <Route path='/Register' component={Register} />
          <Route path='/Profile' component={Profile} />
          <Route path='/ChangePassword' component={ChangePassword} />
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
