import React from 'react';

class TaskStatus extends React.Component{
	constructor(props){
		super(props);
		this.state = {}
	}

	render(){
		
		var abc = this.props.data;

		var done = 0;
		var inTest = 0;
		var inProgress = 0;
		var peerReview = 0;
		var readyForDev = 0;

		for(var i = 0; i<abc.length; i++){
			if(abc[i].status === 'Done'){
				done = done+1;
			} else if (abc[i].status === 'In Test') {
				inTest = inTest+1;
			} else if (abc[i].status === 'In Progress'){
				inProgress = inProgress+1;
			} else if (abc[i].status === 'Peer Review'){
				peerReview = peerReview+1;
			} else if (abc[i].status === 'Ready for Dev'){
				readyForDev = readyForDev+1;
			}
		}

		return(

			<div className="teste" >	
				<p> <done>{done}</done> Done <inprogress>{inProgress}</inprogress> In Progress <peerreview>{peerReview}</peerreview> Peer Review <readyfordev>{readyForDev}</readyfordev> Ready for Dev <intest>{inTest}</intest> in Test</p>
			</div>


			);
	}
}

export default TaskStatus;