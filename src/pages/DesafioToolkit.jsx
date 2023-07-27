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
import Button from "@material-ui/core/Button/Button";

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
    <h1>Desafio Toolkit</h1>
      <input
        value={rascunho}
        style={{ height: "22px" }}
        onChange={(e) => dispatch(alterarRascunho(e.target.value))}
      />
      <Button variant="outlined"
                  color="primary"
                  size="small"
                  style={{ margin: "3px" }} onClick={handleAdicionarTarefa}>Adicionar</Button>
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
                <Button  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ margin: "3px" }}
                  onClick={() =>
                    handleSalvarNomeDeUsuario(tarefa.id, tarefa.valorEdicao)
                  }
                >
                  Salvar
                </Button>
                <Button variant="outlined"
                  color="secondary"
                  size="small"
                  style={{ margin: "5px" }}
                  onClick={() => handleCancelarEdicaoNomeDeUsuario(tarefa.id)}
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                {tarefa.texto}
                <Button  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ margin: "3px" }} onClick={() => handleEditarNomeDeUsuario(tarefa.id)}>
                  Editar
                </Button>
                <Button  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => handleRemoverTarefa(tarefa.id)}>
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