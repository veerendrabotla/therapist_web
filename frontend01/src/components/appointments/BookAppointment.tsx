import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Therapist {
  id: string;
  name: string;
  specialization: string;
  availability: {
    [key: string]: string[];
  };
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const BookAppointment: React.FC = () => {
  const router = useRouter();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async (): Promise<void> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/therapists`);
      if (!response.ok) {
        throw new Error('Failed to fetch therapists');
      }
      const data = await response.json();
      setTherapists(data);
    } catch (err) {
      setError('Failed to load therapists. Please try again later.');
      console.error('Error fetching therapists:', err);
    }
  };

  const fetchAvailableSlots = async (): Promise<void> => {
    if (!selectedTherapist || !selectedDate) return;

    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/available-slots?therapistId=${selectedTherapist}&date=${dateStr}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }
      const data = await response.json();
      setAvailableSlots(data);
    } catch (err) {
      setError('Failed to load available time slots. Please try again later.');
      console.error('Error fetching available slots:', err);
    }
  };

  useEffect(() => {
    if (selectedTherapist && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedTherapist, selectedDate]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!selectedTherapist || !selectedDate || !selectedTime) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          therapistId: selectedTherapist,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
          duration,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      router.push('/appointments');
    } catch (err) {
      setError('Failed to book appointment. Please try again later.');
      console.error('Error booking appointment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Therapist
          </label>
          <select
            value={selectedTherapist}
            onChange={(e) => setSelectedTherapist(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Choose a therapist</option>
            {therapists.map((therapist) => (
              <option key={therapist.id} value={therapist.id}>
                {therapist.name} - {therapist.specialization}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            minDate={new Date()}
            className="w-full p-2 border rounded"
            dateFormat="MMMM d, yyyy"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={!selectedDate || availableSlots.length === 0}
          >
            <option value="">Choose a time</option>
            {availableSlots.map((slot) => (
              <option
                key={slot.time}
                value={slot.time}
                disabled={!slot.available}
              >
                {slot.time}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Duration (minutes)
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          >
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={90}>1.5 hours</option>
            <option value={120}>2 hours</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment; 