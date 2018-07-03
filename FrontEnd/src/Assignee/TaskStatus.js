import React from 'react';
import ModalTaskStatus from '../Common/Modal/ModalTaskStatus';
import TableClick from '../Common/TableClick';

export default class TaskStatus extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			example: [{
				data: 1,
			}],
			filter: [],
			type: undefined,
		}

	}

	toggleModal = () => {
		this.setState({
		  isOpen: !this.state.isOpen
		});
		}


		filter(type){
			var i = 0;
			var abc = this.props.data;
			const arraydone = [];
				if(type === 'done'){
					for(i = 0; i<abc.length; i++){
						if(abc[i].status === 'Done'){
							arraydone.push(abc[i]);
						}	
					this.setState({type: 'Done'});			
					}
			} else if(type === 'In Test'){
				for(i = 0; i<abc.length; i++){
					if(abc[i].status === 'In Test'){
						arraydone.push(abc[i]);
					}
					this.setState({type: 'In Test'});			
				}
			} else if (type === 'Ready for Testing'){
				for(i = 0; i<abc.length; i++){
					if(abc[i].status === 'Ready for Testing'){
						arraydone.push(abc[i]);
					}
					this.setState({type: 'Ready for Testing'});			
				}
			} else if (type === 'QA Improvements'){
				for(i = 0; i<abc.length; i++){
					if(abc[i].status === 'QA Improvements'){
						arraydone.push(abc[i]);
					}		
					this.setState({type: 'QA Improvements'});	
				}
			} else if (type === 'Under Review'){
				for(i = 0; i<abc.length; i++){
					if(abc[i].status === 'Under Review'){
						arraydone.push(abc[i]);
					}			
					this.setState({type: 'Under Review'});
				}
			} else if (type === 'Peer Review'){
				for(i = 0; i<abc.length; i++){
					if(abc[i].status === 'Peer Review'){
						arraydone.push(abc[i]);
					}		
					this.setState({type: 'Peer Review'});	
				}
			} else if (type === 'Pending'){
				for(i = 0; i<abc.length; i++){
					if(abc[i].status === 'Pending'){
						arraydone.push(abc[i]);
					}	
					this.setState({type: 'Pending'});		
				}
			} else if (type === 'In Progress'){
				for(i = 0; i<abc.length; i++){
					if(abc[i].status === 'In Progress'){
						arraydone.push(abc[i]);
					}			
					this.setState({type: 'In Progress'});
				}
			} else if (type === 'Ready for Dev'){
				for(i = 0; i<abc.length; i++){
					if(abc[i].status === 'Ready for Dev'){
						arraydone.push(abc[i]);
					}			
					this.setState({type: 'Ready for Dev'});
				}
			} else if (type === 'Open'){
				for(i = 0; i<abc.length; i++){
					if(abc[i].status === 'Open'){
						arraydone.push(abc[i]);
					}			
					this.setState({type: 'Open'});
				}
			}
			this.setState({filter: arraydone});
	}

	render(){

		var abc = this.props.data;

		var done = 0;
		var inTest = 0;
		var inProgress = 0;
		var peerReview = 0;
		var readyForDev = 0;
		var pending = 0;
		var qaImprovements = 0;
		var underreview = 0;
		var readyfortesting = 0;
		var open = 0;

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
			} else if (abc[i].status === 'Pending'){
				pending = pending+1;
			} else if (abc[i].status === 'QA Improvements'){
				qaImprovements = qaImprovements+1;
			} else if (abc[i].status === 'Under Review'){
				underreview = underreview+1;
			} else if (abc[i].status === 'Ready for Testing'){
				readyfortesting = readyfortesting+1;
			} else if (abc[i].status === 'Open'){
				open = open+1;
			} 
		}


		return(
			<div>
			<div className="teste" >	
				<button className="button-done" type="button" onClick={() =>{this.filter('Ready for Dev'); this.toggleModal()}}>
					<span className="button1">{readyForDev}</span>
					<span className="button2">Ready for Dev</span>
				</button>

				<button className="button-done" type="button" onClick={() =>{this.filter('In Progress'); this.toggleModal()}}>
					<span className="button1">{inProgress}</span>
					<span className="button2">In Progress </span>
				</button>

				<button className="button-done" type="button" onClick={() =>{this.filter('Pending'); this.toggleModal()}}>
					<span className="button1">{pending}</span>
					<span className="button2">Pending</span>
				</button>

				<button className="button-done" type="button" onClick={() =>{this.filter('Peer Review'); this.toggleModal()}}>
					<span className="button1">{peerReview}</span>
					<span className="button2">Peer Review</span>
				</button>

				<button className="button-done" type="button" onClick={() =>{this.filter('Under Review'); this.toggleModal()}}>
					<span className="button1">{underreview}</span>
					<span className="button2">Under Review</span>
				</button>

				<button className="button-done" type="button" onClick={() =>{this.filter('QA Improvements'); this.toggleModal()}}>
					<span className="button1">{qaImprovements}</span>
					<span className="button2">QA Improvements</span>
				</button>

				<button className="button-done" type="button" onClick={() =>{this.filter('Ready for Testing'); this.toggleModal()}}>
					<span className="button1">{readyfortesting}</span>
					<span className="button2">Ready for Testing</span>
				</button>

				<button className="button-done" type="button" onClick={() =>{this.filter('In Test');this.toggleModal()}}>
					<span className="button1">{inTest}</span>
					<span className="button2">In Test</span>
				</button>

				<button className="button-done" type="button" onClick={() =>{this.filter('Open'); this.toggleModal()}}>
					<span className="button1">{open}</span>
					<span className="button2">Open</span>
				</button>


				<button className="button-done" type="button" onClick={() =>{this.filter('done'); this.toggleModal()}}>
					<span className="button1">{done}</span>
					<span className="button2">Done</span>
				</button>

			</div>

			
			<ModalTaskStatus show={this.state.isOpen} onClose={this.toggleModal} titulo={this.props.assignee+' '+this.state.type} >
				<TableClick data={this.state.filter} />
			</ModalTaskStatus>

			</div>



			);
	}
}