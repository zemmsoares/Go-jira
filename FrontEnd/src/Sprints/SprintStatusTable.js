import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Timeline from '../Common/Timeline';
import Modal from '../Common/Modal/Modal';
import TableClick from '../Common/TableClick';
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



export default class SprintStatusTable extends React.Component {

    constructor(props) { // Use Props
        super(props); // Use Props
        this.state={
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
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.toggleModal2 = this.toggleModal2.bind(this);

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

    handleSubmit2(){
        const url = [config.backend.url]+'/sprints/';
        const value = 1;
        var sprintid = this.state.selected;
        var string2 = url+value+'/'+sprintid;
        fetch(string2)
        .then(function(response) {
          return response.json();
        })
        .then((myJson) => this.setState({completedIssues: myJson.contents.completedIssues, issuesNotCompletedInCurrentSprint: myJson.contents.issuesNotCompletedInCurrentSprint, puntedIssues: myJson.contents.puntedIssues, issuesCompletedInAnotherSprint: myJson.contents.issuesCompletedInAnotherSprint },() => this.toggleModal2())
        ).catch(function(error) {
            console.log("error");
        });
    }

    toggleModal2 = () => {
        this.setState({
          isOpen2: !this.state.isOpen2
        });
        }

        fetchIssues(){
            const url = [config.backend.url]+'/issue/';
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
            return <div>undefined</div>
          }

    render() {

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
                            (
                            console.log("Cell - onMouseEnter", {
                                state,
                                rowInfo,
                                column,
                                instance,
                                event: e
                              }), this.setState({
                                  selected: rowInfo ? rowInfo.row.id : '',
                              }, () => this.handleSubmit2())
                            )
                        };
                      }}
                />     
    
                <Modal  show={this.state.isOpen2} onClose={this.toggleModal2} titulo={'Sprint '+this.state.selected}>
                    <TableClick data={filteredCompletedIssues} header={'Completed Issues'+' ('+filteredCompletedIssues.length+')'} />
                    <TableClick data={filteredIssuesNotCompletedInCurrentSprint} header={'Issues Not Completed in Current Sprint'+' ('+filteredIssuesNotCompletedInCurrentSprint.length+')'} />
                    <TableClick data={filteredPuntedIssues} header={'Punted Issues'+' ('+filteredPuntedIssues.length+')'} />
                    <TableClick data={filteredIssuesCompletedInAnotherSprint} header={'IssuesCompleted in Another Sprint'+' ('+filteredIssuesCompletedInAnotherSprint.length+')'} />
                </Modal >
                <br />
            </div>
        );
    }
}



