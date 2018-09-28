import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';




const QUERY_TODO = gql`
  query($user_id:String!){
  todoos (where:{user_id:{_eq:$user_id}}){
    todo_index
    todo_done
    todo_value
  }
}
`;

class mustr extends Component {
    constructor() {
        super();
        this.state = {
            user_id : "0",
            query:null
        };
  }
  render() {
    var state = this.props.state;
    var value = this.props.value;
    var done = this.props.done;
    var index = this.props.index;
    
    var spect ;
    if(state == "add"){
      spect =(<p>{state}{index}{value}{done}</p>);
    }
    if(state == "md"){
      spect = (<p>{state}{index}{value}{done}</p>);
    }
    if(state == "rm"){
      spect =(<p>{state}{index}{value}{done}</p>);
    }

    return ( 
      <div className="App">
        {spect}
      </div>
    );
  }
}


mustr.propTypes = {state: PropTypes.string};
mustr.propTypes = {value: PropTypes.string};
mustr.propTypes = {index: PropTypes.Int};
mustr.propTypes = {done: PropTypes.bool};
export default mustr;






// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';
// import TodoApp from './todoList';



// const MUTATE_ADD_TODO = gql`
//   mutation( $user_id:String!,
//           $todo_index:Int!,
//           $todo_done:Boolean!,
//           $todo_value:String!)
//   {
//     insert_todoos(objects:
//             {
//                 user_id :$user_id,
//                 todo_done:$todo_done,
//                 todo_index:$todo_index,
//                 todo_value :$todo_value
//             }) 
//   {
//     affected_rows
//   }
// }

// `;

// {
//   "user_id":"2",
//   "todo_index":1,
//   "todo_done":false,
//   "todo_value":"ff"
// }



// // class MutateToDo extends Component {
// //     constructor() {
// //         super();
// //         this.state = {
// //             user_id : "0",
// //             query:null
// //         };
// //   }
// //   render() {
// //     var user_id = this.props.user_id;
// //     return (
// //       <div className="App">
// //         <Query query={QUERY_TODO} variables={{user_id}}>
// //           {
// //             ({ data, error, loading }) => {
// //             if (error) return '💩 Oops!';;
// //             if (loading) return 'Patience young grasshopper...';
// //             var renderSearch = [];
// //             for(var i=0; i<data.todoos.length; i++){
// //               renderSearch.push(<h1>{data.todoos[i].todo_value}</h1>);
// //             }
// //             console.log(JSON.stringify(data.todoos));
// //             return (
// //               <div className="App">
// //                 <h1>user_id:{user_id}</h1>
// //                 <TodoApp todoItems={data.todoos}/>
// //               </div>
// //               );
// //           }
// //         }
// //         </Query>
// //       </div>
// //     );
// //   }
// // }


// // MutateToDo.propTypes = {user_id: PropTypes.string};
// // MutateToDo.defaultProps = {user_id: "0"};
// // export default MutateToDo;
