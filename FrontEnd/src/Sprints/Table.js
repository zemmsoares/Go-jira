import React from 'react';
import ResponseTable from '../Common/Responsetable';
import '../App.css';
import goLogo from '../img/go-logo-icon.png';

export default class Table extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      sprints: [
       'id': 1
      ]}
  }


  fetchData() {
  const url = 'http://localhost:8000/sprints/';
  const value = this.props.value;
  var string = url+value;
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


render() {

    const filteredResult = this.state.sprints.map(item => (
      {
        id: item.id,
        name: item.name,
        state: item.state
      }
    ));


    return filteredResult ? (
      <div>
        <ResponseTable data={filteredResult} />
      </div>
    ) : (
      <div>
         Loading ...
      </div>
    );
  }
}