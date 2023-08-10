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
import "./button.css";

export default function DesafioRedux() {
  const rascunho = useSelector((state) => state.rascunho);
  const todos = useSelector((state) => state.todos);
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
      <h1 className="titulo">Desafio Redux</h1>
      <div className="input__container">
        
        <input
          value={rascunho}
          placeholder="Digite uma nova tarefa"
          style={{
            marginBottom: "50px",
            height: "27px",
            width: "35vh",
            borderRadius: "5px",
          }}
          onChange={(e) => {
            dispatch(alterarRascunho(e.target.value));
          }}
        />
        <button className="action-button" onClick={adicionarTarefa}>
          Adicionar
        </button>
        <ul>
          {todos?.map((tarefa) => (
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
                    className="action-button primary"
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
