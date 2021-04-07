import type Task from '../../src/shared/Task';

import hex from './01-hex/hex';
import base64 from './02-base64/base64';

const tasks: Task[] = [hex, base64];

export const getAllTasks = (): Task[] => tasks;

export const getTaskById = (id: number): Task => tasks.find((task) => task.id === id);
