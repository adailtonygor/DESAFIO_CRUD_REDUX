import { useSelector, useDispatch } from "react-redux";
import {
  alterarRascunho,
  adicionarTarefa,
  editarNomeDeUsuario,
  salvarNomeDeUsuario,
  cancelarEdicaoNomeDeUsuario,
  removerTarefa,
  alterarValorEdicao,
} from "./store/tarefasSlice";

export default function ListaDeTarefas() {
  const { rascunho, todos } = useSelector((state) => state.tarefas);
  const dispatch = useDispatch();

  const handleAdicionarTarefa = () => {
    dispatch(adicionarTarefa());
  };

  const handleEditarNomeDeUsuario = (idTarefa) => {
    dispatch(editarNomeDeUsuario({ idTarefa }));
  };

  const handleSalvarNomeDeUsuario = (idTarefa, novoNomeDeUsuario) => {
    dispatch(salvarNomeDeUsuario({ idTarefa, novoNomeDeUsuario }));
  };

  const handleCancelarEdicaoNomeDeUsuario = (idTarefa) => {
    dispatch(cancelarEdicaoNomeDeUsuario({ idTarefa }));
  };

  const handleRemoverTarefa = (idTarefa) => {
    dispatch(removerTarefa({ idTarefa }));
  };

  const handleAlterarValorEdicao = (idTarefa, novoValorEdicao) => {
    dispatch(alterarValorEdicao({ idTarefa, novoValorEdicao }));
  };

  return (
    <>
      <input
        value={rascunho}
        onChange={(e) => dispatch(alterarRascunho(e.target.value))}
      />
      <button onClick={handleAdicionarTarefa}>Adicionar</button>
      <ul>
        {todos.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.editando ? (
              <>
                <input
                  value={tarefa.valorEdicao}
                  onChange={(e) =>
                    handleAlterarValorEdicao(tarefa.id, e.target.value)
                  }
                />
                <button
                  onClick={() =>
                    handleSalvarNomeDeUsuario(tarefa.id, tarefa.valorEdicao)
                  }
                >
                  Salvar
                </button>
                <button
                  onClick={() => handleCancelarEdicaoNomeDeUsuario(tarefa.id)}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                {tarefa.texto}
                <button onClick={() => handleEditarNomeDeUsuario(tarefa.id)}>
                  Editar
                </button>
                <button onClick={() => handleRemoverTarefa(tarefa.id)}>
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