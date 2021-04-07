import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getAllTasks } from './tasks/tasks';

export async function handler(): Promise<APIGatewayProxyResult> {
  console.log('Hello');
  const tasks = getAllTasks();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tasks),
  };
}
