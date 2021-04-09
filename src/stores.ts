import { writable } from 'svelte/store';

type TaskInfo = {
  revealed?: string[];
  finished?: Date;
  started?: Date;
  guesses?: {
    guess: string;
    when: Date;
  }[];
};

type ProgressStore = {
  [key: number]: TaskInfo;
};

function createProgress(key, startValue) {
  const { subscribe, set, update } = writable(startValue);

  const revealInformation = (level: string, taskId: number) => {
    update((progress) => {
      if (progress[taskId]) {
        progress[taskId].revealed = progress[taskId].revealed || [];
        progress[taskId].revealed.push(level);
      } else {
        progress[taskId] = { revealed: [level] };
      }

      return progress;
    });
  };

  const startTask = (taskId: number) => {
    update((progress) => {
      if (progress[taskId] && !progress[taskId].started) {
        progress[taskId].started = new Date();
      } else if (!progress[taskId]) {
        progress[taskId] = { started: new Date() };
      }

      return progress;
    });
  };

  const finishedTask = (taskId: number) => {
    update((progress) => {
      if (progress[taskId] && !progress[taskId].finished) {
        progress[taskId].finished = new Date();
      } else if (!progress[taskId]) {
        progress[taskId] = { finished: new Date() };
      }

      return progress;
    });
  };

  const guessedTask = (taskId: number, guess: string) => {
    update((progress) => {
      if (progress[taskId]) {
        progress[taskId].guesses = progress[taskId].guesses || [];
        progress[taskId].guesses.push({ guess, when: new Date() });
      }

      return progress;
    });
  };

  return {
    subscribe,
    revealInformation,
    startTask,
    finishedTask,
    guessedTask,
    reset: () => set({}),
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }

      subscribe((current) => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    },
  };
}

export const progress = createProgress('code-cracker-progress', {});
