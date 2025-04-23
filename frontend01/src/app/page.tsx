import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { VideoCameraIcon, CalendarIcon, UserGroupIcon } from '@/components/icons';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Connect with licensed therapists online
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Book secure video sessions with experienced therapists from the comfort of your home.
                  Take the first step towards better mental health today.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/signup"
                    className="btn"
                  >
                    Get started
                    <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link href="/therapists" className="text-sm font-semibold leading-6 text-gray-900">
                    Browse therapists <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for online therapy
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We provide a secure and convenient platform for connecting with licensed therapists
            and managing your mental health journey.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: 'Secure Video Sessions',
    description:
      'Connect with your therapist through our secure, HIPAA-compliant video platform. No downloads required.',
    icon: VideoCameraIcon,
  },
  {
    name: 'Easy Scheduling',
    description:
      'Book and manage your appointments with ease. Get reminders and notifications for upcoming sessions.',
    icon: CalendarIcon,
  },
  {
    name: 'Licensed Therapists',
    description:
      'All our therapists are licensed professionals with years of experience in various specialties.',
    icon: UserGroupIcon,
  },
]; 