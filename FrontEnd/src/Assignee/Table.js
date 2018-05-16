import React from 'react';
import ResponseTable from '../Common/Responsetable';
import '../App.css';
import goLogo from '../img/go-logo-icon.png';
import TaskStatus from './TaskStatus';

export default class Table extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      issues: [
       'example': 1
      ]}
  }

  fetchData() {
  const url = 'http://localhost:8000/issues/assigned/';
  const value = this.props.value;
  const string = url+value;
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



render() { 

    const filteredResult = this.state.issues.map(item => (
      {
        name: item.fields ? item.fields.assignee.name : 'Empty',
        id: item.id, 
        key: item.key,
        timespent: item.fields ? this.timeConvert(item.fields.timespent) : 'Empty',
        project: item.fields ? item.fields.project.name : 'Empty',
        status: item.fields ? item.fields.status.name : 'Empty',
        created: item.fields ? item.fields.created : 'Empty',
        resolution: item.fields ? item.fields.resolutiondate : 'Empty'
      }
    ));

    return filteredResult ? (
      <div>
        <ResponseTable data={filteredResult} />
        <TaskStatus data={filteredResult} />
      </div>
    ) : (
      <div>
         Loading ...
      </div>
    );
  }
}
