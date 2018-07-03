import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Modal from '../Common/Modal/Modal';
import TableClick from '../Common/TableClick';
import ModalStorypoints from '../Common/Modal/ModalStorypoints';
import SprintStoryPoints from './SprintStoryPoints';
import Storyicon from '../img/TaskIcons/Storyicon.svg';
import Bugicon from '../img/TaskIcons/Bugicon.svg';
import Incidenticon from '../img/TaskIcons/Incidenticon.svg';
import Taskicon from '../img/TaskIcons/Taskicon.svg';
import Subtaskicon from '../img/TaskIcons/Subtaskicon.svg';
import Epicicon from '../img/TaskIcons/Epicicon.svg';
import config from '../config.json';



export default class TableSprintsBuild extends React.Component {

    constructor(props) { // Use Props
        super(props); // Use Props
        this.state={
            rowInfo: {
                row:{
                    id: 1,
                }
            },
            selected: '1',
            data: [],
            value: 1,
            completedIssues: [],
            issuesNotCompletedInCurrentSprint: [],
            puntedIssues: [],
            issuesCompletedInAnotherSprint: [],
            example: [],
        }
        this.columnsBuilder = this.columnsBuilder.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

    }
    columnsBuilder () { //Remove data
        if(this.props.data == 0){
           return
        }
        const props = Object.keys(this.props.data[0]); //Use Props
        const columns = props.map( (item, index) => ({
            Header : item,
            accessor : item,
            //Cell : propss => propss.original[item].length === 0 ? '[]' : propss.original[item].toString(),
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
            const url = [config.jira.server]+'/sprints/';
            const value = 1;
            var sprintid = this.state.selected;
            var string2 = url+value+'/'+sprintid;
            fetch(string2)
            .then(function(response) {
              return response.json();
            })
            .then((myJson) => this.setState({completedIssues: myJson.contents.completedIssues, issuesNotCompletedInCurrentSprint: myJson.contents.issuesNotCompletedInCurrentSprint, puntedIssues: myJson.contents.puntedIssues, issuesCompletedInAnotherSprint: myJson.contents.issuesCompletedInAnotherSprint },() => this.toggleModal())
            );
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

          
          toggleModal2 = () => {
            this.setState({
              isOpen2: !this.state.isOpen2
            });
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

          var arr1 = filteredCompletedIssues.concat(filteredPuntedIssues);
          var arr2 = arr1.concat(filteredIssuesCompletedInAnotherSprint);
          var arr3 = arr2.concat(filteredIssuesNotCompletedInCurrentSprint);
         

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
                                  selected: rowInfo ? rowInfo.row.id : '0',
                              }, () => this.handleSubmit())
                            )
                        };
                      }}
                /> 
                <Modal  show={this.state.isOpen} onClose={this.toggleModal} titulo={'Sprint '+this.state.selected} story={<button className="btn storybutton" onClick={this.toggleModal2}>StoryPoints</button>}>
                    <TableClick data={filteredCompletedIssues} header={'Completed Issues'+' ('+filteredCompletedIssues.length+')'} />
                    <TableClick data={filteredIssuesNotCompletedInCurrentSprint} header={'Issues Not Completed in Current Sprint'+' ('+filteredIssuesNotCompletedInCurrentSprint.length+')'} />
                    <TableClick data={filteredPuntedIssues} header={'Punted Issues'+' ('+filteredPuntedIssues.length+')'} />
                    <TableClick data={filteredIssuesCompletedInAnotherSprint} header={'IssuesCompleted in Another Sprint'+' ('+filteredIssuesCompletedInAnotherSprint.length+')'} />
                </Modal >
                <br />

                <ModalStorypoints show={this.state.isOpen2} onClose={this.toggleModal2} titulo={'Storypoints Sprint '+this.state.selected} >
                      <SprintStoryPoints data={arr3} />
                </ModalStorypoints>
            </div>
        );
    }
}


