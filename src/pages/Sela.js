import React, { Component } from 'react';
import Todo from './todo/ToDo';
import AddToDo from './todo/AddToDo';
import {graphql,compose} from 'react-apollo';
import { QUERY_TODO,MUTATE_UPDATE_TODO,MUTATE_DELETE_TODO,MUTATE_ADD_TODO } from '../utils/graphql';

class Sela extends Component {
  constructor(props){
    super(props);
    this.state={
    	todos:[]
    };
  }
  addToDo = (title) => {
  	this.props.atodo({
      variables:{
        user_id: this.props.user_id,
        todo_done: false,
        todo_index: this.props.qtodo.todoos.length,
        todo_value: title
      },
      refetchQueries:[{query:QUERY_TODO, variables:{user_id:this.props.user_id}}]
    });
  }
  markComplete = (todo)=>{
    this.props.utodo({
      variables:{
        user_id: this.props.user_id,
        todo_done: !todo.todo_done,
        todo_index: todo.todo_index
      },
      refetchQueries:[{query:QUERY_TODO, variables:{user_id:this.props.user_id}}]
    });
  }
  delToDo = (todo)=>{
    this.props.dtodo({
      variables:{
        user_id: this.props.user_id,
        todo_index: todo.todo_index
      },
      refetchQueries:[{query:QUERY_TODO, variables:{user_id:this.props.user_id}}]
    });
  }

  getData = () => {
    if(!this.props.qtodo.loading){
      return this.props.qtodo.todoos;
    }
    else
      return [...this.state.todos,{todo_value:"Loading....."}];
  }


  render() {
    // console.log(this.props);
    return (
      <div className="App">
      	<div style={selaStyle}>
          <header style={headerStyle}>
            <h1> ToDo List</h1>
          </header>
          <Todo  todos={this.getData()} markComplete={this.markComplete} delToDo={this.delToDo}/>
	      	<AddToDo addToDo={this.addToDo} />
      	</div>
      </div>
    );
  }
}

const selaStyle = {
    padding:"1rem 1rem",
    width: "30%",
    float: "right",
    marginRight: "10%",
    marginLeft: "50%",
    backgroundColor: "#f4f4f4",
    position:"absolute"
  
}
const headerStyle={
  backgroundColor:'#333',
  color:'#fff',
  textAlign:'center',
  padding:'10px'
}

export default compose(
  graphql(QUERY_TODO,{name:"qtodo"}),
  graphql(MUTATE_UPDATE_TODO,{name:"utodo"}),
  graphql(MUTATE_DELETE_TODO,{name:"dtodo"}),
  graphql(MUTATE_ADD_TODO,{name:"atodo"}),
)(Sela);
