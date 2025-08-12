import express from "express";
const router = express.Router();

// Data dummy
let todos = [
  { id: 1, task: "Belajar Node.js" },
  { id: 2, task: "Membuat aplikasi To-Do" },
];

// Endpoint untuk menambahkan tugas baru (CREATE)
router.post("/add", (req, res) => {
  // Peningkatan kecil: Gunakan ID unik untuk menghindari duplikasi saat ada data yang dihapus
  const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
  const newTodo = {
    id: newId,
    task: req.body.task, // Ambil data 'task' dari form
  };
  todos.push(newTodo);
  res.redirect("/todos-list"); // Alihkan ke halaman daftar tugas
});

// Endpoint untuk menghapus tugas (DELETE)
router.post("/delete/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === idToDelete);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
  }
  res.redirect("/todos-list"); // Alihkan ke halaman daftar tugas
});

// Endpoint untuk MENAMPILKAN halaman edit (UPDATE Bagian 1)
router.get("/edit/:id", (req, res) => {
  const idToEdit = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === idToEdit);
  if (todo) {
    // Render file ejs baru (edit-todo.ejs) dan kirim data tugasnya
    res.render("edit-todo", { todo: todo });
  } else {
    res.redirect("/todos-list");
  }
});

// Endpoint untuk MEMPROSES pembaruan tugas (UPDATE Bagian 2)
router.post("/update/:id", (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === idToUpdate);

  if (todo) {
    todo.task = req.body.task; // Perbarui task dengan data dari form
  }
  res.redirect("/todos-list"); // Alihkan ke halaman daftar tugas
});

// PENTING: Ubah cara ekspor agar router dan data bisa diakses bersamaan
export { router, todos };