import { useReducer } from "react";
import Button from "@material-ui/core/Button/Button";

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
    <h1>Desafio UseReducer</h1>
      <input
        value={state.rascunho}
        style={{ height: "22px" }}
        onChange={(e) => {
          dispatch({
            type: "alterar_rascunho",
            proximoRascunho: e.target.value,
          });
        }}
      />
      <Button  variant="outlined"
        color="primary"
        size="small"
        style={{ margin: "3px" }} onClick={adicionarTarefa}>Adicionar</Button>
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
                <Button variant="outlined"
                  color="primary"
                  size="small"
                  style={{ margin: "3px" }}
                  onClick={() =>
                    salvarNomeDeUsuario(tarefa.id, tarefa.valorEdicao)
                  }
                >
                  Salvar
                </Button>
                <Button  variant="outlined"
                  color="secondary"
                  size="small"
                   onClick={() => cancelarEdicaoNomeDeUsuario(tarefa.id)}>
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                {tarefa.texto}
                <Button variant="outlined"
                  color="primary"
                  size="small"
                  style={{ margin: "3px" }}
                  onClick={() => editarNomeDeUsuario(tarefa.id)}>
                  Editar
                </Button>
                <Button  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => removerTarefa(tarefa.id)}>
                  Remover
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
