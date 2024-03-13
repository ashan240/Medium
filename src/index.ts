import { Hono } from "hono";

// Create the main Hono app
const app = new Hono();

app.post("/api/v1/signup", (c) => {
  return c.text("signup route");
});

app.post("/api/v1/signin", (c) => {
  return c.text("signin route");
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
