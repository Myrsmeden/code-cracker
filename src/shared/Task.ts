export type Level = 'Required' | 'Hard' | 'Medium' | 'Easy';
export interface Information {
  html: string;
  level: Level;
}

export interface ClientTask {
  id: number;
  code: string;
  indataId: number;
  information: Information[];
}

export interface Task {
  id: number;
  encrypt: (unencrypted: string) => string;
  decrypt: (encrypted: string) => string;
  indata: string[];
  information: Information[];
}
