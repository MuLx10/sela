import React, { Component } from 'react';

class ToDoItem extends Component {
	getStyle = () => {
		return {
			padding: '10px',
			borderBottom: '1px ccc dotted',
			textDecoration: this.props.todo.todo_done?
			'line-through':'none'
		}
	}
	
  render() {
    return (
    	<div style={this.getStyle()}>
    		<p>
	    		<a style={{cursor:'pointer'}} 
	    			onClick={this.props.markComplete.bind(this,this.props.todo)}>
	    			{this.props.todo.todo_value}
	    		</a>
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
