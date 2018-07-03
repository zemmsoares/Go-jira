import React from 'react';
import { push as Menu } from 'react-burger-menu'
import logo from './img/logo.png';
import './App.css';
import homeIcon from 'react-icons/lib/md/home';
import runIcon from 'react-icons/lib/md/directions-run';
import issueIcon from 'react-icons/lib/md/error-outline';

export default class Header extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
  
  render () {
    return (
      <Menu>
          <img className="logo" src={logo} alt="logo"/>
      <p></p>
        <a id="home" className="menu-item" href="/"> <homeIcon /> Home</a>
        <a id="sprints" className="menu-item" href="/sprints"> <runIcon /> Sprints</a>
        <a id="assignee" className="menu-item" href="/assignee"> <issueIcon /> Assignee</a>
      </Menu>
    );
  }
}

