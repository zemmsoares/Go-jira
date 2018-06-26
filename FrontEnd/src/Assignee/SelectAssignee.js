import React, { Component } from 'react';
import '../App.css';
import TableAssignee from './TableAssignee';
import ModalAdvancedSearch from '../Common/Modal/ModalAdvancedSearch';
import Modal from '../Common/Modal/Modal';
import AdvancedSearch from './AdvancedSearch';
import TaskStatus from './TaskStatus';
import Timeline from '../Common/Timeline';
import readyfordev from '../img/StatusIcon/readyfordev.png';
import done from '../img/StatusIcon/done.png';
import inprogress from '../img/StatusIcon/inprogress.png';
import pending from '../img/StatusIcon/pending.png';
import peerreview from '../img/StatusIcon/peerreview.png';
import Storyicon from '../img/TaskIcons/Storyicon.svg';
import Bugicon from '../img/TaskIcons/Bugicon.svg';
import Incidenticon from '../img/TaskIcons/Incidenticon.svg';
import Taskicon from '../img/TaskIcons/Taskicon.svg';
import Subtaskicon from '../img/TaskIcons/Subtaskicon.svg';
import Epicicon from '../img/TaskIcons/Epicicon.svg';
import config from '../config.json';

export default class SelectAssignee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'aavelar',
            exemplo: undefined,
            boards: [],
            example: {
                fields: {
                    issuetype: {
                        name: undefined,
                    },
                    resolutiondate: undefined,
                    status: { 
                        name: undefined,
                    },
                    assignee: {
                        avatarUrls: {
                            '48x48':{

                            }
                        }
                    },
                    creator: {
                        name: undefined,
                    },
                    timetracking:{
                        timespent: undefined,
                    },
                    created: '1',
                }   
            }
        };
       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    fetchData(){
      let initialBoards = [];
    fetch([config.backend.url]+'/users/GO&maxResults=5000')
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
      fetch(string)
      .then(function(response) {
        return response.json();
      })
      .then((myJson) => this.setState(myJson));
      }

      handleSubmit2(e){
        e.preventDefault();
        const url = 'http://localhost:8000/issue/';
        var issueid = document.getElementById("SearchTxt").value;
        if(issueid == 0){
            alert('Please insert IssueID or IssueKey')
        }else{
            var string2 = url+issueid+'/changelog';
            fetch(string2)
            .then(function(response) {
              return response.json();
            })
            .then((myJson) => this.conditionalChaining(myJson));
        }
}

        conditionalChaining(myJson) {
            if (myJson.errorMessages == 'Issue Does Not Exist') {
                alert('Issue doesn´t exist');
            } else {
                this.setState({example: myJson},() => { this.arrayteste(); this.toggleModal2()});
            }
        }

        toggleModal2 = () => {
            this.setState({
              isOpen2: !this.state.isOpen2
            });
            }

        TaskStatus(){
            const estado = (this.state.example.fields ? this.state.example.fields.status.name : 'Empty');
            if(estado == 'Done'){
                return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={done} className='estado' ></img></div>
            } else if (estado == 'Ready for Dev') {
                return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={readyfordev} className='estado' ></img></div>
            } else if (estado == 'In Progress') {
                return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={inprogress} className='estado' ></img></div>
            } else if (estado == 'Pending'){
                return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={pending} className='estado' ></img></div>
            } else if (estado == 'Peer Review'){
              return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={peerreview} className='estado' ></img></div>
            }
            return <div>{estado}</div>
        }

        checkType(type){
            if(type == 'Story'){
              return <span><img src={Storyicon}></img> Story</span>
            }else if (type == 'Bug') {
              return <span><img src={Bugicon}></img> Bug</span>
            }else if (type == 'Incident'){
              return <span><img src={Incidenticon}></img> Incident</span>
            }else if (type == 'Task'){
              return <span><img src={Taskicon}></img> Task</span>
            }else if (type == 'Sub-task'){
              return <span><img src={Subtaskicon}></img> Sub-Task</span>
            }else if (type == 'Epic'){
              return <span><img src={Epicicon}></img> Epic</span>
            }
            return <div>LOL</div>
          }


          arrayteste(){
            const filterteste = this.state.example.changelog.histories.map(item => (
                {
                  id: item.id,            
                  created: item.created,
                  field: item.items.filter((item)=> {return item.field != null}),
                  fromStringprop: item.items.filter((item)=> {return item.fromString != null}),
                  toStringprop: item.items.filter((item)=> {return item.toString != null})
                }
              ));

              let a = [];
              const filterarray = filterteste;
              for (let i = 0; i < filterarray.length; i++) {
                  if(filterarray[i].fromStringprop.length > 1){
                    for(let z = 0; z < filterarray[i].fromStringprop.length; z++){
                        a.push(
                            {
                                data: filterarray[i] ? (filterarray[i].created || 'NoData') : 0, 
                                status: filterarray[i].fromStringprop[z] ? (filterarray[i].fromStringprop[z].field || 'NoStatus') : 0, 
                                statusInicio: filterarray[i].fromStringprop[z] ? (filterarray[i].fromStringprop[z].fromString || 'Backlog') : 'Backlog', 
                                statusFim: filterarray[i].fromStringprop[z] ? (filterarray[i].fromStringprop[z].toString || 'Backlog') : 'Backlog',
                            });
                    }
                  }else{
                        a.push(
                            {
                                data: filterarray[i] ? (filterarray[i].created || 'NoData') : 0, 
                                status: filterarray[i].fromStringprop[0] ? (filterarray[i].fromStringprop[0].field || 'NoStatus') : 0, 
                                statusInicio: filterarray[i].fromStringprop[0] ? (filterarray[i].fromStringprop[0].fromString || 'Backlog') : 'Backlog', 
                                statusFim: filterarray[i].fromStringprop[0] ? (filterarray[i].fromStringprop[0].toString || 'Backlog') : 'Backlog',
                            });
                  }
              }

              let b = [];
              for (let x = 0; x < a.length; x++) {
                  if(a[x].status == 'status'){
                      b.push(
                          {
                            data: a[x].data.slice(0,10),
                            hora: a[x].data.slice(11,19),
                            status: a[x].status,
                            statusInicio: a[x].statusInicio,
                            statusFim: a[x].statusFim,

                          }
                      )
                  } this.setState({b: b})
              }
      }

    render () {

        let boards = this.state.boards;
        let optionItems = boards.map((board) =>
                <option key={board.id} value={board.id} >{board.name}</option>
            );

        return (

            <div>

            <nav class="navbar navbar-expand-md navbar-dark navcolor">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
        
            <li className="nav-item btn-padding-40"></li>

            <li className="nav-item btn-padding-40">
            </li>

            <li className="nav-item btn-padding-45">
                <a className="nav-link page-title">ASSIGNED</a>
            </li>
            <li class="nav-item">
             <select value={this.state.value} onChange={this.handleChange} className="custom-select form-control btn-padding droppadding">
                    {optionItems}
             </select>
            </li>
        </ul>
    </div>
    <div class="mx-auto order-0">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                 <form class="input-group ggg">
                 <div className="divider"></div>
                    <input id="SearchTxt"  className="form-control" type="text" placeholder="IssueID or IssueKey"></input>
                    <div className="divider"></div>
                    <button className="btn searchsprintpad" onClick={(e) => this.handleSubmit2(e)} type="submit">Search</button>
                    <div className="divider"></div>
                 </form>
            </li>    
            
                <li class="nav-item">
                    <form class="input-group ggg">
                         <div className="divider"></div>
                        <button class="btn btn-primary margin-right-5" onClick={this.handleSubmit} type="button" >Advanced Search</button>
                        <div className="divider"></div>
                    </form>
                </li>
        </ul>
    </div>
</nav>
                <div className="container-fluid"> 
                    <TableAssignee value={this.state.value} />
                </div>

                        <ModalAdvancedSearch show={this.state.isOpen} titulo={'Advanced Search'} 
                              onClose={this.toggleModal}>
                        <AdvancedSearch />
                        </ModalAdvancedSearch>

                <Modal  show={this.state.isOpen2} onClose={this.toggleModal2} titulo={this.TaskStatus(this.state.example.fields ? this.state.example.fields.status.name : 'empty')}>
                 <p></p>

                    <div class="row">
                        <div class="col-sm-1">  
                        <img src={this.state.example.fields.assignee ? (this.state.example.fields.assignee.avatarUrls['48x48'] || 'http://www.gravatar.com/avatar/0548f8c27d935d940d40d92c3b4e1a50?d=mm&s=48') : 'http://www.gravatar.com/avatar/0548f8c27d935d940d40d92c3b4e1a50?d=mm&s=48'} className='avatar-assignee' /> 
                        </div>
                        <div class="col-sm-11">
                                <div>Creator: <b>{this.state.example.fields.creator ? this.state.example.fields.creator.name : 'Not Defined'}</b> ({this.state.example.fields.creator ? this.state.example.fields.creator.displayName : 'Not Defined'})</div>
                                <div>Assignee: <b>{this.state.example.fields.assignee ? this.state.example.fields.assignee.name : 'Not Assigned'}</b> ({this.state.example.fields.assignee ? this.state.example.fields.assignee.displayName : ''})</div>

                        </div>
                        <div class="classWithPad"></div>
                        <div class="col-sm-12">
                                <span><bold1>Type:</bold1> {this.state.example.fields ? this.checkType(this.state.example.fields.issuetype.name) : 'Not Defined'}</span>
                                <div><bold1>Summary:</bold1> {this.state.example.fields ? this.state.example.fields.summary : 'Not Defined'}</div>
                                <div><bold1>Description:</bold1> {this.state.example.fields ? this.state.example.fields.description : 'Not Defined'}</div>         
                        </div>
                        <div class="classWithPad"></div>
                        <div class="col-sm-12">
                                <div><bold1>Created:</bold1> {this.state.example.fields ? this.state.example.fields.created : 'Not Defined'}</div>
                                <div><bold1>Resolution Date:</bold1> {this.state.example.fields.resolutiondate ? this.state.example.fields.resolutiondate : 'Not Complete'}</div>
                                <div><bold1>Time Spent:</bold1> {this.state.example.fields.timetracking.timespent ? this.state.example.fields.timetracking.timeSpent : 'Not Defined'}</div>   
                                <div><bold1>Story Points:</bold1> {this.state.example.fields ? this.state.example.fields[config.jira.storypointsfield] : '0'}</div>
                        </div>
                        <div class="classWithPad"></div>
                        <div class="col-sm-12">
                                 
                        <Timeline data={this.state.b} />

                        </div>

                    </div>

                </Modal >
            </div>
        )
    }
}