import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Apna MySQL username daalein
    password: '', // Apna MySQL password daalein
    database: 'koii_network'
});

// Route to get articles data
app.get('/api/articles', (req, res) => {
    const query = "SELECT * FROM articles";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
