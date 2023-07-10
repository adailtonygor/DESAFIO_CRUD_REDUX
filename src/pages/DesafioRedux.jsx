import { useSelector, useDispatch } from "react-redux";
import {
  alterarRascunho,
  adicionarTarefaAction,
  editarNomeDeUsuarioAction,
  salvarNomeDeUsuarioAction,
  cancelarEdicaoNomeDeUsuarioAction,
  removerTarefaAction,
  alterarValorEdicaoAction,
} from "./store/actions";

export default function ListaDeTarefas() {
  const rascunho = useSelector((state) => state.tarefas.rascunho);
  const todos = useSelector((state) => state.tarefas.todos);
  const dispatch = useDispatch();

  const adicionarTarefa = () => {
    dispatch(adicionarTarefaAction());
  };

  const editarNomeDeUsuario = (idTarefa) => {
    dispatch(editarNomeDeUsuarioAction(idTarefa));
  };

  const salvarNomeDeUsuario = (idTarefa, novoNomeDeUsuario) => {
    dispatch(salvarNomeDeUsuarioAction(idTarefa, novoNomeDeUsuario));
  };

  const cancelarEdicaoNomeDeUsuario = (idTarefa) => {
    dispatch(cancelarEdicaoNomeDeUsuarioAction(idTarefa));
  };

  const removerTarefa = (idTarefa) => {
    dispatch(removerTarefaAction(idTarefa));
  };

  const alterarValorEdicao = (tarefas) => {
    dispatch(alterarValorEdicaoAction(tarefas));
  };

  return (
    <>
      <input
        value={rascunho}
        onChange={(e) => {
          dispatch(alterarRascunho(e.target.value));
        }}
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
      <ul>
        {todos.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.editando ? (
              <>
                <input
                  value={tarefa.valorEdicao}
                  onChange={(e) => {
                    const novoValorEdicao = e.target.value;
                    const tarefasAtualizadas = todos.map((t) => {
                      if (t.id === tarefa.id) {
                        return { ...t, valorEdicao: novoValorEdicao };
                      }
                      return t;
                    });
                    alterarValorEdicao(tarefasAtualizadas);
                  }}
                />
                <button
                  onClick={() =>
                    salvarNomeDeUsuario(tarefa.id, tarefa.valorEdicao)
                  }
                >
                  Salvar
                </button>
                <button onClick={() => cancelarEdicaoNomeDeUsuario(tarefa.id)}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                {tarefa.texto}
                <button onClick={() => editarNomeDeUsuario(tarefa.id)}>
                  Editar
                </button>
                <button onClick={() => removerTarefa(tarefa.id)}>
                  Remover
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}