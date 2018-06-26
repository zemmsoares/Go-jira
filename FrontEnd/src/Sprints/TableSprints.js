import React from 'react';
import '../App.css';
import TableSprintsBuild from './TableSprintsBuild';
import SprintStatus from './SprintStatus';
import sprintactive from '../img/SprintIcons/active.png';
import sprintclosed from '../img/SprintIcons/closed.png';
import sprintfuture from '../img/SprintIcons/future.png';
import config from '../config.json';

export default class TableSprints extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      sprints: [
       'id': 1,
      ]}
  }

  fetchData() {
  const url = [config.backend.url]+'/sprints/';
  const value = this.props.value;
  var string = url+value;
  fetch(string)
  .then(function(response) {
    return response.json();
  })
  .then((myJson) => this.setState(myJson))
  .catch(function() {
    console.log("error");
});
}
  componentDidMount(){
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
        this.fetchData()
    }
  }

  checkState(state){
    if(state == 'CLOSED'){
      return <div><img src={sprintclosed}></img> Sprint</div>
    } else if(state == 'ACTIVE'){
      return <div><img src={sprintactive}></img> Sprint</div>
    } else if(state == 'FUTURE'){
      return <div><img src={sprintfuture}></img> Sprint</div>
    }
  }

render() {

    const filteredResult = this.state.sprints.map(item => (
      {
        type: this.checkState(item.state),
        id: item.id,
        name: item.name,
        state: item.state
      }
    ));

    //item.fields ? this.checkType(item.fields.issuetype.name) : '',

    return filteredResult ? (
      <div>
        <TableSprintsBuild data={filteredResult} header={'Sprints'} />
        <SprintStatus data={filteredResult} />
      </div>
    ) : (
      <div>
         Loading ...
      </div>
    );
  }
}