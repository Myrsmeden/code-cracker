<script lang="ts">
  import type { Task } from './shared/Task';
  import { Route } from 'tinro';
  import Taskviewer from './Taskviewer.svelte';
  import Transition from './Transition.svelte';
  import { progress } from './stores';
  import Loading from './Loading.svelte';

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

  let allTasksPromise = getAllTasks();

  async function getAllTasks(): Promise<Task[]> {
    const res = await fetch(`/.netlify/functions/tasks`);
    const tasks = await res.json();

    if (res.ok) {
      return tasks;
    } else {
      throw new Error(tasks);
    }
  }
</script>

<main>
  <img src="/code-cracker-logo.png" class="logo" alt="Code Cracker" />
  <Transition>
    <Route path="/">
      <div class="start-container">
        {#await allTasksPromise}
          <Loading />
        {:then tasks}
          <p>
            Welcome to a creaking adventure of cracking the codes! The adventure consists of a set
            of tasks, of which you can choose below. Your mission, should you choose to accept it,
            is to solve the tasks and crack the codes.
          </p>
          <p>
            Some tasks have alreapdy been given some previous investigation, and hence have some
            more information about them. For confidentiality reasons, you need to further request
            more data to prevent any secret information from leaking. But please, don't request more
            data than you need.
          </p>
          <div class="tasks">
            {#each tasks as task}
              <div class="task-container">
                <a href="/{task.id}" class="task"
                  >Task {task.id}<span class="status">{getStatus(task.id)}</span>
                  {#if progressObject[task.id]?.revealed?.length}
                    <div class="info-dots">
                      {#each progressObject[task.id]?.revealed as level}
                        <span class="info-dot" />
                      {/each}
                    </div>
                  {/if}
                </a>
              </div>
            {/each}
          </div>
        {:catch error}
          <p style="color: red">{error.message}</p>
        {/await}
        <p class="tracking-info">
          A lot of cracking, but no tracking.<br />No cookies or tracking services are used in this
          application. Your progress is only stored in the local storage of the browser and never
          leaves your computer.
        </p>
      </div>
    </Route>
    <Route path="/:id">
      <Taskviewer />
    </Route>
  </Transition>
</main>

<style>
  main {
    text-align: center;
    padding: 0 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  .logo {
    height: 200px;
    width: auto;
  }

  .start-container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 220px);
  }

  .task-container {
    display: flex;
  }

  .tasks {
    display: flex;
    flex-wrap: wrap;
  }

  .task {
    display: block;
    border: 3px solid var(--primary-color-dark);
    border-radius: 10px;
    padding: 20px;
    margin: 0 10px 10px 0;
  }

  .task:hover {
    background-color: var(--primary-color-medium);
  }

  .status {
    display: block;
    font-size: 80%;
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

  .tracking-info {
    font-size: 60%;
    margin-top: auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: 640px;
    }
  }
</style>
