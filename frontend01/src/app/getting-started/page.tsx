'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function GettingStarted() {
  const steps = [
    {
      title: 'Create an Account',
      description:
        'Sign up for a free account to get started. Choose whether you\'re a patient looking for therapy or a licensed therapist.',
      icon: '👤',
      link: '/signup',
      buttonText: 'Create Account',
    },
    {
      title: 'Complete Your Profile',
      description:
        'Fill in your personal information and preferences to help us match you with the right therapist.',
      icon: '📝',
      link: '/profile',
      buttonText: 'Edit Profile',
    },
    {
      title: 'Browse Therapists',
      description:
        'Search through our network of licensed therapists, filter by specialization, read reviews, and find the perfect match.',
      icon: '🔍',
      link: '/therapists',
      buttonText: 'Find Therapists',
    },
    {
      title: 'Book a Session',
      description:
        'Choose a convenient time slot and book your session. You can opt for video, phone, or chat-based therapy.',
      icon: '📅',
      link: '/appointments',
      buttonText: 'Book Now',
    },
  ];

  const features = [
    {
      title: 'Secure Video Sessions',
      description:
        'Our platform uses end-to-end encryption to ensure your therapy sessions are completely private and secure.',
      icon: '🔒',
    },
    {
      title: 'Flexible Scheduling',
      description:
        'Book sessions at times that work for you, with options for evenings and weekends.',
      icon: '⏰',
    },
    {
      title: 'Licensed Therapists',
      description:
        'All therapists are licensed professionals with verified credentials and experience.',
      icon: '✅',
    },
    {
      title: 'Multiple Payment Options',
      description:
        'We accept various payment methods and can provide documentation for insurance reimbursement.',
      icon: '💳',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Getting Started with TherapyBooking
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
              Your journey to better mental health begins here. Follow these simple
              steps to get started with online therapy.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            Get Started
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            How It Works
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Follow these steps to start your therapy journey
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
              >
                <div>
                  <div className="absolute rounded-md p-3 bg-indigo-50">
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <div className="pl-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Step {index + 1}: {step.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href={step.link}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {step.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
              Platform Features
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Why Choose Us
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Everything you need for successful online therapy sessions
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="pt-6"
                >
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg text-3xl">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-600">
              Create your account today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 