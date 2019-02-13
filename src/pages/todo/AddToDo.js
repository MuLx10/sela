import React, { Component } from 'react';
class AddToDo extends Component {
	state = {
		value:''
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addToDo(this.state.value);
		this.setState({value:''});
	}
	handleChange = (e) => {
		this.setState({value:e.target.value});
	}
  render() {
    return (
    	<form style={{display:"flex"}} onSubmit={this.handleSubmit}>
    		<input type="textbox" 
    			name="title" 
    			placeholder="Add ToDo...."
    			style={inpStyle}
    			onChange = {this.handleChange}
    			value={this.state.value}
    		/>
    		<input type="submit" className="sbtn" value="Add" 
    		style={{flex:"1"}} />
    	</form>
    	);
  }
}

const inpStyle = {
	flex:"10", 
	padding:"5px",
	borderRadius : '1%',
};
export default AddToDo;
