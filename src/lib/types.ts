

export type Domain = {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type Test = {
  domainId: string;
  levels?: {
    level: number;
    description: string;
  }[];
  questions: Question[];
};

export type User = {
  id: number;
  name: string;
  avatar: string;
  tokens: number;
  contact?: string;
  location?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
  };
  streak?: number;
  progress?: {
    [domainId: string]: number; // Last completed level
  };
};
