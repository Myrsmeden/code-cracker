export default interface Task {
  id: number;
  encrypt: (unencrypted: string) => string;
  decrypt: (encrypted: string) => string;
  indata: string[];
}

export interface ClientTask {
  id: number;
  code: string;
  indataId: number;
}
