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
import { Button } from "@material-ui/core";

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
      <h1>Desafio Redux</h1>
      <input
        value={rascunho}
        style={{ height: "22px" }}
        onChange={(e) => {
          dispatch(alterarRascunho(e.target.value));
        }}
      />
      <Button
        variant="outlined"
        color="primary"
        size="small"
        style={{ margin: "3px" }}
        onClick={adicionarTarefa}
      >
        Adicionar
      </Button>
      <ul>
        {todos?.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.editando ? (
              <>
                <input
                  value={tarefa.valorEdicao}
                  style={{ height: "22px" }}
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
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ margin: "3px" }}
                  onClick={() =>
                    salvarNomeDeUsuario(tarefa.id, tarefa.valorEdicao)
                  }
                >
                  Salvar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  style={{ margin: "5px" }}
                  onClick={() => cancelarEdicaoNomeDeUsuario(tarefa.id)}
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                {tarefa.texto}
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ margin: "3px" }}
                  onClick={() => editarNomeDeUsuario(tarefa.id)}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => removerTarefa(tarefa.id)}
                >
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
