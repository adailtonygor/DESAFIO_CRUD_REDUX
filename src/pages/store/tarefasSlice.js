import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rascunho: "",
  todos: [],
};

const tarefasSlice = createSlice({
  name: "tarefas",
  initialState,
  reducers: {
    alterarRascunho: (state, action) => {
      state.rascunho = action.payload;
    },
    adicionarTarefa: (state) => {
      const novaTarefa = {
        id: state.todos.length,
        texto: state.rascunho,
        editando: false,
        valorEdicao: "",
      };
      state.rascunho = "";
      state.todos.push(novaTarefa);
    },
    editarNomeDeUsuario: (state, action) => {
      const { idTarefa } = action.payload;
      const tarefa = state.todos.find((t) => t.id === idTarefa);
      if (tarefa) {
        tarefa.editando = true;
        tarefa.valorEdicao = tarefa.texto;
      }
    },
    salvarNomeDeUsuario: (state, action) => {
      const { idTarefa, novoNomeDeUsuario } = action.payload;
      const tarefa = state.todos.find((t) => t.id === idTarefa);
      if (tarefa) {
        tarefa.texto = novoNomeDeUsuario;
        tarefa.editando = false;
        tarefa.valorEdicao = "";
      }
    },
    cancelarEdicaoNomeDeUsuario: (state, action) => {
      const { idTarefa } = action.payload;
      const tarefa = state.todos.find((t) => t.id === idTarefa);
      if (tarefa) {
        tarefa.editando = false;
        tarefa.valorEdicao = "";
      }
    },
    removerTarefa: (state, action) => {
      const { idTarefa } = action.payload;
      state.todos = state.todos.filter((t) => t.id !== idTarefa);
    },
    alterarValorEdicao: (state, action) => {
      const { idTarefa, novoValorEdicao } = action.payload;
      const tarefa = state.todos.find((t) => t.id === idTarefa);
      if (tarefa) {
        tarefa.valorEdicao = novoValorEdicao;
      }
    },
  },
});

export const {
  alterarRascunho,
  adicionarTarefa,
  editarNomeDeUsuario,
  salvarNomeDeUsuario,
  cancelarEdicaoNomeDeUsuario,
  removerTarefa,
  alterarValorEdicao,
} = tarefasSlice.actions;

export default tarefasSlice.reducer;