import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});

app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get blog route");
});

app.post("/api/v1/blog", (c) => {
  return c.text("signin route");
});

app.put("/api/v1/blog", (c) => {
  return c.text("signin route");
});

export default app;
//postgresql://ashanraj24:odJQGsax69Eq@ep-little-waterfall-a5sofg08.us-east-2.aws.neon.tech/medium?sslmode=require
//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYzVmNTA3M2EtYTYzYS00NjZmLThlYmItZjEzMjA3ODFkYWJmIiwidGVuYW50X2lkIjoiYWFkMjFiZmZkZDU0NDJiNjI4MTc5OTEwNjAxODA2NzQwYTM0YWJiMWU5ZjIwNWViOGFkZDU3YWVlMTU0ODU4NiIsImludGVybmFsX3NlY3JldCI6IjFiZWEwNTZmLWVkYTctNDcyNi1hOWIyLTNiYzU0YjkzYjQwYSJ9.ACOEzDzrbuV8oGfE9O61pzCJpTfxPNvgVXK7ds3T12s"
