import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Modal from '../Common/Modal/Modal';
import Timeline from '../Common/Timeline';
import readyfordev from '../img/StatusIcon/readyfordev.png';
import done from '../img/StatusIcon/done.png';
import inprogress from '../img/StatusIcon/inprogress.png';
import pending from '../img/StatusIcon/pending.png';
import peerreview from '../img/StatusIcon/peerreview.png';
import readyfortesting from '../img/StatusIcon/readyfortesting.png';
import underreview from '../img/StatusIcon/underreview.png';
import intest from '../img/StatusIcon/intest.png';
import qa from '../img/StatusIcon/qa.png';
import Storyicon from '../img/TaskIcons/Storyicon.svg';
import Bugicon from '../img/TaskIcons/Bugicon.svg';
import Incidenticon from '../img/TaskIcons/Incidenticon.svg';
import Taskicon from '../img/TaskIcons/Taskicon.svg';
import Subtaskicon from '../img/TaskIcons/Subtaskicon.svg';
import Epicicon from '../img/TaskIcons/Epicicon.svg';
import config from '../config.json';


export default class TableClick extends React.Component {

    constructor(props) { // Use Props
        super(props); // Use Props
        this.state={
            rowInfo: {
                row:{
                    id: 1,
                }
            },
            selected: undefined,
            data: [],
            value: 1,
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
        }
        this.columnsBuilder = this.columnsBuilder.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

    }
    columnsBuilder () { //Remove data

        if(this.props.data.length === 0) {
            return [{
                Header : this.props.header
            }];
        }

        const props = Object.keys(this.props.data[0]); //Use Props
        const columns = props.map( (item, index) => ({
            Header : item,
            accessor : item,
        }));

        const built = [
            {
                Header : this.props.header,
                columns,
            },
        ];        
        return built;
    }

    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
        }

        handleSubmit(event){
            this.fetchIssues();
         }
     

        fetchIssues(){
            const url = [config.jira.server]+'/issue/';
            var issueid = this.state.selected;
            var string2 = url+issueid+'/changelog';
            fetch(string2)
            .then(function(response) {
              return response.json();
            })
            .then((myJson) => this.setState({example: myJson},() => { this.arrayteste(); this.toggleModal() })
            ).catch(function(error) {
                console.log("error");
            });
          }


          TaskStatus(){
              const estado = (this.state.example.fields ? this.state.example.fields.status.name : 'Empty');
              if(estado === 'Done'){
                  return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={done} className='estado' alt="done" ></img></div>
              } else if (estado === 'Ready for Dev') {
                  return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={readyfordev} className='estado' alt="readyfordev" ></img></div>
              } else if (estado === 'In Progress') {
                  return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={inprogress} className='estado' alt="inprogress" ></img></div>
              } else if (estado === 'Pending'){
                  return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={pending} className='estado' alt="pending" ></img></div>
              } else if (estado === 'Peer Review'){
                return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={peerreview} className='estado' alt="peerreview" ></img></div>
              } else if (estado === 'Ready for Testing') {
                return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={readyfortesting} className='estado' alt="readyfortesting" ></img></div>
              } else if (estado === 'Under Review') {
                return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={underreview} className='estado' alt="underreview" ></img></div>
              } else if (estado === 'In Test') {
                return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={intest} className='estado' alt="intest" ></img></div>
              }else if (estado === 'QA Improvements') {
                return <div><c style={{color: '#b8b7ad'}}>{this.state.example.key}</c>   <img src={qa} className='estado' alt="qa" ></img></div>
              }
              return <div>{estado}</div>
          }


          formatDate(date){
            if(date == null){
              return ;
            } else {
              const slicedDate = date.slice(0,10);
              return slicedDate
            }
          }

          checkType(type){
            if(type === 'Story'){
              return <div><img src={Storyicon} alt="icon_story"></img> Story</div>
            }else if (type === 'Bug') {
              return <div><img src={Bugicon} alt="icon_bug"></img> Bug</div>
            }else if (type === 'Incident'){
              return <div><img src={Incidenticon} alt="icon_incident"></img> Incident</div>
            }else if (type === 'Task'){
              return <div><img src={Taskicon} alt="icon_task"></img> Task</div>
            }else if (type === 'Sub-task'){
              return <div><img src={Subtaskicon} alt="icon_sub-task"></img> Sub-Task</div>
            }else if (type === 'Epic'){
              return <div><img src={Epicicon} alt="icon_epic"></img> Epic</div>
            }
            return <div>undefined</div>
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
                  if(a[x].status === 'status'){
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

    render() {


        return (
            <div>
                <ReactTable
                    data={this.props.data}
                    filterable
                    columns={this.columnsBuilder()} // Remove Props
                    defaultPageSize={10}
                    className="-striped -highlight"
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: e => 
                            this.setState({
                                  selected: rowInfo ? rowInfo.row.id : '',
                              }, () => this.handleSubmit())
                        };
                      }}
                /> 
                
                <Modal  show={this.state.isOpen} onClose={this.toggleModal} titulo={this.TaskStatus(this.state.example.fields ? this.state.example.fields.status.name : 'empty')}>
                <p></p>

                    <div class="row">
                        <div class="col-sm-1">  
                               <img src={this.state.example.fields.assignee ? (this.state.example.fields.assignee.avatarUrls['48x48'] || 'http://www.gravatar.com/avatar/0548f8c27d935d940d40d92c3b4e1a50?d=mm&s=48') : 'http://www.gravatar.com/avatar/0548f8c27d935d940d40d92c3b4e1a50?d=mm&s=48'} className='avatar-assignee' alt="avatar" /> 
                        </div>
                        <div class="col-sm-11">
                                <div>Creator: <b>{this.state.example.fields.creator ? (this.state.example.fields.creator.name || 'Not Defined') : 'Not Defined'}</b> ({this.state.example.fields.creator ? (this.state.example.fields.creator.displayName || 'Not Defined') : 'Not Defined'})</div>
                                <div>Assignee: <b>{this.state.example.fields.assignee ? (this.state.example.fields.assignee.name || 'Not Assigned') : 'Not Assigned'}</b> ({this.state.example.fields.assignee ? (this.state.example.fields.assignee.displayName || 'Not Defined') : 'Not Defined'})</div>

                        </div>
                        <div class="classWithPad"></div>
                        <div class="col-sm-12">
                                <span><bold1>Type:</bold1> {this.state.example.fields ? (this.checkType(this.state.example.fields.issuetype.name) || 'Not Defined') : 'Not Defined'}</span>
                                <div><bold1>Summary:</bold1> {this.state.example.fields ? (this.state.example.fields.summary || 'Not Defined') : 'Not Defined'}</div>
                                <div><bold1>Description:</bold1> {this.state.example.fields ? (this.state.example.fields.description || 'Not Defined') : 'Not Defined'}</div>         
                        </div>
                        <div class="classWithPad"></div>
                        <div class="col-sm-12">
                                <div><bold1>Created:</bold1> {this.state.example.fields ? this.formatDate(this.state.example.fields.created || 'Not Defined') : 'Not Defined'}</div>
                                <div><bold1>Resolution Date:</bold1> {this.state.example.fields ? this.formatDate(this.state.example.fields.resolutiondate || 'Not Complete') : 'Not Complete'}</div>
                                <div><bold1>Time Spent:</bold1> {this.state.example.fields.timetracking.timespent ? (this.state.example.fields.timetracking.timeSpent || 'Not Defined') : 'Not Defined'}</div>   
                                <div><bold1>Story Points:</bold1> {this.state.example.fields ? (this.state.example.fields[config.jira.storypointsfield] || 0) : '0'}</div>
                        </div>
                        <div class="classWithPad"></div>
                        <div class="col-sm-12">
                                 
                        <Timeline data={this.state.b} />

                        </div>
                    </div>
                </Modal>
                <br />
            </div>
        );
    }
}


