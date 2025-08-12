import express from "express";
import "dotenv/config";
import db from "./Database/db.js"; 
import tododbRouter from "./routes/tododb.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Semua endpoint yang terkait dengan tugas akan ditangani oleh router database.
app.use("/todos", tododbRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Endpoint untuk menampilkan halaman daftar tugas.
// Data diambil langsung dari database setiap kali halaman dimuat.
app.get("/todos-list", (req, res) => {
  db.query('SELECT * FROM todos', (err, todos) => {
    if (err) {
      console.error('Error fetching todos:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.render("todos-pages", { todos: todos });
  });
});

app.use((req, res) => {
  res.status(404).send("404 - page not found");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});