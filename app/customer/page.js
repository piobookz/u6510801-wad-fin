'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
  const router = useRouter();

  useEffect(() => {
    // Fetch all customers
    async function fetchCustomers() {
      const res = await fetch('/api/customer');
      const data = await res.json();
      setCustomers(data);
    }
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/customer/${id}`, { method: 'DELETE' });
    setCustomers(customers.filter(customer => customer._id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const newCustomer = await res.json();
    setCustomers([...customers, newCustomer]);
    setFormData({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
  };

  return (
    <div>
      <h1 className="text-3xl my-3">Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            <a href={`/customer/${customer._id}`}>{customer.name}</a>
            <div className="bg-red-600 bg-opacity-75 w-16 p-2 text-white rounded-xl">
            <button onClick={() => handleDelete(customer._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-3xl my-3">Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Member Number"
          value={formData.memberNumber}
          onChange={(e) => setFormData({ ...formData, memberNumber: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Interests"
          value={formData.interests}
          onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
        />
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}
