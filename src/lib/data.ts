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
    questions: [
      {
        id: 1,
        question: 'What is the correct file extension for Python files?',
        options: ['.pyth', '.pt', '.py', '.python'],
        correctAnswer: '.py',
        explanation: 'Python files have the ".py" extension.',
      },
      {
        id: 2,
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'fun', 'define'],
        correctAnswer: 'def',
        explanation: 'The "def" keyword is used to define a function in Python.',
      },
      {
        id: 3,
        question: "How do you insert comments in Python code?",
        options: ["//This is a comment", "/*This is a comment*/", "#This is a comment"],
        correctAnswer: "#This is a comment",
        explanation: "Comments in Python start with the '#' character."
      },
      {
        id: 4,
        question: "Which collection is ordered, changeable, and allows duplicate members?",
        options: ["Tuple", "Set", "List", "Dictionary"],
        correctAnswer: "List",
        explanation: "A List is a collection which is ordered and changeable, and allows duplicate members."
      },
      {
        id: 5,
        question: "What is the result of `len(['hello', 'world'])`?",
        options: ["2", "11", "Error", "None"],
        correctAnswer: "2",
        explanation: "The `len()` function returns the number of items in a list, which is 2 in this case."
      }
    ],
  },
  // Add other domain tests here. For now, other tests will be empty.
  { domainId: 'java', questions: [] },
  { domainId: 'cybersecurity', questions: [] },
  { domainId: 'ai-ml', questions: [] },
  { domainId: 'sql', questions: [] },
  { domainId: 'bash', questions: [] },
];

export const users: User[] = [
    { id: 1, name: 'Alex Johnson', avatar: 'https://picsum.photos/seed/avatar1/100/100', tokens: 1250 },
    { id: 2, name: 'Maria Garcia', avatar: 'https://picsum.photos/seed/avatar2/100/100', tokens: 1100 },
    { id: 3, name: 'James Smith', avatar: 'https://picsum.photos/seed/avatar3/100/100', tokens: 980 },
    { id: 4, name: 'Priya Patel', avatar: 'https://picsum.photos/seed/avatar4/100/100', tokens: 950 },
    { id: 5, name: 'Chen Wei', avatar: 'https://picsum.photos/seed/avatar5/100/100', tokens: 820 },
    { id: 6, name: 'You', avatar: 'https://picsum.photos/seed/avatar6/100/100', tokens: 750 },
];
