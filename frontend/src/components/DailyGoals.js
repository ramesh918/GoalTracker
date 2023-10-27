import React from 'react';
import DailyGoalsList from './DailyGoalsList'
const DailyGoalsPage = () => {


  const goals = [
    {
      "_id": "cda3eeab-bf20-4e52-bace-83eabe35ee9a",
      "dayOfEntry": "28-10-2023",
      "todoList": ["node.js", "reading book", "react", "network"],
      "checkTodoList": [true, false, true, true],
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "productivity": 75
    },
    {
      "_id": "cced166c-6e3a-43ab-9e61-5f5649cf71e3",
      "dayOfEntry": "29-10-2023",
      "todoList": ["node.js", "reading book", "react", "network"],
      "checkTodoList": [true, true, true, true],
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "productivity": 100
    },
    {
      "_id": "83a8228b-38a9-4e64-a678-6c7d5090cb8c",
      "dayOfEntry": "30-10-2023",
      "todoList": ["node.js", "reading book", "react", "network"],
      "checkTodoList": [true, false, false, true],
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "productivity": 50
    },
    {
      "_id": "9d57f9c2-50c7-4594-870e-74673e768f1c",
      "dayOfEntry": "31-10-2023",
      "todoList": ["node.js", "reading book", "react", "network"],
      "checkTodoList": [true, false, false, false],
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "productivity": 25
    },
    {
      "_id": "17b01088-5e9a-4d3f-98b9-ff7bbab1c27d",
      "dayOfEntry": "01-11-2023",
      "todoList": ["node.js", "reading book", "react", "network"],
      "checkTodoList": [true, false, true, true],
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "productivity": 75
    }
  ]
  
  return (
    <div>
      <h2>DailyGoalsPage</h2>
      <DailyGoalsList goals={goals} />,
      {/* Add your productivity-related components and content here */}
    </div>
  );
};

export default DailyGoalsPage;