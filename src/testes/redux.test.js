import { expect, test } from "vitest";
import {
  adicionarTarefaAction,
  alterarRascunho,
  cancelarEdicaoNomeDeUsuarioAction,
  removerTarefaAction,
  salvarNomeDeUsuarioAction,
  alterarValorEdicaoAction,
  editarNomeDeUsuarioAction,
} from "../pages/store/actions";
import reducer from "../pages/store/redurce";

describe("teste action", () => {
  test("Passou adicionar tarefa", () => {
    expect(adicionarTarefaAction()).toEqual({ type: "ADICIONAR_TAREFA" });
  });

  test("Editar nome de usuario action", () => {
    const idTarefa = 0;
    expect(editarNomeDeUsuarioAction(idTarefa)).toEqual({
      type: "EDITAR_NOME_DE_USUARIO",
      idTarefa,
    });
  });

  test("salvar nome de usuario", () => {
    const idTarefa = 0;
    const novoNomeDeUsuario = "NovoNome";

    expect(salvarNomeDeUsuarioAction(idTarefa, novoNomeDeUsuario)).toEqual({
      type: "SALVAR_NOME_DE_USUARIO",
      idTarefa,
      novoNomeDeUsuario,
    });
  });
  test("Cancelar edicao nome de usuario", () => {
    const idTarefa = 0;

    expect(cancelarEdicaoNomeDeUsuarioAction(idTarefa)).toEqual({
      type: "CANCELAR_EDICAO_NOME_DE_USUARIO",
      idTarefa,
    });
  });

  test(" Remover tarefa", () => {
    const idTarefa = 0;

    expect(removerTarefaAction(idTarefa)).toEqual({
      type: "REMOVER_TAREFA",
      idTarefa,
    });
  });

  test("Alterar valor edicao", () => {
    const tarefas = ["Tarefa 1", "Tarefa 2", "Tarefa 3"];

    expect(alterarValorEdicaoAction(tarefas)).toEqual({
      type: "ALTERAR_VALOR_EDICAO",
      tarefas,
    });
  });
  test("Alterar rascunho action", () => {
    const proximoRascunho = "Novo Rascunho"; 

    expect(alterarRascunho(proximoRascunho)).toEqual({
      type: "ALTERAR_RASCUNHO",
      proximoRascunho,
    });
});
});

describe("teste reducer", () => {
  const initialState = {
    rascunho: "",
    todos: [],
  };
  test("Alterar rascunho", () => {
    expect(reducer(initialState, alterarRascunho("Passou"))).toEqual({
      todos: [],
      rascunho: "Passou",
    });
  });
  test("Adicionar tarefa", () => {
    const nextState = reducer(initialState, alterarRascunho("Passou"));
    expect(reducer(nextState, adicionarTarefaAction())).toEqual({
      todos: [{ id: 0, texto: "Passou", editando: false, valorEdicao: "" }],
      rascunho: "",
    });
  });
  test("Editar nome de usuario", () => {
    let nextState = reducer(initialState, alterarRascunho("Passou"));
    nextState = reducer(nextState, adicionarTarefaAction());
    nextState = reducer(nextState, {
      type: "EDITAR_NOME_DE_USUARIO",
      idTarefa: 0,
    });

    expect(nextState.todos).toEqual([
      {
        id: 0,
        texto: "Passou",
        editando: true,
        valorEdicao: "Passou",
      },
    ]);
  });
  test("Salvar nome de usuario", () => {
    let nextState = reducer(initialState, alterarRascunho("Passou"));
    nextState = reducer(nextState, adicionarTarefaAction());
    nextState = reducer(
      nextState,
      salvarNomeDeUsuarioAction(0, "NovoNomeDeUsuario")
    );

    expect(nextState.todos).toEqual([
      {
        id: 0,
        texto: "NovoNomeDeUsuario",
        editando: false,
        valorEdicao: "",
      },
    ]);
  });
  test("Cancelar edicao de usuario", () => {
    let nextState = reducer(initialState, alterarRascunho("Passou"));
    nextState = reducer(nextState, adicionarTarefaAction());
    nextState = reducer(nextState, cancelarEdicaoNomeDeUsuarioAction(0));

    expect(nextState.todos).toEqual([
      {
        id: 0,
        texto: "Passou",
        editando: false,
        valorEdicao: "",
      },
    ]);
  });
  test("Remover Tarefa", () => {
    let nextState = reducer(initialState, alterarRascunho("Passou"));
    nextState = reducer(nextState, adicionarTarefaAction());
    nextState = reducer(nextState, removerTarefaAction(0));

    expect(nextState.todos).toEqual([]);
  });
  test("Alterar Valor de Edição", () => {
    const novasTarefas = [
      { id: 0, texto: "Tarefa 1", editando: false, valorEdicao: "" },
      { id: 1, texto: "Tarefa 2", editando: false, valorEdicao: "" },
    ];

    const nextState = reducer(
      initialState,
      alterarValorEdicaoAction(novasTarefas)
    );

    expect(nextState.todos).toEqual(novasTarefas);
  });
  test("Tarefa não cadastrada, verifica o default retorno", () => {
    const nextState = reducer(initialState, { type: "default_retorno" });

    expect(nextState).toEqual(initialState);
  });
});
