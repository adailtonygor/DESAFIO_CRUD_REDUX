import { rest } from "msw";

export const handlers = [
  rest.get("*/todos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "delectus aut autem",
          completed: false,
        },
      ])
    );
  }),
  rest.post("*/todos", async (req, res, ctx) => {
    const { title } = await req.json();
    if (!title) {
      return res(
        ctx.status(400),
        ctx.json({
          error: "O campo 'title' não pode estar em branco.",
        })
      );
    }
    return res(
      ctx.status(201),
      ctx.json([
        {
          userId: 1,
          id: 2,
          title: title, 
          completed: false,
        },
      ])
    );
  }),
  rest.put("*/todos/:id", async (req, res, ctx) => {
    const todoData = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        userId: 1,
        id: 1,
        ...todoData,
      })
    );
  }),

  rest.delete("*/todos/:id", (req, res, ctx) => {
    const deletedTodoId = req.params.id;
    const message = `Tarefa com ID ${deletedTodoId} foi excluída com sucesso.`;

    return res(ctx.status(200), ctx.json({ message }));
  }),
];
