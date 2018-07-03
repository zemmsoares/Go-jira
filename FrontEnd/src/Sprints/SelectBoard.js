import React from 'react';
import TableSprints from './TableSprints';
import '../App.css';
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
import Modal  from '../Common/Modal/Modal';
import Timeline from '../Common/Timeline';
import TableClick from '../Common/TableClick';
import ModalStorypoints from '../Common/Modal/ModalStorypoints';
import SprintStoryPoints from './SprintStoryPoints';
import config from '../config.json';

export default class SelectBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            exemplo: 1,
            example: 55,
            boardname: '',
            completedIssues: [],
            issuesNotCompletedInCurrentSprint: [],
            puntedIssues: [],
            issuesCompletedInAnotherSprint: [],
            sprint: 'exemplo',
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
                            '48x48': 'https://avatar-cdn.atlassian.com/027b1915db1b356e9ca8c02f7a553c6b?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F027b1915db1b356e9ca8c02f7a553c6b%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
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
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    handleChange(event){
      let index = event.target.selectedIndex;
      let el = event.target.childNodes[index];
      this.setState({value: event.target.value});
      this.setState({boardname: el.getAttribute('boardname')});
    }

    componentDidMount() {
    this.fetchData();
    this.fetchIssues();
    }


    fetchData(){
        let initialBoards = [];
    fetch([config.jira.server]+'/rapidview/')
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
    const url = [config.jira.server]+'/sprints/';
    const value = this.state.value;
    var sprintid = this.state.example;
    var string2 = url+value+'/'+sprintid;
    fetch(string2)
    .then(function(response) {
      return response.json();
    })
    .then((myJson) => this.setState({completedIssues: myJson.contents.completedIssues, issuesNotCompletedInCurrentSprint: myJson.contents.issuesNotCompletedInCurrentSprint, puntedIssues: myJson.contents.puntedIssues, issuesCompletedInAnotherSprint: myJson.contents.issuesCompletedInAnotherSprint, sprint: myJson.sprint})
    );
  }


  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    }

    Green(){
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

    handleSubmit(e){
        e.preventDefault();
        const url = [config.jira.server]+'/issue/';
        var issueid = document.getElementById("SearchTxt").value;
        var string2 = url+issueid+'/changelog';
        console.log(string2)
        fetch(string2)
        .then(function(response) {
            return response.json();
        })
        .then((myJson) => this.setState({example: myJson},() => { this.arrayteste(); this.toggleModal()})
        ).catch(function(error) {
            alert('Error');
        });
        }

    handleSubmit2(e){
        e.preventDefault();
        const url = [config.jira.server]+'/sprints/';
        const value = 1;
        var sprintid = document.getElementById("SearchTxt2").value;
        this.setState({selected: sprintid});
        var string2 = url+value+'/'+sprintid;~
        console.log(string2)
        fetch(string2)
        .then(function(response) {
          return response.json();
        })
        .then((myJson) => this.setState({completedIssues: myJson.contents.completedIssues, issuesNotCompletedInCurrentSprint: myJson.contents.issuesNotCompletedInCurrentSprint, puntedIssues: myJson.contents.puntedIssues, issuesCompletedInAnotherSprint: myJson.contents.issuesCompletedInAnotherSprint },() => this.toggleModal2())
        ).catch(function(error) {
            alert('Error');
        });
    }

    toggleModal2 = () => {
        this.setState({
          isOpen2: !this.state.isOpen2
        });
        }

        toggleModal3 = () => {
            this.setState({
              isOpen3: !this.state.isOpen3
            });
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

        console.log(this.state.example)
        
        const filteredCompletedIssues = this.state.completedIssues.map(item => (
          {
            assignee: item ? (item.assigneeName || 'Not Assigned') : 'Not Assigned',
            type: item ? (this.checkType(item.typeName) || 'Not defined') : 'Not defined',
            id: item ? (item.id || 'Does not exist') : 'Does not exist',
            key: item ? (item.key || 'Does not exist') : 'Does not exist',
            summary: item ? (item.summary || 'Does not exist') : 'Does not exist',
            storyPoints: item.currentEstimateStatistic ? (item.currentEstimateStatistic.statFieldValue.value || '0') : 0,
          }
        ));

        const filteredIssuesNotCompletedInCurrentSprint = this.state.issuesNotCompletedInCurrentSprint.map(item => (
          {
            assignee: item ? (item.assigneeName || 'Not Assigned') : 'Not Assigned',
            type: item ? (this.checkType(item.typeName) || 'Not defined') : 'Not defined',
            id: item ? (item.id || 'Does not exist') : 'Does not exist',
            key: item ? (item.key || 'Does not exist') : 'Does not exist',
            summary: item ? (item.summary || 'Does not exist') : 'Does not exist',
            storyPoints: item.currentEstimateStatistic ? (item.currentEstimateStatistic.statFieldValue.value || '0') : 0,
          }
        ));

        const filteredPuntedIssues = this.state.puntedIssues.map(item => (
            {
                assignee: item ? (item.assigneeName || 'Not Assigned') : 'Not Assigned',
                type: item ? (this.checkType(item.typeName) || 'Not defined') : 'Not defined',
                id: item ? (item.id || 'Does not exist') : 'Does not exist',
                key: item ? (item.key || 'Does not exist') : 'Does not exist',
                summary: item ? (item.summary || 'Does not exist') : 'Does not exist',
                storyPoints: item.currentEstimateStatistic ? (item.currentEstimateStatistic.statFieldValue.value || '0') : 0,
            }
          ));

        const filteredIssuesCompletedInAnotherSprint = this.state.issuesCompletedInAnotherSprint.map(item => (
            {
                assignee: item ? (item.assigneeName || 'Not Assigned') : 'Not Assigned',
                type: item ? (this.checkType(item.typeName) || 'Not defined') : 'Not defined',
                id: item ? (item.id || 'Does not exist') : 'Does not exist',
                key: item ? (item.key || 'Does not exist') : 'Does not exist',
                summary: item ? (item.summary || 'Does not exist') : 'Does not exist',
                storyPoints: item.currentEstimateStatistic ? (item.currentEstimateStatistic.statFieldValue.value || '0') : 0,
            }
          ));

          console.log(this.state.completedIssues)


          var arr1 = filteredCompletedIssues.concat(filteredPuntedIssues);
          var arr2 = arr1.concat(filteredIssuesCompletedInAnotherSprint);
          var arr3 = arr2.concat(filteredIssuesNotCompletedInCurrentSprint);

        let boards = this.state.boards;
        let optionItems = boards.map((board) =>
                <option key={board.id} value={board.id} boardname={board.name} >{board.name}</option>
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
                <a className="nav-link page-title">SPRINTS</a>
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
                    <input id="SearchTxt2"  className="form-control" type="text" placeholder="Sprint ID"></input>
                    <div className="divider"></div>
                    <button className="btn btn-primary margin-right-5" onClick={(e) => this.handleSubmit2(e)} type="submit">Search</button>
                    <div className="divider"></div>
                 </form>
            </li>    
            
                <li class="nav-item">
                    <form class="input-group ggg">
                        <input id="SearchTxt"class="form-control" type="text" placeholder="Issue ID"></input>
                        <div className="divider"></div>
                        <button class="btn btn-primary margin-right-5" type="submit" onClick={(e) => this.handleSubmit(e)} >Search</button>
                        <div className="divider"></div>
                    </form>
                </li>
        </ul>
    </div>
</nav>

                <div className="container-fluid"> 
                    <TableSprints value={this.state.value} />
                </div>

                
                <Modal  show={this.state.isOpen} onClose={this.toggleModal} titulo={this.Green(this.state.example.fields ? this.state.example.fields.status.name : 'empty')}>
                 <p></p>

                    <div class="row">
                        <div class="col-sm-1">  
                               <img src={this.state.example.fields.assignee.avatarUrls ? this.state.example.fields.assignee.avatarUrls['48x48'] : 'Empty'} className='avatar-assignee' /> 
                        </div>
                        <div class="col-sm-11">
                                <div>Creator: <b>{this.state.example.fields.creator ? this.state.example.fields.creator.name : 'EMPTY'}</b> ({this.state.example.fields.creator ? this.state.example.fields.creator.displayName : 'EMPTY'})</div>
                                <div>Assignee: <b>{this.state.example.fields.assignee ? this.state.example.fields.assignee.name : 'Not Assigned'}</b> ({this.state.example.fields.assignee ? this.state.example.fields.assignee.displayName : ''})</div>

                        </div>
                        <div class="classWithPad"></div>
                        <div class="col-sm-12">
                                 <span><bold1>Type:</bold1> {this.state.example.fields ? this.checkType(this.state.example.fields.issuetype.name) : 'EMPTY'}</span>
                                <div><bold1>Summary:</bold1> {this.state.example.fields ? this.state.example.fields.summary : 'EMPTY'}</div>
                                <div><bold1>Description:</bold1> {this.state.example.fields ? this.state.example.fields.description : 'EMPTY'}</div>         
                        </div>
                        <div class="classWithPad"></div>
                        <div class="col-sm-12">
                                <div><bold1>Created:</bold1> {this.state.example.fields ? this.state.example.fields.created : 'EMPTY'}</div>
                                <div><bold1>Resolution Date:</bold1> {this.state.example.fields.resolutiondate ? this.state.example.fields.resolutiondate : 'EMPTY'}</div>
                                <div><bold1>Time Spent:</bold1> {this.state.example.fields.timetracking.timespent ? this.state.example.fields.timetracking.timeSpent : 'EMPTY'}</div>   
                                <div><bold1>Story Points:</bold1> {this.state.example.fields ? this.state.example.fields[config.jira.storypointsfield] : '0'}</div>
                        </div>
                        <div class="classWithPad"></div>
                        <div class="col-sm-12">
                                
                            <Timeline data={this.state.b} />
                            
                        </div>
                    </div>

                </Modal>

                <Modal  show={this.state.isOpen2} onClose={this.toggleModal2} titulo={'Sprint '+this.state.selected} story={<button className="btn storybutton" onClick={this.toggleModal3}>StoryPoints</button>}>
                    <TableClick data={filteredCompletedIssues} header={'Completed Issues'+' ('+filteredCompletedIssues.length+')'} />
                    <TableClick data={filteredIssuesNotCompletedInCurrentSprint} header={'Issues Not Completed in Current Sprint'+' ('+filteredIssuesNotCompletedInCurrentSprint.length+')'} />
                    <TableClick data={filteredPuntedIssues} header={'Punted Issues'+' ('+filteredPuntedIssues.length+')'} />
                    <TableClick data={filteredIssuesCompletedInAnotherSprint} header={'IssuesCompleted in Another Sprint'+' ('+filteredIssuesCompletedInAnotherSprint.length+')'} />
                </Modal >
                <br />

                <ModalStorypoints show={this.state.isOpen3} onClose={this.toggleModal3} titulo={'Storypoints Sprint '+this.state.selected} >
                    <SprintStoryPoints data={arr3} />
                </ModalStorypoints>
        </div>
            
        )
    }
}
