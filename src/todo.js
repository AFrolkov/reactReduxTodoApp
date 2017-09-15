import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import todoAppReducer from './reduxTest1';
import { createStore } from 'redux';

class ToDo extends React.Component {
  componentWillMount() {
    //console.log('willmount');
  }

  uniqKey() {
    this.i = this.i || 0
    return ++this.i;
  }

  componentDidMount() {
    //console.log('did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('did update');
  }

  componentWillUnmount() {
    //console.log('willUnmount');
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('willUpdate')
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
  }

  //shouldComponentUpdate(nextProps, nextState) {
    //return nextState.a.length > 5;
  //}

  add() {
    store.dispatch({
      type: 'add_todo',
      id: this.uniqKey(),
      desc: this.refs.addTask.value
    });

    this.refs.addTask.value = '';
  }

  remove(id) {
    store.dispatch({
      type: 'remove_todo',
      id,
    });
  }

  onKeyDown(p) {
    if (p.key === 'Enter') this.add();
  }

  changeFilter(filter) {
    store.dispatch({
      type: 'set_visibility_filter',
      visibilityFilter: filter
    });
  }

  getVisibleTodos(todos, filter) {
    switch(filter) {
      case 'show_all':
        return todos;
      case 'show_completed':
        return todos.filter(t => t.completed);
      case 'show_uncompleted':
        return todos.filter(t => !t.completed);
    }
  }

  render() {
    const visibleTodos = this.getVisibleTodos(this.props.todos, this.props.visibilityFilter);

    return (
      <div>
      	<div>
      		<input ref="addTask" type="text" onKeyDown={this.onKeyDown.bind(this)} />
          <button onClick={this.add.bind(this)}>add</button>
      	</div>
          {visibleTodos.map(todo => <List key={todo.id} {...todo}>{todo.desc}</List>)}
          <div>
            <form>
              <input type="radio" name="todo" value="completed" checked={this.props.visibilityFilter === 'show_completed'} 
                onChange={this.changeFilter.bind(this, 'show_completed')} />completed
              <input type="radio" name="todo" value="uncompleted" checked={this.props.visibilityFilter === 'show_uncompleted'} 
                onChange={this.changeFilter.bind(this, 'show_uncompleted')} />uncompleted
              <input type="radio" name="todo" value="all" checked={this.props.visibilityFilter === 'show_all'} 
                onChange={this.changeFilter.bind(this, 'show_all')} />all
            </form>
          </div>
      </div>
    );
  }
}

class List extends React.Component {
  onChange() {
    store.dispatch({
      type: 'toggle_todo',
      id: this.props.id
    });
  }

  onRemove() {
    store.dispatch({
      type: 'remove_todo',
      id: this.props.id
    });
  }

  render() {
    return(
      <div style={{background: this.props.completed ? 'rgba(0, 255, 0, 0.3)': ''}}>
        <input checked={this.props.completed} onChange={this.onChange.bind(this)} type="checkbox"/>
        {this.props.children}
        <span onClick={this.onRemove.bind(this)}> X</span>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<ToDo {...store.getState()} />, document.getElementById('root'));
}

const store = createStore(todoAppReducer);
store.subscribe(render);
render();

export default ToDo;