import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from  'react-router-dom/Route';
import './App.css';
import Header from './Header';
import SelectBoard from './Sprints/SelectBoard';
import SelectAssignee from './Assignee/SelectAssignee';
import logo from './img/logo.png';

export default class App extends Component {

  render() {

    return (
      <Router>
        <div className="page">
            <Header />
              <Route path="/" exact render={ 
                () => {
                  return( 
                            <div className="homelogo">
                            <img src={logo}/>
                            </div>
                   );
                }
              }/>

              <Route path="/sprints" exact render={
                () => {
                  return(
                              <div>
                              <SelectBoard />
                              </div>
                    );
                }
              }/>

              <Route path="/assignee" exact render={
                () => {
                  return(
                              <div>
                              <SelectAssignee />
                              </div>
                    );
                }
              }/>

        </div>
      </Router>
    );
  }
}
