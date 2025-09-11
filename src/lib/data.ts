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
        question: 'What is a correct syntax to output "Hello World" in Python?',
        options: ['echo "Hello World"', 'p("Hello World")', 'print("Hello World")'],
        correctAnswer: 'print("Hello World")',
        explanation: 'In Python, the print() function is used to output text to the console.',
      },
      {
        id: 2,
        question: "How do you insert COMMENTS in Python code?",
        options: ["//This is a comment", "/*This is a comment*/", "#This is a comment"],
        correctAnswer: "#This is a comment",
        explanation: "Comments in Python start with the '#' character and extend to the end of the line."
      },
      {
        id: 3,
        question: "Which one is NOT a legal variable name?",
        options: ["my-var", "Myvar", "_myvar", "my_var"],
        correctAnswer: "my-var",
        explanation: "Variable names in Python cannot contain hyphens. They can contain letters, numbers, and underscores, but cannot start with a number."
      },
      {
        id: 4,
        question: "How do you create a variable with the numeric value 5?",
        options: ["x = 5", "x = int(5)"],
        correctAnswer: "x = 5",
        explanation: "You can assign a numeric value to a variable directly. Both `x = 5` and `x = int(5)` work, but the direct assignment is the most common and straightforward way."
      },
      {
        id: 5,
        question: "What is the correct file extension for Python files?",
        options: [".pyth", ".py", ".pt", ".pyt"],
        correctAnswer: ".py",
        explanation: 'Python files are saved with the ".py" extension.'
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
    { id: 6, name: 'You', avatar: 'https://picsum.photos/seed/avatar6/100/100', tokens: 100 },
];
