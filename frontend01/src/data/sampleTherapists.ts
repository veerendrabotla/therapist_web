export interface Therapist {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: {
    specialization: string[];
    bio: string;
    experience: number;
    hourlyRate: number;
    availability: {
      [key: string]: string[];
    };
  };
}

export const sampleTherapists: Therapist[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    profile: {
      specialization: ['Anxiety', 'Depression', 'Trauma'],
      bio: 'Licensed clinical psychologist with 10+ years of experience specializing in anxiety and depression treatment. Certified in EMDR therapy for trauma.',
      experience: 10,
      hourlyRate: 150,
      availability: {
        'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        'Wednesday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        'Friday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
      }
    }
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@example.com',
    profile: {
      specialization: ['Relationships', 'Family Therapy', 'Couples Counseling'],
      bio: 'Marriage and Family Therapist with expertise in relationship dynamics and family systems. Trained in Gottman Method Couples Therapy.',
      experience: 8,
      hourlyRate: 140,
      availability: {
        'Tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        'Thursday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        'Saturday': ['10:00', '11:00', '12:00', '13:00']
      }
    }
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@example.com',
    profile: {
      specialization: ['Addiction Recovery', 'Stress Management', 'Mindfulness'],
      bio: 'Licensed Clinical Social Worker specializing in addiction recovery and stress management. Certified in Mindfulness-Based Stress Reduction (MBSR).',
      experience: 12,
      hourlyRate: 130,
      availability: {
        'Monday': ['13:00', '14:00', '15:00', '16:00', '17:00'],
        'Wednesday': ['13:00', '14:00', '15:00', '16:00', '17:00'],
        'Friday': ['13:00', '14:00', '15:00', '16:00', '17:00']
      }
    }
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@example.com',
    profile: {
      specialization: ['Career Counseling', 'Life Transitions', 'Personal Growth'],
      bio: 'Career and Life Coach with a background in psychology. Specializes in helping clients navigate major life transitions and achieve personal growth.',
      experience: 6,
      hourlyRate: 120,
      availability: {
        'Tuesday': ['10:00', '11:00', '12:00', '13:00', '14:00'],
        'Thursday': ['10:00', '11:00', '12:00', '13:00', '14:00'],
        'Saturday': ['09:00', '10:00', '11:00', '12:00']
      }
    }
  },
  {
    id: '5',
    firstName: 'Lisa',
    lastName: 'Thompson',
    email: 'lisa.thompson@example.com',
    profile: {
      specialization: ['Eating Disorders', 'Body Image', 'Self-Esteem'],
      bio: 'Licensed psychologist specializing in eating disorders and body image issues. Certified in Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT).',
      experience: 15,
      hourlyRate: 160,
      availability: {
        'Monday': ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
        'Wednesday': ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
        'Friday': ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00']
      }
    }
  }
]; 