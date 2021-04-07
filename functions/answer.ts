import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getTaskById } from './tasks/tasks';

export async function handler(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  const task = getTaskById(Number(event.path.match(/([^\/]*)\/*$/)[0]));
  const { indataId, answer } = JSON.parse(event.body);
  const input = task.indata[indataId];
  const correct = input === answer;

  return {
    statusCode: correct ? 200 : 406,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ success: correct }),
  };
}
