<script lang="ts">
  import type Task from './shared/Task';
  import { Route } from 'tinro';
  import Taskviewer from './Taskviewer.svelte';
  import Transition from './Transition.svelte';

  let allTasksPromise = getAllTasks();
  let singleTask = null;

  async function getAllTasks(): Promise<Task[]> {
    const res = await fetch(`/.netlify/functions/tasks`);
    const tasks = await res.json();

    if (res.ok) {
      return tasks;
    } else {
      throw new Error(tasks);
    }
  }

  async function setTask(id: number) {
    console.log(`Setting task id: ${id}`);
    const res = await fetch(`/tasks/${id}`);
    singleTask = await res.json();
  }
</script>

<main>
  <img src="/code-cracker-logo.png" class="logo" alt="Code Cracker" />
  <Transition>
    <Route path="/">
      {#await allTasksPromise}
        <p>...waiting</p>
      {:then tasks}
        <div class="tasks">
          {#each tasks as task}
            <div class="task-container"><a href="/{task.id}" class="task">Task {task.id}</a></div>
          {/each}
        </div>
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
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

  @media (min-width: 640px) {
    main {
      max-width: 640px;
    }
  }
</style>
