<script lang="ts">
  import type { Task } from './shared/Task';
  import { Route } from 'tinro';
  import Taskviewer from './Taskviewer.svelte';
  import Transition from './Transition.svelte';
  import Loading from './Loading.svelte';
  import TaskItem from './TaskItem.svelte';

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
            Some tasks have already been given some previous investigation, and hence have some more
            information about them. For confidentiality reasons, you need to further request more
            data to prevent any secret information from leaking. But please, don't request more data
            than you need.
          </p>
          <h2 class="task-title">Tasks</h2>
          <div class="tasks">
            {#each tasks as task}
              <TaskItem {task} />
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

  .task-title {
    color: var(--primary-color-dark);
    border-bottom: 5px solid var(--primary-color-dark);
    text-align: left;
    font-size: 50px;
    font-family: 'Dokdo';
  }

  .tasks {
    display: flex;
    flex-wrap: wrap;
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
