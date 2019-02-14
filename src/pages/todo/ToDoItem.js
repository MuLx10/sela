import React, { Component } from 'react';

class ToDoItem extends Component {
	getStyle = () => {
		return {
			padding: '10px',
			backgroundColor:'transparent',
			border:'none',
			cursor:'pointer',
			borderShadow:'none',
			textDecoration: this.props.todo.todo_done?
			'line-through':'none'
		}
	}
	
  render() {
    return (
    	<div >
    		<p>
	    		<button style={this.getStyle()} 
	    			onClick={this.props.markComplete.bind(this,this.props.todo)}>
	    			{this.props.todo.todo_value}
	    		</button>
	    		<button style={btnStyle} onClick={this.props.delToDo.bind(this,this.props.todo)}>x</button>
    		</p>
    	</div>
    );
  }
}
const btnStyle = {
	color: '#919191',
	border:'none',
	padding:'4px 8px',
	borderRadius : '5%',
	cursor:'pointer',
	float:'right'
}

export default ToDoItem;
