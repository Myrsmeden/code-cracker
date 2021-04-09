export interface Information {
  html: string;
  level: string;
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
