import { v4 as uuidv4 } from "uuid";
import React, { useReducer } from "react";
import TodoList from "./TodoList";
export const TodosContext = React.createContext();

const todosInitialState = {
  todos: [
    {
      id: 1,
      text: "Writing Code",
    },

    {
      id: 2,
      text: "Writing book Chapter",
    },

    {
      id: 3,
      text: "Watching Movie",
    },
  ],
};

function todosReducer(state, action) {
  switch (action.type) {
    case "delete":
      const id = parseInt(action.payload);
      const filteredTodoList = state.todos.filter((todo) => todo.id !== id);
      return { ...state, todos: filteredTodoList };
    case "add":
      const newTodo = { id: uuidv4(), text: action.payload };
      const addedTodo = [...state.todos, newTodo];
      return { ...state, todos: addedTodo };
    case "edit":
      const updatedTodo = { ...action.payload };
      const updatedTodoIndex = state.todos.findIndex(
        (index) => index.id === action.payload.id
      );
      const updateTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1),
      ];
      return { ...state, todos: updateTodos };
    default:
      return todosInitialState;
  }
}

function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);

  return (
    <div className="todo">
      <TodosContext.Provider value={{ state, dispatch }}>
        <TodoList />
      </TodosContext.Provider>
    </div>
  );
}

export default App;

// import React, { useContext } from "react";
// import UserContext from "./index";
// import { Button } from "react-bootstrap";
// const value = useContext(UserContext);
//   function reducer(state, action) {
//     switch (action.type) {
//       case "increment":
//         return { count: state.count + 1 };
//       case "decrement":
//         return { count: state.count - 1 };
//       case "reset":
//         return initialStte;
//       default:
//         return initialStte;
//     }
//   }

//   function handleClick(e) {
//     if (e.target.name === "increment") {
//       return dispatch({ type: "increment" });
//     } else if (e.target.name === "decrement") {
//       return dispatch({ type: "decrement" });
//     } else if (e.target.name === "reset") {
//       return dispatch({ type: "reset" });
//     } else {
//       return dispatch({ type: "" });
//     }
//   }
//   const [state, dispatch] = React.useReducer(reducer, initialStte);
// Username: {value} <br />
//       Count: {state.count}
//       <br />
//       <Button variant="primary" onClick={handleClick} name="increment">
//         Increment
//       </Button>{" "}
//       &nbsp;
//       <Button variant="secondary" name="decrement" onClick={handleClick}>
//         Decrement
//       </Button>
//       &nbsp;
//       <Button variant="success" name="reset" onClick={handleClick}>
//         Reset
//       </Button>
