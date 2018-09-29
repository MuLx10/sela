import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Todo from './ToDo';

// import UpdateToDo from './updateToDo';

var fetcgdata;

const QUERY_TODO = gql`
  query($user_id:String!){
  todoos (where:{user_id:{_eq:$user_id}}){
    todo_index
    todo_done
    todo_value
  }
}
`;


function updateData(user_id,todo_value) {
    console.log("updation by func"+user_id+todo_value);
    var ft=[],t;
    for(var i=0; i<fetcgdata.length; i++){
      t = fetcgdata[i];
      if (t.user_id === user_id && t.todo_value === todo_value)
        continue;
      else
        ft.push(t);
    fetcgdata = ft;
  }
 } 

class ToDoList extends Component {
    constructor() {
        super();
        this.state = {
            user_id : "0",
            query:null
        };
  }


  render() {
    var user_id = this.props.user_id;
    return (
      <div className="App">
        <Query query={QUERY_TODO} variables={{user_id}}>
          {
            ({ data, error, loading }) => {
            if (error) return '💩 Oops!';;
            if (loading) return 'Patience young grasshopper...';
            fetcgdata = data.todoos;
            
            var renderSearch = [];
            var t;

            // for(var i=0; i<fetcgdata.length; i++){
            //   t = fetcgdata[i];
            //   renderSearch.push(
            //       <UpdateToDo user_id={user_id} 
            //                   todo_index={t.todo_index} 
            //                   todo_value={t.todo_value}
            //                   todo_done={t.todo_done}
            //                   updateData={updateData}
            //                   />
            //     );
            // }

            console.log("user_id  "+JSON.stringify(data.todoos));
            return (
                  <div>
                    <ul className="todoList">
                              {
                                data.todoos.map((todoos, index) => {
                                  return (
                                    <Todo key={index} todo={todoos} />
                                  );
                                })
                              }
                    </ul>
                  </div>
              );
          }
        }
        </Query>
      </div>
    );
  }
}


ToDoList.propTypes = {user_id: PropTypes.string};
ToDoList.defaultProps = {user_id: "0"};
export default ToDoList;
