import React from "react";
import {HorizontalBar} from 'react-chartjs-2';

export default class SprintStoryPoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {

    var issues = this.props.data;
    var a = [];

    for (let i = 0; i < issues.length; i++) {
        if(issues[i].storyPoints === 0){

        }else{
            a.push(issues[i]);
        }
    }

    const points = a.reduce((a, { assignee, storyPoints }) => (
        Object.assign(a, { [assignee]: (a[assignee] || 0) + storyPoints })
      ), {});

      var arr1 = Object.keys(points);
      var arr2 = arr1.map(function (k) {
          return points[k];
      });

      var totalStorypoints = 0;
      for(var b = 0; b < arr2.length; b++){
        totalStorypoints = totalStorypoints+arr2[b];
      }

      const data = {
        labels: arr1,
        datasets: [
          {
            label: 'Storypoints',
            backgroundColor: 'rgba(26,121,173,1)',
            borderColor: 'rgba(26,121,173,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(21,105,150,1)',
            hoverBorderColor: 'rgba(21,105,150,1)',
            data: arr2
          }
        ]
      };

      console.log(data);

      return (
        <div>
          {data.labels.length >= 1 ? (   
            <div>       
            <HorizontalBar ref='chart' data={data} />
            <p></p>
             <div className="center-button">
              <button className="btn storybutton">Total: {totalStorypoints}</button>
             </div>
            </div>
          ) : (
            <div>No StoryPoints in this Sprint</div>
         )}
        </div>
      );
  }
}

