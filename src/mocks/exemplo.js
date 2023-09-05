

//    rest.post('*/eventos-sinistro/associar', async (req, res, ctx) => {

//         const body = await req.json();

//         if (body) {

//             return res(

//                 ctx.json({

//                     timestamp: '2023-06-26 11:14:17',

//                     nrStatus: 200,

//                     txMensagem: 'Operação realizada com sucesso.',

//                     dados: true,

//                 })

//             );

//         }

//     }),


// // como retornar uma resposta de erro 


// rest.delete(

//         '*/culturas-personalizadas/excluir/:id',

//         async (req, res, ctx) => {

//             const { id } = req.params;

 

//             if (!id) {

//                 return res(

//                     ctx.json({

//                         error: 'no id',

//                     })

//                 );

//             }

 

//             return res(

//                 ctx.json({

//                     nrStatus: 200,

//                     timestamp: '2023-07-25 17:06:27',

//                     txMensagem: 'Operação realizada com sucesso.',

//                     dados: {

//                         comErro: null,

//                         pendentes: null,

//                         comSucesso: null,

//                     },

//                 })

//             );

//         }

//     ),