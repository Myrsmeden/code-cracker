export enum Level {
  Required = 'REQUIRED',
  Hard = 'HARD',
  Medium = 'MEDIUM',
  Easy = 'EASY',
}

interface Information {
  html: string;
  level: Level;
}

export default interface Task {
  id: number;
  encrypt: (unencrypted: string) => string;
  decrypt: (encrypted: string) => string;
  indata: string[];
  information: Information[];
}

export interface ClientTask {
  id: number;
  code: string;
  indataId: number;
  information: Information[];
}
