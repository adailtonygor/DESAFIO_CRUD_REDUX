import { useReducer } from "react";
import "./button.css";

function DesafioUm(nomeDeUsuario) {
  if (!nomeDeUsuario || typeof nomeDeUsuario !== "string") {
    nomeDeUsuario = "Usuário";
  }

  const todosIniciais = [];
  for (let i = 0; i < 5; i++) {
    todosIniciais.push({
      id: i,
      texto: nomeDeUsuario + " - Olá pessoas " + (i + 1),
      editando: false,
      valorEdicao: "",
    });
  }
  return {
    rascunho: "",
    todos: todosIniciais,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "alterar_rascunho": {
      return {
        ...state,
        rascunho: action.proximoRascunho,
      };
    }
    case "adicionar_tarefa": {
      const novaTarefa = {
        id: state.todos.length,
        texto: state.rascunho,
        editando: false,
        valorEdicao: "",
      };
      return {
        rascunho: "",
        todos: [...state.todos, novaTarefa],
      };
    }
    case "editar_nomeDeUsuario": {
      const todosAtualizados = state.todos.map((tarefa) => {
        if (tarefa.id === action.idTarefa) {
          return {
            ...tarefa,
            editando: true,
            valorEdicao: tarefa.texto,
          };
        }
        return tarefa;
      });
      return {
        ...state,
        todos: todosAtualizados,
      };
    }
    case "salvar_nomeDeUsuario": {
      const todosAtualizados = state.todos.map((tarefa) => {
        if (tarefa.id === action.idTarefa) {
          return {
            ...tarefa,
            texto: action.novoNomeDeUsuario,
            editando: false,
            valorEdicao: "",
          };
        }
        return tarefa;
      });
      return {
        ...state,
        todos: todosAtualizados,
      };
    }
    case "cancelar_edicao_nomeDeUsuario": {
      const todosAtualizados = state.todos.map((tarefa) => {
        if (tarefa.id === action.idTarefa) {
          return {
            ...tarefa,
            editando: false,
            valorEdicao: "",
          };
        }
        return tarefa;
      });
      return {
        ...state,
        todos: todosAtualizados,
      };
    }
    case "remover_tarefa": {
      return {
        ...state,
        todos: state.todos.filter((tarefa) => tarefa.id !== action.idTarefa),
      };
    }
    case "alterar_valor_edicao": {
      return {
        ...state,
        todos: action.tarefas,
      };
    }
    default:
      throw new Error("Ação desconhecida: " + action.type);
  }
}

export default function DesafioUseReducer() {
  const [state, dispatch] = useReducer(
    reducer,
    {
      rascunho: "",
      todos: [],
    },
    DesafioUm
  );

  const adicionarTarefa = () => {
    dispatch({ type: "adicionar_tarefa" });
  };

  const editarNomeDeUsuario = (idTarefa) => {
    dispatch({ type: "editar_nomeDeUsuario", idTarefa });
  };

  const salvarNomeDeUsuario = (idTarefa, novoNomeDeUsuario) => {
    dispatch({ type: "salvar_nomeDeUsuario", idTarefa, novoNomeDeUsuario });
  };

  const cancelarEdicaoNomeDeUsuario = (idTarefa) => {
    dispatch({ type: "cancelar_edicao_nomeDeUsuario", idTarefa });
  };

  const removerTarefa = (idTarefa) => {
    dispatch({ type: "remover_tarefa", idTarefa });
  };

  return (
    <>
      <h1 className="titulo">Desafio UseReducer</h1>

      <div className="input__container">
        <input
          value={state.rascunho}
          placeholder="Digite uma nova tarefa"
          style={{
            marginBottom: "50px",
            height: "27px",
            width: "35vh",
            borderRadius: "5px",
          }}
          onChange={(e) => {
            dispatch({
              type: "alterar_rascunho",
              proximoRascunho: e.target.value,
            });
          }}
        />
        <button className="action-button" onClick={adicionarTarefa}>
          Adicionar
        </button>
        <ul>
          {state.todos.map((tarefa) => (
            <li key={tarefa.id}>
              {tarefa.editando ? (
                <>
                  <input
                    value={tarefa.valorEdicao}
                    style={{ height: "22px" }}
                    onChange={(e) => {
                      const novoValorEdicao = e.target.value;
                      const tarefasAtualizadas = state.todos.map((t) => {
                        if (t.id === tarefa.id) {
                          return { ...t, valorEdicao: novoValorEdicao };
                        }
                        return t;
                      });
                      dispatch({
                        type: "alterar_valor_edicao",
                        tarefas: tarefasAtualizadas,
                      });
                    }}
                  />
                  <button
                    className="action-button primary"
                    style={{ margin: "3px", marginLeft: "10px" }}
                    onClick={() =>
                      salvarNomeDeUsuario(tarefa.id, tarefa.valorEdicao)
                    }
                  >
                    Salvar
                  </button>
                  <button
                    className="action-button secondary"
                    onClick={() => cancelarEdicaoNomeDeUsuario(tarefa.id)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {tarefa.texto}
                  <button
                    className="action-button primary"
                    style={{ margin: "3px", marginLeft:"25px" }}
                    onClick={() => editarNomeDeUsuario(tarefa.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="action-button secondary"
                    onClick={() => removerTarefa(tarefa.id)}
                  >
                    Remover
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
