import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  addTodos,
  deleteTodos,
  getTodos,
  updateTodos,
} from "../api/api.service";

const contentStyle = {
  marginTop: "40px",
  border: "1px solid gray",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: todos, //renamed to todos
  } = useQuery("todos", getTodos, {
    select: (data) => data.sort((a, b) => b.id - a.id),//sort in asc order
  });

  const addTodoMutation = useMutation(addTodos, {
    onSuccess: () => {
      //Invalidates cache and then refetch
      queryClient.invalidateQueries("todos");
    },
  });

  const updateTodoMutation = useMutation(updateTodos, {
    onSuccess: () => {
      //Invalidates cache and then refetch
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(deleteTodos, {
    onSuccess: () => {
      //Invalidates cache and then refetch
      queryClient.invalidateQueries("todos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const addTodoForm = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="enter todo item"
        style={{margin:"10px"}}
      />
      <button type="submit">Add</button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading....</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = todos.map((todo) => (
      <div key={todo.id} style={contentStyle}>
        <button
          style={{ color: "red", fontWeight: "bold" }}
          onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
        >
          delete
        </button>

        <label>{todo.title}</label>
        <input
          type="checkbox"
          checked={todo.completed}
          id={todo.id}
          onChange={() =>
            updateTodoMutation.mutate({ ...todo, completed: !todo.completed })
          }
        />
      </div>
    ));
  }

  return (
    <main style={{ paddingLeft: "90px", width: "400px" }}>
      <h1>Todo List</h1>
      {addTodoForm}
      {content}
    </main>
  );
}

export default TodoList;
