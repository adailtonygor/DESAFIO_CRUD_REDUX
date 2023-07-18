const initialState = {
  rascunho: "",
  todos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALTERAR_RASCUNHO":
      return {
        ...state,
        rascunho: action.proximoRascunho,
      };

    case "ADICIONAR_TAREFA": {
      const novaTarefa = {
        id: state.todos.length,
        texto: state.rascunho,
        editando: false,
        valorEdicao: "",
      };
      return {
        ...state,
        rascunho: "",
        todos: [...state.todos, novaTarefa],
      };
    }

    case "EDITAR_NOME_DE_USUARIO": {
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

    case "SALVAR_NOME_DE_USUARIO": {
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

    case "CANCELAR_EDICAO_NOME_DE_USUARIO": {
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

    case "REMOVER_TAREFA": {
      return {
        ...state,
        todos: state.todos.filter((tarefa) => tarefa.id !== action.idTarefa),
      };
    }

    case "ALTERAR_VALOR_EDICAO": {
      return {
        ...state,
        todos: action.tarefas,
      };
    }

    default:
      return state;
  }
};

export default reducer;
