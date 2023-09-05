import reducer, {
  adicionarTarefa,
  alterarRascunho,
  alterarValorEdicao,
  cancelarEdicaoNomeDeUsuario,
  removerTarefa,
  salvarNomeDeUsuario,
} from "../pages/store/tarefasSlice";

describe("tarefasSlice reducer", () => {
  test("deve alterar o rascunho corretamente", () => {
    const initialState = {
      rascunho: "",
      todos: [],
    };

    const nextState = reducer(initialState, alterarRascunho("rascunho"));

    expect(nextState.rascunho).toBe("rascunho");
  });

  test("adicionar tarefa", () => {
    const initialState = {
      rascunho: "",
      todos: [],
    };

    const nextState = reducer(initialState, alterarRascunho("Passou"));

    expect(reducer(nextState, adicionarTarefa())).toEqual({
      rascunho: "",
      todos: [{ editando: false, id: 0, texto: "Passou", valorEdicao: "" }],
    });
  });

  test("Editar nome de usuário", () => {
    const initialState = {
      rascunho: "",
      todos: [],
    };

    let nextState = reducer(initialState, alterarRascunho("Passou"));
    nextState = reducer(nextState, adicionarTarefa());
    nextState = reducer(nextState, {
      type: "editarNomeDeUsuario",
      idTarefa: 0,
    });

    expect(nextState.todos).toEqual([
      {
        id: 0,
        texto: "Passou",
        editando: false,
        valorEdicao: "",
      },
    ]);
  });

  test("Salvar nome de usuário", () => {
    const initialState = {
      rascunho: "",
      todos: [],
    };

    let nextState = reducer(initialState, alterarRascunho("Passou"));
    nextState = reducer(nextState, adicionarTarefa());
    nextState = reducer(nextState, salvarNomeDeUsuario(0, "Passou"));

    expect(nextState.todos).toEqual([
      {
        id: 0,
        texto: "Passou",
        editando: false,
        valorEdicao: "",
      },
    ]);
  });
  test("Cancelar edição nome de usuário", () => {
    let initialState = {
      rascunho: "",
      todos: [],
    };
    initialState = reducer(initialState, alterarRascunho("Passou"));
    initialState = reducer(initialState, adicionarTarefa());

    let nextState = reducer(initialState, {
      type: "editarNomeDeUsuario",
      idTarefa: 0,
    });

    nextState = reducer(nextState, cancelarEdicaoNomeDeUsuario(0));

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
    const initialState = {
      rascunho: "",
      todos: [],
    };

    let nextState = reducer(initialState, alterarRascunho("Passou"));
    nextState = reducer(nextState, adicionarTarefa());

    nextState = reducer(nextState, removerTarefa([]));

    expect(nextState.todos).toEqual([
      {
        id: 0,
        texto: "Passou",
        editando: false,
        valorEdicao: "",
      },
    ]);
  });
  test("Alterar valor edicao", () => {
    const initialState = {
      rascunho: "",
      todos: [],
    };

    let nextState = reducer(initialState, alterarRascunho("Passou"));
    nextState = reducer(nextState, adicionarTarefa());
    nextState = reducer(nextState, alterarValorEdicao(""));

    expect(nextState.todos).toEqual([
      {
        id: 0,
        texto: "Passou",
        editando: false,
        valorEdicao: "",
      },
    ]);
  });
});
