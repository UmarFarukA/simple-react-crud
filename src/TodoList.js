import React, { useContext, useState } from "react";
import { TodosContext } from "./App";
import { Table, Button, Form } from "react-bootstrap";

function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const [todoText, setTodoText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTItle = editMode ? "Edit" : "Add";

  function handleDelete(e) {
    const todo_id = e.target.value;
    return dispatch({ type: "delete", payload: todo_id });
  }

  function handleEdit(e) {
    const todo = e.target.value;

    setTodoText(todo.text);
    setEditMode(true);
    setEditTodo(todo);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editMode) {
      dispatch({
        type: "edit",
        payload: { ...editTodo, text: todoText },
      });
      setEditMode(false);
      setEditTodo(null);
    } else {
      dispatch({ type: "add", payload: todoText });
    }

    setTodoText("");
  }

  function handleChange(e) {
    return setTodoText(e.target.value);
  }
  return (
    <div className="todo__container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter Todo"
            name="todo_name"
            onChange={handleChange}
            value={todoText}
          />
          <br />
          <Button variant="primary" type="submit">
            {buttonTItle}
          </Button>
        </Form.Group>
      </Form>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>S/N</td>
            <td>Ativity</td>
            <td colSpan={2}>Action</td>
          </tr>
        </thead>
        <tbody>
          {state.todos.map((todo) => (
            <tr key={todo.id}>
              <td> </td>
              <td>
                <span>{todo.text}</span>
              </td>
              <td>
                <Button variant="secondary" value={todo} onClick={handleEdit}>
                  Edit
                </Button>
              </td>
              <td>
                <Button variant="danger" value={todo.id} onClick={handleDelete}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TodoList;
