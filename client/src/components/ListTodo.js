import React, { Component, Fragment, useState, useEffect } from "react";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      //console.log(jsonData);
      setTodos(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteTodo = async id => {
      try {
          const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
              method: 'DELETE'
          });
          //console.log(deleteTodo);
          setTodos(todos.filter(todo => todo.todo_id !== id));
      } catch (error) {
        console.log(error.message);
      }
  }
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <h2>lists found here</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>Edit</td>
              <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};
export default ListTodo;
