'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomerDetailPage({ params }) {
  const [customer, setCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // Fetch customer details by ID
    async function fetchCustomer() {
      const res = await fetch(`/api/customer/${id}`);
      const data = await res.json();
      setCustomer(data);
      setFormData({
        name: data.name,
        dateOfBirth: data.dateOfBirth.slice(0, 10), // Format date for input
        memberNumber: data.memberNumber,
        interests: data.interests || '',
      });
    }
    fetchCustomer();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/customer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    router.push('/customer'); // Redirect back to customer list after update
  };

  return customer ? (
    <div>
      <h1>Customer Details: {customer.name}</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
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
          value={formData.memberNumber}
          onChange={(e) => setFormData({ ...formData, memberNumber: e.target.value })}
          required
        />
        <input
          type="text"
          value={formData.interests}
          onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
        />
        <button type="submit">Update Customer</button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
