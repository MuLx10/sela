import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App'
import './css/style.css';


var user_id = "1";
var todo_index = 1;

ReactDOM.render(<App user_id={user_id} todo_index={todo_index}/>, document.getElementById('root'));
registerServiceWorker();
