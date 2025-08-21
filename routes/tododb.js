import express from 'express';
import db from '../Database/db.js';

const router = express.Router();

// Endpoint untuk menampilkan halaman edit tugas
router.get('/edit/:id', (req, res) => {
    const idToEdit = req.params.id;

    db.query('SELECT * FROM todos WHERE id = ?', [idToEdit], (err, results) => {
        if (err) {
            console.error('Error fetching task for edit:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.length === 0) {
            return res.status(404).send('Tugas tidak ditemukan.');
        }
        // Merender file EJS 'edit-todo.ejs' dan mengirimkan data tugas
        res.render('edit-todo', { todo: results[0] });
    });
});

// Endpoint untuk menambahkan tugas baru
router.post('/add', (req, res) => {
    const { task } = req.body;
    if (!task || task.trim() === '') {
        return res.status(400).send('Tugas tidak boleh kosong');
    }

    db.query('INSERT INTO todos (task) VALUES (?)', [task.trim()], (err, results) => {
        if (err) {
            console.error('Error adding task:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/todos-list');
    });
});

// Endpoint untuk memperbarui tugas
router.post('/update/:id', (req, res) => {
    const { task } = req.body;
    const idToUpdate = req.params.id;
    
    db.query('UPDATE todos SET task = ? WHERE id = ?', [task, idToUpdate], (err, results) => {
        if (err) {
            console.error('Error updating task:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Tugas tidak ditemukan');
        }
        res.redirect('/todos-list');
    });
});

// Endpoint untuk menghapus tugas
router.post('/delete/:id', (req, res) => {
    const idToDelete = req.params.id;

    db.query('DELETE FROM todos WHERE id = ?', [idToDelete], (err, results) => {
        if (err) {
            console.error('Error deleting task:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Tugas tidak ditemukan');
        }
        res.redirect('/todos-list');
    });
});

export default router;