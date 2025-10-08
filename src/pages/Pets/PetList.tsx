import React, { useEffect, useState } from 'react';
import api from 'api';

type Pet = {
  id: string;
  name: string;
  type: string;
  breed?: string;
  age?: number;
};

export default function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.getPets();
      setPets(res.data?.data ?? res.data);
    } catch (err) {
      console.error('Failed to load pets', err);
      alert('Failed to load pets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Pets</h1>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : pets.length === 0 ? (
          <div className="p-4 bg-white rounded shadow">No pets found. Add your first pet!</div>
        ) : (
          <ul className="space-y-4">
            {pets.map((pet) => (
              <li key={pet.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold">{pet.name}</div>
                  <div className="text-sm text-gray-600">{pet.type} • {pet.breed ?? 'Unknown breed'}</div>
                </div>
                <div className="text-sm text-gray-500">Age: {pet.age ?? '—'}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}