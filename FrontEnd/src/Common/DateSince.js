import moment from 'moment';
import React from "react";

export default class DateSince extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    var dateObj = this.props.data;
      
    var now = dateObj.date2;
    var then = dateObj.date1;

   var dur = moment.duration( moment(then).diff(moment(now)) );
   
   let days= dur.days();
   let hours = dur.hours();
   let minutes= dur.minutes();
   let seconds = dur.seconds();

    var dateSince = (days+' days, '+hours+' hours, '+minutes+' minutes, '+seconds+' seconds');

    return (
      <div>
          <datesince>{dateSince}</datesince>
      </div>    
    );
  }
}
