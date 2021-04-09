import type { Task } from '../../src/shared/Task';

import hex from './01-hex/hex';
import base64 from './02-base64/base64';
import substitution from './03-substitution-cipher/substitution';
import dictionary from './04-dictionary/dictionary';
import book from './05-book/book';

const tasks: Task[] = [hex, base64, substitution, dictionary, book];

export const getAllTasks = (): Task[] => tasks;

export const getTaskById = (id: number): Task => tasks.find((task) => task.id === id);
