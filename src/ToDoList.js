import React, { Component } from "react";
import PropTypes from "prop-types";

import { Query } from "react-apollo";
import TodoElement from "./utils/TodoElement";
import { QUERY_TODO } from "./utils/graphql";
// import UpdateToDo from './updateToDo';

class ToDoList extends Component {
  constructor() {
    super();
    this.state = {
      query: null
    };
  }

  render() {
    var user_id = this.props.user_id;
    return (
      <div className="App">
        <Query query={QUERY_TODO} variables={{ user_id }}>
          {({ data, error, loading }) => {
            if (error) return "💩 Oops!";
            if (loading) return "Patience young grasshopper...";

            console.log("user_id  " + JSON.stringify(data.todoos));
            return (
              <div className="list">
                  {data.todoos.map((todoos, index) => {
                    return (
                      <TodoElement
                        key={index}
                        todo={todoos}
                        user_id={user_id}
                      />
                    );
                  })}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

ToDoList.propTypes = { user_id: PropTypes.string };
ToDoList.defaultProps = { user_id: "0" };
export default ToDoList;
