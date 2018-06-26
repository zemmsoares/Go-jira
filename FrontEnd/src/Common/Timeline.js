import React from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import Mdarrowforward from 'react-icons/lib/md/arrow-forward';
import DateSince from './DateSince';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curIdx: 0,
      //curIdx: (this.props.data.length-1),      
      prevIdx: -1
    };
  }

  render() {    

    const {curIdx, prevIdx} = this.state;
    const curStatus = this.props.data[curIdx] ? this.props.data[curIdx].statusInicio : 0;
    const prevStatus = this.props.data[curIdx] ? this.props.data[curIdx].statusFim : 0;
    const hora = this.props.data[curIdx] ? this.props.data[curIdx].hora : 0;

      var data1 = this.props.data[curIdx] ? (this.props.data[curIdx].data || '0000/00/00') : '0000/00/00';
      var hora1 = this.props.data[curIdx] ? (this.props.data[curIdx].hora || '00-00-00' ) : '00-00-00';
      var res1 = data1.concat(' '+hora1);
      if(this.props.data[curIdx-1] == undefined){
        var data2 = this.props.data[curIdx] ? (this.props.data[curIdx].data || '0000/00/00') : '0000/00/00';
        var hora2 = this.props.data[curIdx] ? (this.props.data[curIdx].hora || '00-00-00' ) : '00-00-00';
        var res2 = data2.concat(' '+hora2);
      } else {
        var data2 = this.props.data[curIdx-1] ? this.props.data[curIdx-1].data : this.props.data[curIdx].data;
        var hora2 = this.props.data[curIdx-1] ? this.props.data[curIdx-1].hora : this.props.data[curIdx].hora;
        var res2 = data2.concat(' '+hora2);
      }
  
      const DateSinceObj = {
        date1: res1,
        date2: res2,
      }

    return (
      <div>
        {/* Bounding box for the Timeline */}
        <div
          style={{
            width: "60%",
            height: "100px",
            margin: "0 auto",
            marginTop: "20px",
            fontSize: "12px"
          }}
        >
          <HorizontalTimeline
            styles={{
              background: "#f8f8f8",
              foreground: "#1A79AD",
              outline: "#dfdfdf"
            }}
            index={this.state.curIdx}
            indexClick={index => {
              const curIdx = this.state.curIdx;
              this.setState({ curIdx: index, prevIdx: curIdx });
            }}            
            values={this.props.data.map(x => x.data)}
          />
        </div>
        <div className="text-center">
          <spanhora>[{hora}]</spanhora> : {curStatus} <Mdarrowforward /> {prevStatus}
          <DateSince data={DateSinceObj} />
        </div>
      </div>
    );
  }
}
