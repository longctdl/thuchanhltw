const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Kết nối MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Long24012004',
  database: 'userdb'
});

connection.connect(err => {
  if (err) {
    console.error('❌ Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('✅ Kết nối MySQL thành công');
});

// -------------------- API --------------------


app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });
    res.json(results);
  });
});


app.post('/api/users', (req, res) => {
  const { name, email, phone, address } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Thiếu tên hoặc email' });
  }

  const query = 'INSERT INTO users (name, email, phone, address) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, email, phone, address], (err) => {
    if (err) return res.status(500).json({ message: 'Lỗi khi thêm' });
    res.status(201).json({ message: 'Đã thêm người dùng!' });
  });
});


app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, phone, address } = req.body;

  const query = 'UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?';
  connection.query(query, [name, email, phone, address, userId], (err) => {
    if (err) return res.status(500).json({ message: 'Lỗi khi cập nhật' });
    res.json({ message: 'Cập nhật thành công!' });
  });
});


app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
      if (err) return res.status(500).json({ message: 'Lỗi khi xóa' });
      res.json({ message: 'Đã xóa người dùng!' });
    });
  });
  

// ----------------------------------------------

app.listen(PORT, () => {
  console.log(`✅ Backend server đang chạy tại http://localhost:${PORT}`);
});
