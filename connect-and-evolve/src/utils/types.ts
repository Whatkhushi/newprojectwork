
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type Skill = {
  name: string;
  level: SkillLevel;
  category: string;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  rating: number;
  skills: Skill[];
  learning: Skill[];
  bio: string;
  isVerified: boolean;
  availability: 'Online' | 'Offline' | 'Both';
};
