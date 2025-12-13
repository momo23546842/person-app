'use client';

import { useState, useEffect, use } from 'react';
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

export default function PersonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMealForm, setShowMealForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [mealFormData, setMealFormData] = useState({
    title: 'breakfast',
    calories: '',
    protein: '',
    fat: '',
    carbs: '',
    eatenAt: new Date().toISOString().slice(0, 16),
    notes: '',
  });

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'brunch', 'supper'];

  // Fetch person details
  const fetchPerson = async () => {
    try {
      const response = await fetch(`/api/persons/${resolvedParams.id}`);
      if (response.ok) {
        const data = await response.json();
        setPerson(data);
      }
    } catch (error) {
      console.error('Error fetching person:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, [resolvedParams.id]);

  // Handle meal form input changes
  const handleMealInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMealFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset meal form
  const resetMealForm = () => {
    setMealFormData({
      title: 'breakfast',
      calories: '',
      protein: '',
      fat: '',
      carbs: '',
      eatenAt: new Date().toISOString().slice(0, 16),
      notes: '',
    });
    setEditingMeal(null);
    setShowMealForm(false);
  };

  // Handle meal form submission
  const handleMealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingMeal) {
        await fetch(`/api/meals/${editingMeal.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...mealFormData, personId: resolvedParams.id }),
        });
      } else {
        await fetch('/api/meals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...mealFormData, personId: resolvedParams.id }),
        });
      }
      resetMealForm();
      fetchPerson();
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };

  // Handle edit meal
  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setMealFormData({
      title: meal.title,
      calories: meal.calories.toString(),
      protein: meal.protein.toString(),
      fat: meal.fat.toString(),
      carbs: meal.carbs.toString(),
      eatenAt: new Date(meal.eatenAt).toISOString().slice(0, 16),
      notes: meal.notes || '',
    });
    setShowMealForm(true);
  };

  // Handle delete meal
  const handleDeleteMeal = async (id: number) => {
    if (!confirm('Are you sure you want to delete this meal?')) {
      return;
    }

    try {
      await fetch(`/api/meals/${id}`, { method: 'DELETE' });
      fetchPerson();
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  // Calculate nutrition totals
  const calculateTotals = () => {
    if (!person?.meals.length) return { calories: 0, protein: 0, fat: 0, carbs: 0 };
    return person.meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        fat: acc.fat + meal.fat,
        carbs: acc.carbs + meal.carbs,
      }),
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-500"></div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Person not found</h1>
        <Link href="/persons" className="text-slate-600 hover:text-slate-800">
          ← Back to Persons
        </Link>
      </div>
    );
  }

  const totals = calculateTotals();

  return (
    <div>
      {/* Back Link */}
      <Link
        href="/persons"
        className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-6"
      >
        ← Back to Persons
      </Link>

      {/* Person Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{person.name}</h1>
            <p className="text-gray-600 mt-1">📧 {person.email}</p>
            {person.age && <p className="text-gray-600">🎂 {person.age} years old</p>}
            {person.bio && <p className="text-gray-500 mt-2">📝 {person.bio}</p>}
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-700 mb-2">Total Nutrition</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Calories:</span>
                <span className="font-semibold text-gray-800 ml-1">{totals.calories}</span>
              </div>
              <div>
                <span className="text-gray-500">Protein:</span>
                <span className="font-semibold text-gray-800 ml-1">{totals.protein.toFixed(1)}g</span>
              </div>
              <div>
                <span className="text-gray-500">Fat:</span>
                <span className="font-semibold text-gray-800 ml-1">{totals.fat.toFixed(1)}g</span>
              </div>
              <div>
                <span className="text-gray-500">Carbs:</span>
                <span className="font-semibold text-gray-800 ml-1">{totals.carbs.toFixed(1)}g</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meals Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">🍽️ Meals</h2>
        <button
          onClick={() => setShowMealForm(!showMealForm)}
          className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-md"
        >
          {showMealForm ? '✕ Cancel' : '+ Add Meal'}
        </button>
      </div>

      {/* Meal Form */}
      {showMealForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {editingMeal ? '✏️ Edit Meal' : '➕ Add New Meal'}
          </h3>
          <form onSubmit={handleMealSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type *</label>
              <select
                name="title"
                value={mealFormData.title}
                onChange={handleMealInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
              >
                {mealTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calories *</label>
              <input
                type="number"
                name="calories"
                value={mealFormData.calories}
                onChange={handleMealInputChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g) *</label>
              <input
                type="number"
                name="protein"
                value={mealFormData.protein}
                onChange={handleMealInputChange}
                required
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fat (g) *</label>
              <input
                type="number"
                name="fat"
                value={mealFormData.fat}
                onChange={handleMealInputChange}
                required
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
                placeholder="15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g) *</label>
              <input
                type="number"
                name="carbs"
                value={mealFormData.carbs}
                onChange={handleMealInputChange}
                required
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Eaten At *</label>
              <input
                type="datetime-local"
                name="eatenAt"
                value={mealFormData.eatenAt}
                onChange={handleMealInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={mealFormData.notes}
                onChange={handleMealInputChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
                placeholder="Any notes about this meal..."
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3 flex gap-3">
              <button
                type="submit"
                className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {editingMeal ? 'Update Meal' : 'Add Meal'}
              </button>
              <button
                type="button"
                onClick={resetMealForm}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Meals List */}
      {person.meals.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No meals logged yet</h3>
          <p className="text-gray-500 mb-4">Start tracking meals for {person.name}!</p>
          <button
            onClick={() => setShowMealForm(true)}
            className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            + Add First Meal
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {person.meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">
                      {meal.title === 'breakfast' && '🌅'}
                      {meal.title === 'lunch' && '☀️'}
                      {meal.title === 'dinner' && '🌙'}
                      {meal.title === 'snack' && '🍎'}
                      {meal.title === 'brunch' && '🍳'}
                      {meal.title === 'supper' && '🌆'}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 capitalize">{meal.title}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(meal.eatenAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div className="bg-orange-50 rounded-lg p-3 text-center">
                      <div className="text-orange-600 text-sm font-medium">Calories</div>
                      <div className="text-xl font-bold text-orange-700">{meal.calories}</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3 text-center">
                      <div className="text-red-600 text-sm font-medium">Protein</div>
                      <div className="text-xl font-bold text-red-700">{meal.protein}g</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 text-center">
                      <div className="text-yellow-600 text-sm font-medium">Fat</div>
                      <div className="text-xl font-bold text-yellow-700">{meal.fat}g</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-blue-600 text-sm font-medium">Carbs</div>
                      <div className="text-xl font-bold text-blue-700">{meal.carbs}g</div>
                    </div>
                  </div>
                  {meal.notes && (
                    <p className="text-gray-500 mt-3 text-sm">📝 {meal.notes}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditMeal(meal)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMeal(meal.id)}
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
