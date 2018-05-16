import React, { Component } from 'react';
import Table from './Table';
import Modal from '../Common/Modal/Modal';
import '../App.css';
import logoicon from '../img/go-logo-icon.png';
import MdSearch from 'react-icons/lib/md/search';

class SelectAssignee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'aavelar',
            exemplo: undefined,
            boards: []
        };
       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }


    fetchData(){
      let initialBoards = [];
    fetch('http://localhost:8000/users/GO')
        .then(response => {
            return response.json();
        }).then(data => {
        initialBoards = data.map((board) => {
            return board
        });
        this.setState({
            boards: initialBoards,
         });
        });
    }


    componentDidMount() {
      this.fetchData();
    }


    handleSubmit(event){
       this.fetchModal();
       this.toggleModal();
    }

    updateInput(event){
        this.setState({config : event.target.value});
    }  

    toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    }

    fetchModal(){
      const url = 'http://localhost:8000/issue/';
      const value = this.state.config;
      const string = url+value;
      console.log(string);
      fetch(string)
      .then(function(response) {
        return response.json();
      })
      .then((myJson) => this.setState(myJson));
      }
    
    

    render () {

        let boards = this.state.boards;
        let optionItems = boards.map((board) =>
                <option key={board.id} value={board.id} >{board.name}</option>
            );

        return (

            <div className="container-fluid">
                <div className="row">
                    <div className="col testex" align="left">
                    <img src={logoicon} className="logoicon" />
                    <strong className="page-title">Assigned to</strong>
                     <select value={this.state.value} onChange={this.handleChange} className="custom-select dropbox">
                         {optionItems}
                     </select>
                     </div>

                <form class="form-inline">
                    <div className="col testec text-right">
                     <input onChange={this.updateInput} className="form-control" placeholder="Search Issue ID..."/>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-default btn-search"> <MdSearch color="#5D5D5D"/> </button>

                    </div> 
                </form>
                    
                </div>

                <div className="testez"></div>

                <div className="container-fluid"> 
                    <Table value={this.state.value} />
                </div>

                        <Modal show={this.state.isOpen} titulo={this.state.key}
                              onClose={this.toggleModal}>
                              <div>Assignee: {this.state.fields ? this.state.fields.assignee.displayName : 'EMPTY'}</div>
                              <p></p>
                              Id: {this.state.id}
                              <p></p>
                              <div>Key: {this.state.key}</div>
                              <p></p>
                              Created: {this.state.fields ? this.state.fields.created : 'EMPTY'}
                              <p></p>
                              Description: {this.state.fields ? this.state.fields.description : 'EMPTY'}
                              <p></p>
                              Summary: {this.state.fields ? this.state.fields.summary : 'EMPTY'}
                              <p></p>
                              Status: {this.state.fields ? this.state.fields.status.name : 'Empty'}
                              <p></p>
                              Creator: {this.state.fields ? this.state.fields.creator.displayName : 'Empty'}
                              <p></p>
                        </Modal>

            </div>
        )
    }
}

export default SelectAssignee;