<script lang="ts">
  import { progress } from './stores';

  export let task;

  progress.useLocalStorage();

  let progressObject;

  progress.subscribe((data) => {
    progressObject = data;
  });

  const getStatus = (taskId: number) => {
    const taskProgress = progressObject[taskId];

    if (!taskProgress) {
      return 'TBD';
    }

    if (taskProgress.finished) {
      return 'Completed';
    }

    if (taskProgress.guesses?.length) {
      return 'Guessed';
    }

    if (taskProgress.started) {
      return 'Started';
    }

    return 'Unknown status';
  };
</script>

<div class="task-container">
  <a href="/{task.id}" class={`task task-${getStatus(task.id).toLocaleLowerCase()}`}>
    #{task.id}<span class="status" />
    {#if progressObject[task.id]?.revealed?.length}
      <div class="info-dots">
        {#each progressObject[task.id]?.revealed as level}
          <span class="info-dot" />
        {/each}
      </div>
    {/if}
  </a>
</div>

<style>
  .task-container {
    display: flex;
  }

  .task {
    display: block;
    padding: 20px;
    margin: 0 10px 10px 0;
    font-size: 52px;
    font-family: 'Dokdo';
    border: 5px dashed var(--primary-color-medium);
    color: var(--primary-color-medium);
    border-radius: 100%;
  }

  .task:hover {
    background-color: var(--primary-color-medium);
    border-style: solid;
    border-color: var(--primary-color-dark);
    background-color: var(--color-white);
    color: var(--primary-color-dark);
  }

  .status {
    display: block;
    font-size: 80%;
  }

  .task-started {
    border-style: solid;
    color: var(--primary-color-dark);
    border-color: var(--primary-color-dark);
  }

  .task-completed {
    border-color: var(--primary-color-dark);
    border-style: solid;
    color: var(--color-white);
    background-color: var(--primary-color-dark);
  }

  .info-dots {
    display: flex;
    margin: 4px;
  }

  .info-dot {
    display: block;
    border-radius: 3px;
    width: 6px;
    height: 6px;
    background-color: var(--primary-color-dark);
    margin: 0 4px 4px 0;
  }
</style>
