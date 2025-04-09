import React, { useState } from 'react';
import './style.css'

function FormPage() {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Gửi thất bại!');
            })
            .then(() => {
                setMessage('Gửi thành công!');
                setFormData({ name: '', email: '' });
            })
            .catch(() => {
                setMessage('Gửi thất bại!');
            });
    };

    return (
        <div>
            <h2>Nhập tên & email</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Tên"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Gửi</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default FormPage;
