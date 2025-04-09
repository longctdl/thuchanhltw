const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Dữ liệu tạm lưu trong RAM
let users = [];

app.use(cors());
app.use(express.json());

// GET: Trả danh sách người dùng
app.get('/api/users', (req, res) => {
    res.json(users);
});

// POST: Nhận tên và email, thêm vào danh sách
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    if (name && email) {
        users.push({ name, email });
        res.status(201).json({ message: 'User added!' });
    } else {
        res.status(400).json({ message: 'Missing name or email' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Backend server đang chạy tại http://localhost:${PORT}`);
});
