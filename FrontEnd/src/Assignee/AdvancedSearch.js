import React from 'react';
import Select from 'react-select';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-select/dist/react-select.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Storyicon from '../img/TaskIcons/Storyicon.svg';
import Bugicon from '../img/TaskIcons/Bugicon.svg';
import Incidenticon from '../img/TaskIcons/Incidenticon.svg';
import Taskicon from '../img/TaskIcons/Taskicon.svg';
import Subtaskicon from '../img/TaskIcons/Subtaskicon.svg';
import Epicicon from '../img/TaskIcons/Epicicon.svg';
import TableClick from '../Common/TableClick';
import TaskStatus from './TaskStatus';
import AdvancedSearchTypeFilter from './AdvancedSearchTypeFilter';
import config from '../config.json';

export default class AdvancedSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedOption: '',
			removeSelected: true,
			disabled: false,
			stayOpen: false,
			value: [],
      rtl: false,
      boards: [],
      data: [],
      data2: [],
      cleanArray: [],
      startDate: undefined,
      endDate: undefined,
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

	handleSelectChange (value) {
    this.setState({value: value}, () => this.SplitSelectedOptions());
  }

  fetchData(){
    let initialBoards = [];
    fetch([config.jira.server]+'/users/'+[config.jira.projectkey]+'&maxResults=5000')
          .then(response => {
              return response.json();
          }).then(data => {
          initialBoards = data.map((board) => {
              return board
          });
          this.setState({
              boards: initialBoards
           });
          });
      }

      SplitSelectedOptions(){
        const arrayMessy = this.state.value +'';
        var arraySplit = [];
        arraySplit = arrayMessy.split(',');
        this.setState({cleanArray: arraySplit, data: []},() => this.fetchForSelectedOptions());
      }

      fetchForSelectedOptions(){
        var filteredArray = this.state.cleanArray;
        if (filteredArray === ""){
          return;
        }else{
        for (var i = 0; i < filteredArray.length; i++) {
          const url = [config.jira.server]+'/issues/assigned/';
          const value = filteredArray[i];
          const string = url+value+'&maxResults=5000';
          fetch(string)
          .then(function(response) {
            return response.json();
          })
          .then((myJson) => this.setState({ data: this.state.data.concat(myJson.issues)}));
          }
        }
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

  render() {

    const options = this.state.boards.map(item => (
      {
         value: item.key,
         label: item.name, 
       }
     ));

   const sDate = moment(this.state.startDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
   const eDate = moment(this.state.endDate, 'YYYY-MM-DD').format('YYYY-MM-DD');

   const filteredResult = this.state.data.map(item => {
     if (this.state.startDate && this.state.endDate) {
       if (this.formatDate(item.fields.created) >= sDate && this.formatDate(item.fields.resolutiondate) < eDate) {
         return ({
           name: item.fields.assignee ? item.fields.assignee.name : '',
           type: item.fields.issuetype ? (this.checkType(item.fields.issuetype.name) || 'Not defined') : 'Not defined',
           id: item.id,
           created: item.fields ? this.formatDate(item.fields.created) : '',
           resolutiondate: item.fields ? (this.formatDate(item.fields.resolutiondate) || 'Not Complete') : 'Not Complete',
           status: item.fields ? item.fields.status.name : ''
         });
       } else {
         return ({

         });
       }
     } else {
       return ({
         name: item.fields.assignee ? (item.fields.assignee.name || '') : '',
         type: item.fields.issuetype ? (this.checkType(item.fields.issuetype.name) || 'Not defined') : 'Not defined',
         id: (item.id || ''),
         created: item.fields ? (this.formatDate(item.fields.created) || '') : '',
         resolutiondate: item.fields ? (this.formatDate(item.fields.resolutiondate) || 'Not Complete') : 'Not Complete',
         status: item.fields ? (item.fields.status.name || '') : '',
       });
     }
   });


  var filteredResult2 = filteredResult.filter(value => Object.keys(value).length !== 0);

    const { disabled, stayOpen, value} = this.state;


    return (
      <div>
  				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select Assignee(s)"
          removeSelected={this.state.removeSelected}
					rtl={this.state.rtl}
					simpleValue
					value={value}
				/>
      <p></p>

      <div className="input-group" >
      <DateRangePicker
      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
      isOutsideRange={() => false}
      displayFormat="YYYY-MM-DD"
      small={true}
      showDefaultInputIcon={true}
      /> 
      <div className="leftmargin40"></div>
      <AdvancedSearchTypeFilter data={filteredResult2} />
      </div>
      <p></p>
          
      <TableClick data={filteredResult2} />
      <TaskStatus data={filteredResult2}  />
      
      </div>     
    );
  }
}


