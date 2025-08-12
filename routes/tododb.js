import express from 'express';
import db from '../Database/db.js';

const router = express.Router();

// Endpoint untuk mendapatkan semua tugas (tetap sama)
router.get('/', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(results);
    });
});

// Endpoint untuk mendapatkan tugas berdasarkan ID (tetap sama)
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM todos WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Tugas tidak ditemukan');
        res.json(results[0]);
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
        res.redirect('/todos-list'); // <--- Redirect ke halaman daftar tugas
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
        res.redirect('/todos-list'); // <--- Redirect ke halaman daftar tugas
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
        res.redirect('/todos-list'); // <--- Redirect ke halaman daftar tugas
    });
});

export default router;