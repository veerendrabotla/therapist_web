'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ClockIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/outline';

interface Therapist {
  id: string;
  firstName: string;
  lastName: string;
  profile: {
    specialization: string[];
    bio: string;
    experience: number;
    hourlyRate: number;
    rating: number;
  };
}

// Dummy data for testing
const dummyTherapists: Therapist[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    profile: {
      specialization: ['Cognitive Behavioral Therapy', 'Anxiety', 'Depression'],
      bio: 'Licensed therapist with 10+ years of experience in helping individuals overcome anxiety and depression.',
      experience: 10,
      hourlyRate: 120,
      rating: 4.8,
    },
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    profile: {
      specialization: ['Family Therapy', 'Relationships', 'Couples Counseling'],
      bio: 'Specialized in family dynamics and relationship counseling with 8 years of experience.',
      experience: 8,
      hourlyRate: 100,
      rating: 4.6,
    },
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    profile: {
      specialization: ['Trauma Therapy', 'PTSD', 'EMDR'],
      bio: 'Expert in trauma-informed care and PTSD treatment with 12 years of experience.',
      experience: 12,
      hourlyRate: 150,
      rating: 4.9,
    },
  },
];

export default function Therapists() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    minRating: '',
    maxRate: '',
  });

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        // For now, using dummy data
        let filteredTherapists = [...dummyTherapists];
        
        if (filters.specialization) {
          filteredTherapists = filteredTherapists.filter(therapist =>
            therapist.profile.specialization.some(spec =>
              spec.toLowerCase().includes(filters.specialization.toLowerCase())
            )
          );
        }
        
        if (filters.minRating) {
          filteredTherapists = filteredTherapists.filter(therapist =>
            therapist.profile.rating >= parseFloat(filters.minRating)
          );
        }
        
        if (filters.maxRate) {
          filteredTherapists = filteredTherapists.filter(therapist =>
            therapist.profile.hourlyRate <= parseInt(filters.maxRate)
          );
        }
        
        setTherapists(filteredTherapists);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch therapists');
        setLoading(false);
      }
    };

    fetchTherapists();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find a Therapist</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Browse our network of licensed therapists and find the right one for you.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., Anxiety, Depression"
                value={filters.specialization}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Minimum Rating
              </label>
              <select
                id="minRating"
                name="minRating"
                className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={filters.minRating}
                onChange={handleFilterChange}
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>
            <div>
              <label htmlFor="maxRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Maximum Rate (per hour)
              </label>
              <input
                type="number"
                id="maxRate"
                name="maxRate"
                className="mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="No limit"
                value={filters.maxRate}
                onChange={handleFilterChange}
              />
            </div>
          </form>
        </div>

        {/* Therapists List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapists.map((therapist) => (
            <Link
              key={therapist.id}
              href={`/therapists/${therapist.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {therapist.firstName} {therapist.lastName}
                  </h2>
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-lg font-medium text-indigo-600 dark:text-indigo-200">
                      {therapist.firstName.charAt(0)}
                      {therapist.lastName.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {therapist.profile.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{therapist.profile.experience} years</span>
                  </div>
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                    <span>${therapist.profile.hourlyRate}/hour</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{therapist.profile.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 