import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import TodoApp from './todoList';



const QUERY_TODO = gql`
  query($user_id:String!){
  todoos (where:{user_id:{_eq:$user_id}}){
    todo_index
    todo_done
    todo_value
  }
}
`;

class QueryToDo extends Component {
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
            var renderSearch = [];
            for(var i=0; i<data.todoos.length; i++){
              renderSearch.push(<h1>{data.todoos[i].todo_value}</h1>);
            }
            console.log(JSON.stringify(data.todoos));
            return (
              <div className="App">
                <h1>user_id:{user_id}</h1>
                <TodoApp todoItems={data.todoos}/>
              </div>
              );
          }
        }
        </Query>
      </div>
    );
  }
}


QueryToDo.propTypes = {user_id: PropTypes.string};
QueryToDo.defaultProps = {user_id: "0"};
export default QueryToDo;
