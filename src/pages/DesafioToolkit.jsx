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
import "./button.css";

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
      <h1 className="titulo">Desafio Toolkit</h1>

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
          onChange={(e) => dispatch(alterarRascunho(e.target.value))}
          
        />
        <button
          className="action-button"
          style={{ margin: "3px" }}
          onClick={handleAdicionarTarefa}
        >
          Adicionar
        </button>
        <ul>
          {todos.map((tarefa) => (
            <li key={tarefa.id}>
              {tarefa.editando ? (
                <>
                  <input
                    value={tarefa.valorEdicao}
                    style={{ height: "22px" }}
                    onChange={(e) =>
                      handleAlterarValorEdicao(tarefa.id, e.target.value)
                    }
                  />
                  <button
                    className="action-button primary"
                    style={{ margin: "3px" }}
                    onClick={() =>
                      handleSalvarNomeDeUsuario(tarefa.id, tarefa.valorEdicao)
                    }
                  >
                    Salvar
                  </button>
                  <button
                    className="action-button secondary"
                    style={{ margin: "5px" }}
                    onClick={() => handleCancelarEdicaoNomeDeUsuario(tarefa.id)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {tarefa.texto}
                  <button
                    className="action-button primary"
                    style={{ margin: "3px" }}
                    onClick={() => handleEditarNomeDeUsuario(tarefa.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="action-button secondary"
                    onClick={() => handleRemoverTarefa(tarefa.id)}
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
