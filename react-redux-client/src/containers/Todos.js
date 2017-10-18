// ./react-redux-client/src/containers/Todos.js
import { connect } from 'react-redux';
import * as todoActions from '../actions/todoActions';
import Todos from '../components/Todos';

// map state from store to props
const mapStateToProps = (state,ownProps) => {
  return {
    //you can now say this.props.mappedAppSate
    mappedTodoState: state.todoState,
    mappedAppState: state.appState
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
    fetchTodos: () => dispatch(todoActions.fetchTodos()),
    mappedEditTodo: (todoToEdit,socket) => dispatch(todoActions.editTodo(todoToEdit,socket)),
    mappedshowEditModal: todoToEdit => dispatch(todoActions.showEditModal(todoToEdit)),
    mappedhideEditModal: () => dispatch(todoActions.hideEditModal()),
    mappedDeleteTodo: (todoToDelete,socket) => dispatch(todoActions.deleteTodo(todoToDelete,socket)),
    mappedshowDeleteModal: todoToDelete => dispatch(todoActions.showDeleteModal(todoToDelete)),
    mappedhideDeleteModal: () => dispatch(todoActions.hideDeleteModal()),
    mappedEditSuccessBySocket: data => dispatch(todoActions.editTodoSuccess(data.todo,data.message)),
    mappedDeleteTodoBySocket: data =>dispatch(todoActions.deleteTodoSuccess(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos);
