import React from 'react';
import TableClick from '../Common/TableClick';
import '../App.css';
import TaskStatus from './TaskStatus';
import Storyicon from '../img/TaskIcons/Storyicon.svg';
import Bugicon from '../img/TaskIcons/Bugicon.svg';
import Incidenticon from '../img/TaskIcons/Incidenticon.svg';
import Taskicon from '../img/TaskIcons/Taskicon.svg';
import Subtaskicon from '../img/TaskIcons/Subtaskicon.svg';
import Epicicon from '../img/TaskIcons/Epicicon.svg';
import AdvancedSearchTypeFilter from './AdvancedSearchTypeFilter';
import config from '../config.json';

export default class TableAssignee extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      issues: []
    }
  }

  fetchData() {
  const url = [config.jira.server]+'/issues/assigned/';
  const value = this.props.value;
  const string = url+value+'&maxResults=5000';
  fetch(string)
  .then(function(response) {
    return response.json();
  })
  .then((myJson) => this.setState(myJson));
  }

  componentDidMount(){
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
        this.fetchData()
    }
  }

  timeConvert(n) {
    var num = n;
    var hours = (num/3600)
    if(hours === 0){
      return 'Sem Informação';
    }else{
      return Math.round(hours*10)/10 +'h';
    }
  }


  formatDate(date){
    if(date == null){
      return  'Not Complete' ;
    } else {
      const slicedDate = date.slice(0,10);
      return slicedDate
    }
  }

  checkType(type){
    if(type == 'Story'){
      return <div><img src={Storyicon}></img> Story</div>
    }else if (type == 'Bug') {
      return <div><img src={Bugicon}></img> Bug</div>
    }else if (type == 'Incident'){
      return <div><img src={Incidenticon}></img> Incident</div>
    }else if (type == 'Task'){
      return <div><img src={Taskicon}></img> Task</div>
    }else if (type == 'Sub-task'){
      return <div><img src={Subtaskicon}></img> Sub-Task</div>
    }else if (type == 'Epic'){
      return <div><img src={Epicicon}></img> Epic</div>
    }
    return <div>LOL</div>
  }

render() { 

    const assignedto = this.props.value;

    const filteredResult = this.state.issues.map(item => (
      {
        type: item.fields ? this.checkType(item.fields.issuetype.name) : '',
        id: item.id, 
        key: item.key,
        timespent: item.fields ? this.timeConvert(item.fields.timespent) : '',
        project: item.fields ? item.fields.project.name : '',
        storyPoints: item.fields ? item.fields[config.jira.storypointsfield] : '',
        status: item.fields ? item.fields.status.name : '',
        created: this.formatDate(item.fields ? item.fields.created : ''),
        resolution: this.formatDate(item.fields ? item.fields.resolutiondate : 'Not Complete'),
      }
    ));


    return filteredResult ? (
      <div>
        <TableClick data={filteredResult} header={this.props.value}/>
        <TaskStatus data={filteredResult} assignee={assignedto}/>
        <AdvancedSearchTypeFilter data={filteredResult} />
      </div>
    ) : (
      <div>
         Loading ...
      </div>
    );
  }
}
