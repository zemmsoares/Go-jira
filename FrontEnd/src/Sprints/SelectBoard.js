import React from 'react';
import Table from './Table';
import '../App.css';
import logoicon from '../img/go-logo-icon.png';
import MdSearch from 'react-icons/lib/md/search';
import Modal from '../Common/Modal/Modal';
import ResponseTable from '../Common/Responsetable';

class SelectBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            exemplo: 1,
            example: 55,
            boardname: '',
            issues: [],
            teste: [],
            boards: []
        };
       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    handleChange(event){
      let index = event.target.selectedIndex;
      let el = event.target.childNodes[index];
      this.setState({value: event.target.value});
      this.setState({boardname: el.getAttribute('boardname')});
    }

     updateInput(event){
        this.setState({example : event.target.value});
    }  


    handleSubmit(event){
       this.fetchIssues();
       this.toggleModal();
    }

    componentDidMount() {
    this.fetchData();
    this.fetchIssues();
    }


    fetchData(){
        let initialBoards = [];
    fetch('http://localhost:8000/rapidview/')
        .then(response => {
            return response.json();
        }).then(data => {
        initialBoards = data.views.map((board) => {
            return board
        });
        this.setState({
            boards: initialBoards,
         });
        });
    }


  fetchIssues(){
    const url = 'http://localhost:8000/sprints/';
    const value = this.state.value;
    var sprintid = this.state.example;
    var string2 = url+value+'/'+sprintid;
    fetch(string2)
    .then(function(response) {
      return response.json();
    })
    .then((myJson) => this.setState({issues: myJson.contents.completedIssues, teste: myJson.contents.issuesNotCompletedInCurrentSprint}));
  }



    toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    }


    render () {

        
        const filteredResult = this.state.issues.map(item => (
          {
            id: item.id,
            key: item.key,
            type: item.typeName,
            summary: item.summary
          }
        ));

        const filteredResult2 = this.state.teste.map(item => (
          {
            id: item.id,
            key: item.key,
            type: item.typeName,
            summary: item.summary
          }
        ));

        let boards = this.state.boards;
        let optionItems = boards.map((board) =>
                <option key={board.id} value={board.id} boardname={board.name} >{board.name}</option>
            );

        return (

            <div className="container-fluid">
                <div className="row">
                    <div className="col testex" align="left">
                    <img src={logoicon} className="logoicon" />
                    <strong className="page-title">Sprints</strong>
                     <select value={this.state.value} onChange={this.handleChange} className="custom-select dropbox">
                         {optionItems}
                     </select>
                     </div>

                <form class="form-inline">
                    <div className="col testec text-right">
                     <input onChange={this.updateInput} className="form-control" placeholder="Search Sprint ID..."/>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-default btn-search"> <MdSearch color="#5D5D5D"/> </button>

                    </div> 
                </form>
                    
                </div>

                <div className="testez"></div>

                <div className="container-fluid"> 
                    <Table value={this.state.value} />
                </div>

                        <Modal show={this.state.isOpen} titulo={this.state.boardname}
                              onClose={this.toggleModal}>
                            
                            <div>
                                <h3><span>CompletedIssues:</span></h3>
                                <ResponseTable data={filteredResult} />

                                <h3><span1>issuesNotCompletedInCurrentSprint:</span1></h3>
                                <ResponseTable data ={filteredResult2} />
                            </div>


                        </Modal>

            </div>
        )
    }
}

export default SelectBoard;