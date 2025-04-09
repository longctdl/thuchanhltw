import React, { useEffect, useState } from 'react';
import './style.css'

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Lỗi khi fetch:', err));
    }, []);

    return (
        <div className="home">
            <h2>Danh sách người dùng</h2>
            {users.length === 0 ? (
                <p>Chưa có người dùng nào.</p>
            ) : (
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user.name} ({user.email})</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Home;
