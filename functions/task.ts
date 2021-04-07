import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getTaskById } from './tasks/tasks';

export async function handler(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  const task = getTaskById(Number(event.path.match(/([^\/]*)\/*$/)[0]));
  const indataId = Math.floor(Math.random() * task.indata.length);
  const input = task.indata[indataId];
  const code = task.encrypt(input);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: task.id, code, indataId }),
  };
}
