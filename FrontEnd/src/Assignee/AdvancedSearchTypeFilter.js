import React from 'react';
import ModalTaskStatus from '../Common/Modal/ModalTaskStatus';
import TableClick from '../Common/TableClick';
import Storyicon from '../img/TaskIcons/Storyicon.svg';
import Bugicon from '../img/TaskIcons/Bugicon.svg';
import Incidenticon from '../img/TaskIcons/Incidenticon.svg';
import Taskicon from '../img/TaskIcons/Taskicon.svg';
import Subtaskicon from '../img/TaskIcons/Subtaskicon.svg';
import Epicicon from '../img/TaskIcons/Epicicon.svg';

export default class AdvancedSearchTypeFilter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			example: [{
				data: 1,
			}],
			filter: [],
		}

	}

	toggleModal = () => {
		this.setState({
		  isOpen: !this.state.isOpen
		});
		}


		filter(type){
			var abc = this.props.data;
			const arraydone = [];
				if(type == ' Story'){
					for(var i = 0; i<abc.length; i++){
						if(abc[i].type.props.children[1] === ' Story'){
							arraydone.push(abc[i]);
						}	
					this.setState({type: 'Story'});			
					}
			} else if(type == ' Bug'){
				for(var i = 0; i<abc.length; i++){
					if(abc[i].type.props.children[1] === ' Bug'){
						arraydone.push(abc[i]);
					}
					this.setState({type: 'Bug'});			
				}
			} else if (type == ' Incident'){
				for(var i = 0; i<abc.length; i++){
					if(abc[i].type.props.children[1] === ' Incident'){
						arraydone.push(abc[i]);
					}
					this.setState({type: 'Incident'});			
				}
			} else if (type == ' Task'){
				for(var i = 0; i<abc.length; i++){
					if(abc[i].type.props.children[1] === ' Task'){
						arraydone.push(abc[i]);
					}		
					this.setState({type: 'Task'});	
				}
			} else if (type == ' Sub-Task'){
				for(var i = 0; i<abc.length; i++){
					if(abc[i].type.props.children[1] === ' Sub-Task'){
						arraydone.push(abc[i]);
					}			
					this.setState({type: 'Sub-Task'});
				}
			} else if (type == ' Epic'){
				for(var i = 0; i<abc.length; i++){
					if(abc[i].type.props.children[1] === ' Epic'){
						arraydone.push(abc[i]);
					}		
					this.setState({type: 'Epic'});	
				}
			}
			this.setState({filter: arraydone});
	}

	render(){
	
		var abc = this.props.data;

		var Story = 0;
		var Bug = 0;
		var Incident = 0;
		var Task = 0;
		var Subtask = 0;
		var Epic = 0;
		
		
		for(var i = 0; i<abc.length; i++){
			if(abc[i].type.props.children[1] === ' Story'){
				Story = Story+1;
			} else if (abc[i].type.props.children[1] === ' Bug') {
				Bug = Bug+1;
			} else if (abc[i].type.props.children[1] === ' Incident'){
				Incident = Incident+1;
			} else if (abc[i].type.props.children[1] === ' Task'){
				Task = Task+1;
			} else if (abc[i].type.props.children[1] === ' Sub-Task'){
				Subtask = Subtask+1;
			} else if (abc[i].type.props.children[1] === ' Epic'){
				Epic = Epic+1;
			} 
		}

		return(
			<div>
			<div className="teste" >	
				<button className="buttonStoryIcon" type="button" onClick={() =>{this.filter(' Story'); this.toggleModal()}}>
					<span className="buttonStoryIcon1">{Story}</span>
					<span className="buttonStoryIcon2">Story <img src={Storyicon}></img></span>
				</button>

				<button className="buttonBugIcon" type="button" onClick={() =>{this.filter(' Bug'); this.toggleModal()}}>
					<span className="buttonBugIcon1">{Bug}</span>
					<span className="buttonBugIcon2">Bug <img src={Bugicon}></img></span>
				</button>

				<button className="buttonIncidentIcon" type="button" onClick={() =>{this.filter(' Incident'); this.toggleModal()}}>
					<span className="buttonIncidentIcon1">{Incident}</span>
					<span className="buttonIncidentIcon2">Incident <img src={Incidenticon}></img></span>
				</button>

				<button className="buttonTaskIcon" type="button" onClick={() =>{this.filter(' Task'); this.toggleModal()}}>
					<span className="buttonTaskIcon1">{Task}</span>
					<span className="buttonTaskIcon2">Task <img src={Taskicon}></img></span>
				</button>

				<button className="buttonSubtaskIcon" type="button" onClick={() =>{this.filter(' Sub-Task'); this.toggleModal()}}>
					<span className="buttonSubtaskIcon1">{Subtask}</span>
					<span className="buttonSubtaskIcon2">Sub-Task <img src={Subtaskicon}></img></span>
				</button>

				<button className="buttonEpicIcon" type="button" onClick={() =>{this.filter(' Epic'); this.toggleModal()}}>
					<span className="buttonEpicIcon1">{Epic}</span>
					<span className="buttonEpicIcon2">Epic <img src={Epicicon}></img></span>
				</button>

			</div>
	
			<ModalTaskStatus show={this.state.isOpen} onClose={this.toggleModal} titulo={this.state.type+' Task(s)'} >
				<TableClick data={this.state.filter} />
			</ModalTaskStatus>

			</div>

			);
	}
}