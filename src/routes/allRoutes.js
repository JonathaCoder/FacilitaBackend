const express = require("express");

const allTodos = [{ nome: "aaaa", email: "teste", telefone: "12313132" }];
const todosRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// C
todosRoutes.post("/todos", async (request, response) => {
  const { email, name, telefone } = request.body;
  const todo = await prisma.client.create({
    data: {
      email,
      name,
      telefone,
    },
  });

  return response.status(201).json(todo);
});
// R
todosRoutes.get("/todos", async (request, response) => {
  const todos = await prisma.client.findMany();
  return response.status(200).json(todos);
});
// U

todosRoutes.put("/todos", async (request, response) => {
  const { name, id, email, telefone } = request.body;

  if (!id) {
    return response.status(400).json("Id is mandatory");
  }

  const todoAlreadyExist = await prisma.client.findUnique({ where: { id } });

  if (!todoAlreadyExist) {
    return response.status(404).json("Todo not exist");
  }

  const todo = await prisma.client.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      telefone,
    },
  });

  return response.status(200).json(todo);
});
// D
todosRoutes.delete("/todos/:id", async (request, response) => {
  const { id } = request.params;

  const intId = parseInt(id);

  if (!intId) {
    return response.status(400).json("Id is mandatory");
  }

  const todoAlreadyExist = await prisma.client.findUnique({
    where: { id: intId },
  });

  if (!todoAlreadyExist) {
    return response.status(404).json("Todo not exist");
  }

  await prisma.client.delete({ where: { id: intId } });

  return response.status(200).send();
});

module.exports = todosRoutes;
