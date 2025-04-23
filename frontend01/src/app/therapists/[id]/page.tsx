'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CalendarIcon, ClockIcon, CurrencyDollarIcon, StarIcon, PhoneIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

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
    availability: {
      day: string;
      slots: string[];
    }[];
    languages: string[];
    education: string[];
    certifications: string[];
  };
}

// Dummy data for testing
const dummyTherapist: Therapist = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Johnson',
  profile: {
    specialization: ['Cognitive Behavioral Therapy', 'Anxiety', 'Depression'],
    bio: 'Licensed therapist with 10+ years of experience in helping individuals overcome anxiety and depression. Specialized in CBT and mindfulness-based approaches.',
    experience: 10,
    hourlyRate: 120,
    rating: 4.8,
    availability: [
      { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'] },
      { day: 'Wednesday', slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'] },
      { day: 'Friday', slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'] },
    ],
    languages: ['English', 'Spanish'],
    education: ['PhD in Clinical Psychology, Stanford University', 'MA in Counseling, University of California'],
    certifications: ['Licensed Clinical Psychologist', 'Certified CBT Practitioner'],
  },
};

export default function TherapistProfile() {
  const params = useParams();
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        // For now, using dummy data
        setTherapist(dummyTherapist);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch therapist profile');
        setLoading(false);
      }
    };

    fetchTherapist();
  }, [params.id]);

  const handleBooking = async () => {
    if (!selectedSlot) return;

    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBookingSuccess(true);
      setShowBookingForm(false);
    } catch (err) {
      setError('Failed to book session');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !therapist) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error || 'Therapist not found'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {therapist.firstName} {therapist.lastName}
                </h1>
                <div className="flex items-center mt-2">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-gray-500 dark:text-gray-400">
                    {therapist.profile.rating} ({therapist.profile.experience} years experience)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                  <span>${therapist.profile.hourlyRate}/hour</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <div className="flex flex-wrap gap-2">
              {therapist.profile.specialization.map((spec, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About</h2>
            <p className="text-gray-500 dark:text-gray-400">{therapist.profile.bio}</p>
          </div>

          {/* Education */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Education</h2>
            <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
              {therapist.profile.education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Certifications</h2>
            <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
              {therapist.profile.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {therapist.profile.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            {bookingSuccess ? (
              <div className="bg-green-50 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-200 px-4 py-3 rounded relative mb-4">
                <span className="block sm:inline">Session booked successfully!</span>
              </div>
            ) : null}

            {!bookingSuccess && (
              <>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Book a Session</h2>
                {!showBookingForm ? (
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Book a Session
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Available Time Slots</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {therapist.profile.availability.map((day, dayIndex) => (
                          <div key={dayIndex} className="space-y-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">{day.day}</h4>
                            <div className="flex flex-wrap gap-2">
                              {day.slots.map((slot, slotIndex) => (
                                <button
                                  key={slotIndex}
                                  onClick={() => setSelectedSlot(`${day.day} ${slot}`)}
                                  className={`px-3 py-1 rounded-md text-sm ${
                                    selectedSlot === `${day.day} ${slot}`
                                      ? 'bg-indigo-600 text-white'
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {selectedSlot && (
                      <button
                        onClick={handleBooking}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Confirm Booking
                      </button>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Communication Options */}
            {bookingSuccess && (
              <div className="mt-6 space-y-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Communication Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    <span>Start Video Call</span>
                  </button>
                  <button
                    className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                    <span>Start Chat</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 