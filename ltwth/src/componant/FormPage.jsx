import React, { useState, useEffect } from 'react';
import './style.css';

function FormPage({ initialData, onDone }) {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id
      ? `http://localhost:5000/api/users/${formData.id}`
      : 'http://localhost:5000/api/users';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || 'Thành công!');
        setFormData({ id: null, name: '', email: '', phone: '', address: '' });
        if (onDone) onDone(); // Gọi callback để reload danh sách
      })
      .catch(() => {
        setMessage('❌ Có lỗi xảy ra!');
      });
  };

  return (
    <div className="container">
      <h2>{formData.id ? 'Cập nhật người dùng' : 'Thêm người dùng mới'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input type="text" name="name" placeholder="Tên" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} />
        <input type="text" name="address" placeholder="Địa chỉ" value={formData.address} onChange={handleChange} />
        <button type="submit">{formData.id ? 'Cập nhật' : 'Gửi'}</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default FormPage;
