import express from "express";
import "dotenv/config"; // Correct way to import and configure dotenv
import { router as todoRouter, todos } from "./routes/todo.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/todos-data", (req, res) => {
  res.json(todos);
});

app.get("/todos-list", (req, res) => {
  res.render("todos-pages", { todos: todos });
});

app.use((req, res) => {
  res.status(404).send("404 - page not found");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});