export const adicionarTarefaAction = () => ({
    type: 'ADICIONAR_TAREFA',
  });
  
  export const editarNomeDeUsuarioAction = (idTarefa) => ({
    type: 'EDITAR_NOME_DE_USUARIO',
    idTarefa,
  });
  
  export const salvarNomeDeUsuarioAction = (idTarefa, novoNomeDeUsuario) => ({
    type: 'SALVAR_NOME_DE_USUARIO',
    idTarefa,
    novoNomeDeUsuario,
  });
  
  export const cancelarEdicaoNomeDeUsuarioAction = (idTarefa) => ({
    type: 'CANCELAR_EDICAO_NOME_DE_USUARIO',
    idTarefa,
  });
  
  export const removerTarefaAction = (idTarefa) => ({
    type: 'REMOVER_TAREFA',
    idTarefa,
  });
  
  export const alterarValorEdicaoAction = (tarefas) => ({
    type: 'ALTERAR_VALOR_EDICAO',
    tarefas,
  });
  export const alterarRascunho = (proximoRascunho) => ({
    type: 'ALTERAR_RASCUNHO',
    proximoRascunho,
  });