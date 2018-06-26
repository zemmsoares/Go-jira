import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu'
import logo from './img/logo.png';
import './App.css';
import Home_icon from 'react-icons/lib/md/home';
import Run_icon from 'react-icons/lib/md/directions-run';
import Issue_icon from 'react-icons/lib/md/error-outline';

export default class Header extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
  
  render () {
    return (
      <Menu>
          <img className="logo" src={logo} />
      <p></p>
        <a id="home" className="menu-item" href="/"> <Home_icon /> Home</a>
        <a id="sprints" className="menu-item" href="/sprints"> <Run_icon /> Sprints</a>
        <a id="assignee" className="menu-item" href="/assignee"> <Issue_icon /> Assignee</a>
      </Menu>
    );
  }
}

