import React, { useEffect, useState } from 'react';
import './style.css';
import FormPage from './FormPage'; // Giả sử bạn muốn hiển thị form trong cùng trang

function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = () => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Lỗi khi fetch:', err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user); // Truyền dữ liệu người dùng sang FormPage để sửa
  };


  return (
    <div className="home">
      <h2>Danh sách người dùng</h2>
      {users.length === 0 ? (
        <p>Chưa có người dùng nào.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>{user.name}</strong> | {user.email} | {user.phone} | {user.address}
              <br />
              <button onClick={() => handleEdit(user)}>✏️ Sửa</button>
            </li>
          ))}
        </ul>
      )}

      <hr />
      <FormPage initialData={editingUser} onDone={fetchUsers} />
    </div>
  );
}

export default Home;

