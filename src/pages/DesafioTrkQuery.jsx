import { useState } from "react";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api";
import "./button.css";

function DesafioTrkQuery() {
  const { data: todos, isLoading, isError, error } = useGetTodosQuery();
  const [createTodo, { isLoading: Carregando }] = useCreateTodoMutation();
  const updateTodoMutation = useUpdateTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();

  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState("");

  const handleCreateTodo = () => {
    if (newTodoTitle) {
      createTodo({ title: newTodoTitle });
      setNewTodoTitle("");
    }
  };

  const handleSaveTodo = (id, title) => {
    updateTodoMutation.mutate({ id, title });
    setEditingTodoId(null);
  };

  const handleDeleteTodo = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este item?")) {
      deleteTodoMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Ocorreu um erro ao buscar os dados: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="titulo">Desafio trk query</h1>
      <div>
      <div className="input__container">
        <input
          type="text"
          value={newTodoTitle}
          style={{
            marginBottom: "50px",
            height: "27px",
            width: "35vh",
            borderRadius: "5px",
          }}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />
        <button
          className="action-button"
          style={{ margin: "3px" }}
          onClick={handleCreateTodo}
        >
          Adicionar
        </button>
      
      {Carregando.isLoading ||
      updateTodoMutation.isLoading ||
      deleteTodoMutation.isLoading ? (
        <div>Carregando...</div>
      ) : null}
      {createTodo.isError && (
        <div>
          Ocorreu um erro ao criar a nova tarefa: {createTodo.error.message}
        </div>
      )}
      {updateTodoMutation.isError && (
        <div>
          Ocorreu um erro ao atualizar a tarefa:{" "}
          {updateTodoMutation.error.message}
        </div>
      )}
      {deleteTodoMutation.isError && (
        <div>
          Ocorreu um erro ao excluir a tarefa:{" "}
          {deleteTodoMutation.error.message}
        </div>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTodoTitle}
                  onChange={(e) => setEditingTodoTitle(e.target.value)}
                />
                <button
                  className="action-button primary"
                  style={{ margin: "3px" }}
                  onClick={() => handleSaveTodo(todo.id, editingTodoTitle)}
                >
                  Salvar
                </button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button
                  className="action-button primary"
                  style={{ margin: "3px" }}
                  onClick={() => setEditingTodoId(todo.id)}
                >
                  Editar
                </button>
                <button
                  className="action-button secondary"
                  style={{ margin: "5px" }}
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Excluir
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
  );
}

export default DesafioTrkQuery;
