'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Meal {
  id: number;
  title: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  eatenAt: string;
  notes: string | null;
}

interface Person {
  id: number;
  name: string;
  email: string;
  age: number | null;
  bio: string | null;
  createdAt: string;
  meals: Meal[];
}

export default function Home() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    bio: '',
  });

  // Fetch all persons
  const fetchPersons = async () => {
    try {
      const response = await fetch('/api/persons');
      const data = await response.json();

      if (!response.ok) {
        console.error('Error fetching persons (API):', data);
        setPersons([]);
        return;
      }

      if (Array.isArray(data)) {
        setPersons(data);
      } else if (data && Array.isArray((data as any).persons)) {
        // handle payloads like { persons: [...] }
        setPersons((data as any).persons);
      } else {
        console.error('Unexpected persons payload:', data);
        setPersons([]);
      }
    } catch (error) {
      console.error('Error fetching persons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', email: '', age: '', bio: '' });
    setEditingPerson(null);
    setShowForm(false);
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPerson) {
        // Update existing person
        await fetch(`/api/persons/${editingPerson.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new person
        await fetch('/api/persons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      resetForm();
      fetchPersons();
    } catch (error) {
      console.error('Error saving person:', error);
    }
  };

  // Handle edit
  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    setFormData({
      name: person.name,
      email: person.email,
      age: person.age?.toString() || '',
      bio: person.bio || '',
    });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this person? This will also delete all their meals.')) {
      return;
    }

    try {
      await fetch(`/api/persons/${id}`, { method: 'DELETE' });
      fetchPersons();
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👥 Person Management</h1>
          <p className="text-gray-600 mt-1">Manage people and track their meal habits</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-md"
        >
          {showForm ? '✕ Cancel' : '+ Add Person'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingPerson ? '✏️ Edit Person' : '➕ Add New Person'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="0"
                max="150"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
                placeholder="25"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
                placeholder="Tell us about this person..."
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {editingPerson ? 'Update Person' : 'Create Person'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Persons List */}
      {persons.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">👤</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No persons yet</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first person!</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            + Add Person
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {persons.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{person.name}</h3>
                  <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full">
                    {person.meals.length} meals
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">📧 {person.email}</p>
                {person.age && (
                  <p className="text-gray-600 text-sm mb-2">🎂 {person.age} years old</p>
                )}
                {person.bio && (
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">📝 {person.bio}</p>
                )}
                <p className="text-gray-400 text-xs mb-4">
                  Added {new Date(person.createdAt).toLocaleDateString()}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/persons/${person.id}`}
                    className="text-slate-600 hover:text-slate-800 text-sm font-medium px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleEdit(person)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(person.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
