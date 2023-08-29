import { act, renderHook } from "@testing-library/react";
import { useTodos, reducer } from "../pages/DesafioUseReducer";
import { expect } from "vitest";

describe("teste useReducer", () => {
  test("adicionar Tarefas", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.alterarRascunho("passou");
      result.current.adicionarTarefa();
    });
    expect(result.current.state.todos[0].texto).toBe("passou");
  });
  test("editar Nome de Usuario", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.alterarRascunho("passou");
      result.current.adicionarTarefa();
      result.current.editarNomeDeUsuario(0);
    });
    expect(result.current.state.todos[0].valorEdicao).toBe("passou");
  });
  test("salvar nome de usuario", () => {
    const { result } = renderHook(() => useTodos());
    const novoNomeDeUsuario = "Novo Nome de Usuário";
    act(() => {
      result.current.alterarRascunho("passou");
      result.current.adicionarTarefa();
      result.current.editarNomeDeUsuario(0);
      result.current.salvarNomeDeUsuario(0, novoNomeDeUsuario);
    });
    expect(result.current.state.todos[0].texto).toBe(novoNomeDeUsuario);
  });
  test('cancelar edição de nome de usuário', () => {
    const { result } = renderHook(() => useTodos());
    const novoNomeDeUsuario = "Novo Nome de Usuário";
    
    
    act(() => {
      result.current.alterarRascunho("passou");
      result.current.adicionarTarefa();
      result.current.editarNomeDeUsuario(0);
      result.current.salvarNomeDeUsuario(0, novoNomeDeUsuario);
      
      result.current.cancelarEdicaoNomeDeUsuario(0);
    });
  
    expect(result.current.state.todos[0].editando).toBe(false);
    expect(result.current.state.todos[0].valorEdicao).toBe("");
  });

  test("remover Tarefa", () => {
    const { result } = renderHook(() => useTodos());
    

    act(() => {
      result.current.alterarRascunho("Tarefa a ser removida");
      result.current.adicionarTarefa();
      result.current.removerTarefa(0); 
      
    });

    expect(result.current.state.todos.length).toBe(0);
  });
  test("alterar Valor de Edição", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.alterarRascunho("Tarefa Inicial");
      result.current.adicionarTarefa();
    });
    act(() => {
      result.current.novoValorEdicao("Novo Valor de Edição", 0); 
    });

    expect(result.current.state.todos[0].valorEdicao).toBe("Novo Valor de Edição");
  });
  test("Testando ação de erro", () => {
   
    const initialState = {};
    const AcaoDesconhecida = { type: "acao_desconhecida" };
  
    expect(() => {
      reducer(initialState, AcaoDesconhecida);
    }).toThrowError("Ação desconhecida: acao_desconhecida");
  });
})