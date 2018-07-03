import React from 'react';
import ModalTaskStatus from '../Common/Modal/ModalTaskStatus';
import SprintStatusTable from './SprintStatusTable';

export default class SprintStatus extends React.Component{
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
				if(type === 'CLOSED'){
					for(i = 0; i<abc.length; i++){
						if(abc[i].state === 'CLOSED'){
							arraydone.push(abc[i]);
						}	
					this.setState({type: 'CLOSED'});			
					}
			} else if(type === 'ACTIVE'){
				for(i = 0; i<abc.length; i++){
					if(abc[i].state === 'ACTIVE'){
						arraydone.push(abc[i]);
					}
					this.setState({type: 'ACTIVE'});			
				}
			} else if (type === 'FUTURE'){
				for(i = 0; i<abc.length; i++){
					if(abc[i].state === 'FUTURE'){
						arraydone.push(abc[i]);
					}
					this.setState({type: 'FUTURE'});			
				}
			}
			this.setState({filter: arraydone});
	}

	render(){

		var abc = this.props.data;

		var closed = 0;
		var active = 0;
        var future = 0;

		for(var i = 0; i<abc.length; i++){
			if(abc[i].state === 'CLOSED'){
				closed = closed+1;
			} else if (abc[i].state === 'ACTIVE') {
				active = active+1;
			} else if (abc[i].state === 'FUTURE'){
				future = future+1;
			}
		}

		return(
		<div>
			<div className="teste" >	
		<button className="button-done" type="button" onClick={() =>{this.filter('CLOSED'); this.toggleModal()}}>
			<span className="button1">{closed}</span>
			<span className="button2">CLOSED</span>
		</button>

		<button className="button-done" type="button" onClick={() =>{this.filter('ACTIVE'); this.toggleModal()}}>
			<span className="button1">{active}</span>
			<span className="button2">ACTIVE </span>
		</button>

		<button className="button-done" type="button" onClick={() =>{this.filter('FUTURE'); this.toggleModal()}}>
			<span className="button1">{future}</span>
			<span className="button2">FUTURE</span>
		</button>

		</div>

		<ModalTaskStatus show={this.state.isOpen} onClose={this.toggleModal} titulo={this.state.type+' Sprints'} >
			<SprintStatusTable data={this.state.filter} />
		</ModalTaskStatus>
		</div>
			
		);
	}
}