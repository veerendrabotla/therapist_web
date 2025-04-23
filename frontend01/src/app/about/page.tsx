'use client';

import Image from 'next/image';

export default function About() {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      image: '/team/sarah.jpg',
      bio: 'Dr. Johnson has over 15 years of experience in mental health and leads our medical advisory board.',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: '/team/michael.jpg',
      bio: 'Michael brings 10+ years of experience in building secure healthcare platforms.',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Therapist Relations',
      image: '/team/emma.jpg',
      bio: 'Emma works closely with our therapist network to ensure the highest quality of care.',
    },
  ];

  const stats = [
    {
      label: 'Licensed Therapists',
      value: '500+',
    },
    {
      label: 'Happy Clients',
      value: '10,000+',
    },
    {
      label: 'Sessions Completed',
      value: '50,000+',
    },
    {
      label: 'Years of Service',
      value: '5+',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              About TherapyBooking
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
              Making mental health care accessible to everyone through technology
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="relative bg-white py-16 sm:py-24">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
          <div className="relative sm:py-16 lg:py-0">
            <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none">
              <div className="relative rounded-2xl shadow-xl overflow-hidden">
                <Image
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/about/mission.jpg"
                  alt="Our mission"
                  width={500}
                  height={300}
                />
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Our Mission
              </h2>
              <div className="mt-6 text-gray-500 space-y-6">
                <p className="text-lg">
                  At TherapyBooking, we believe that everyone deserves access to quality
                  mental health care. Our mission is to break down barriers and make it
                  easier for people to connect with licensed therapists who can help
                  them on their journey to better mental health.
                </p>
                <p className="text-lg">
                  We're committed to using technology to create a seamless, secure,
                  and supportive environment for both clients and therapists. Our
                  platform makes it simple to find the right therapist, schedule
                  appointments, and attend sessions from the comfort of your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by thousands of clients and therapists
            </h2>
            <p className="mt-3 text-xl text-indigo-200 sm:mt-4">
              Our growing community of mental health professionals and clients
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-4 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                  {stat.label}
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Meet Our Leadership Team
              </h2>
              <p className="text-xl text-gray-500">
                Dedicated professionals working to make mental health care accessible
              </p>
            </div>
            <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
              {teamMembers.map((member) => (
                <li key={member.name}>
                  <div className="space-y-6">
                    <div className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 overflow-hidden">
                      <Image
                        className="rounded-full"
                        src={member.image}
                        alt={member.name}
                        width={224}
                        height={224}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{member.name}</h3>
                        <p className="text-indigo-600">{member.role}</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Values</h2>
            <p className="mt-4 text-lg text-gray-500">
              These core values guide everything we do at TherapyBooking
            </p>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            {[
              {
                name: 'Accessibility',
                description:
                  'Making mental health care accessible to everyone, regardless of location or schedule.',
              },
              {
                name: 'Privacy',
                description:
                  'Ensuring the highest standards of privacy and security for all our users.',
              },
              {
                name: 'Quality',
                description:
                  'Working with licensed and verified therapists to provide the best care possible.',
              },
              {
                name: 'Innovation',
                description:
                  'Using technology to improve the therapy experience for both clients and therapists.',
              },
              {
                name: 'Support',
                description:
                  'Providing comprehensive support to our community of users and therapists.',
              },
              {
                name: 'Trust',
                description:
                  'Building trust through transparency, reliability, and consistent service.',
              },
            ].map((value) => (
              <div key={value.name} className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    {value.name}
                  </p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  {value.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 