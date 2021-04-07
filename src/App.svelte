<script lang="ts">
  import type Task from './shared/Task';
  import { Route } from 'tinro';
  import Taskviewer from './Taskviewer.svelte';

  let allTasksPromise = getAllTasks();
  let singleTask = null;

  async function getAllTasks(): Promise<Task[]> {
    const res = await fetch(`/tasks`);
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
  <Route path="/">
    {#await allTasksPromise}
      <p>...waiting</p>
    {:then tasks}
      {#each tasks as task}
        <div class="task"><a href="/{task.id}">Task {task.id}</a></div>
      {/each}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </Route>
  <Route path="/:id">
    <Taskviewer />
  </Route>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
