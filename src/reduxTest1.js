const todos = (state = [], action) => {
  switch(action.type) {
    case 'add_todo':
      return [...state, { id: action.id, completed: false, desc: action.desc }];
      break;
    case 'remove_todo':
      const isHere = state.find(todo => todo.id === action.id);
      if (!isHere) return state;

      const index = state.indexOf(isHere);

      return [...state.slice(0, index), ...state.slice(index + 1)];
      break;
    case 'toggle_todo':
      return state.map(todo => {
        if (todo.id !== action.id) return todo;

        return Object.assign({}, todo, { completed: !todo.completed });
      });
    default:
      return state;
  }
};

const visibilityFilter = (state = 'show_all', action) => {
  switch(action.type) {
    case 'set_visibility_filter':
      return action.visibilityFilter;
      break;
    default:
      return state;
  }
};

const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
};

export default todoApp;