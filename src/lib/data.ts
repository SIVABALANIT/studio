
import type { Domain, Test, User } from './types';

export const domains: Domain[] = [
  {
    id: 'python',
    name: 'Python',
    description: 'Test your knowledge of Python fundamentals and advanced concepts.',
    icon: 'python',
    difficulty: 'Medium',
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Assess your skills in Java programming, from syntax to OOP principles.',
    icon: 'java',
    difficulty: 'Medium',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Challenge your understanding of security principles and practices.',
    icon: 'cybersecurity',
    difficulty: 'Hard',
  },
  {
    id: 'ai-ml',
    name: 'AI & ML',
    description: 'Explore concepts in Artificial Intelligence and Machine Learning.',
    icon: 'ai-ml',
    difficulty: 'Hard',
  },
  {
    id: 'sql',
    name: 'SQL',
    description: 'Prove your proficiency in database queries and data manipulation.',
    icon: 'sql',
    difficulty: 'Easy',
  },
  {
    id: 'bash',
    name: 'Bash Scripting',
    description: 'Test your ability to automate tasks and manage systems with Bash.',
    icon: 'bash',
    difficulty: 'Easy',
  },
];

export const tests: Test[] = [
  {
    domainId: 'python',
    levels: [
      { level: 1, description: 'Beginner concepts and basic syntax.' },
      { level: 2, description: 'Intermediate data structures and functions.' },
      { level: 3, description: 'Advanced topics and libraries.' },
    ],
  },
  {
    domainId: 'java',
    levels: [
        { level: 1, description: 'Basic syntax and data types.' },
        { level: 2, description: 'Object-Oriented Programming concepts.' },
        { level: 3, description: 'Advanced Java features and libraries.' },
    ],
  },
  { 
    domainId: 'cybersecurity', 
    levels: [
        { level: 1, description: 'Fundamental security concepts.' },
        { level: 2, description: 'Network and application security.' },
        { level: 3, description: 'Advanced cybersecurity topics.' },
    ] 
  },
  { 
    domainId: 'ai-ml', 
    levels: [
        { level: 1, description: 'Basic AI and ML concepts.' },
        { level: 2, description: 'Supervised and unsupervised learning.' },
        { level: 3, description: 'Deep learning and neural networks.' },
    ] 
  },
  { 
    domainId: 'sql', 
    levels: [
        { level: 1, description: 'Basic SQL queries and clauses.' },
        { level: 2, description: 'Joins, subqueries, and functions.' },
        { level: 3, description: 'Advanced SQL and database design.' },
    ] 
  },
  { 
    domainId: 'bash', 
    levels: [
        { level: 1, description: 'Basic commands and file operations.' },
        { level: 2, description: 'Scripting, variables, and control structures.' },
        { level: 3, description: 'Advanced scripting and process management.' },
    ] 
  },
];

export const users: User[] = [
    { id: 'user-1', name: 'Alex Johnson', avatar: 'https://picsum.photos/seed/avatar1/100/100', tokens: 1250, progress: { 'python': 5, 'java': 2 } },
    { id: 'user-2', name: 'Maria Garcia', avatar: 'https://picsum.photos/seed/avatar2/100/100', tokens: 1100, progress: { 'python': 2 } },
    { id: 'user-3', name: 'James Smith', avatar: 'https://picsum.photos/seed/avatar3/100/100', tokens: 980, progress: {} },
    { id: 'user-4', name: 'Priya Patel', avatar: 'https://picsum.photos/seed/avatar4/100/100', tokens: 950, progress: { 'sql': 1 } },
    { id: 'user-5', name: 'Chen Wei', avatar: 'https://picsum.photos/seed/avatar5/100/100', tokens: 820, progress: {} },
    { id: 'user-you', name: 'You', avatar: 'https://picsum.photos/seed/avatar6/100/100', tokens: 1300, progress: { 'python': 50 }, contact: "you@example.com", location: "Your City", socials: { twitter: "@you", linkedin: "linkedin.com/in/you"}, streak: 5 },
];
