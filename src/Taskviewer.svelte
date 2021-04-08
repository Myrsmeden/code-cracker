<script lang="ts">
  import type { ClientTask } from './shared/Task';
  import { meta } from 'tinro';
  import { current_component } from 'svelte/internal';
  const route = meta();
  let getTaskPromise = getTask(Number(route.params.id));
  let answer = '';
  let incorrectAnswer = false;
  let correctAnswer = false;

  async function getTask(id: number): Promise<ClientTask> {
    const res = await fetch(`/.netlify/functions/task/${id}`);
    const task = await res.json();

    if (res.ok) {
      return task;
    } else {
      throw new Error(task);
    }
  }

  async function sendAnswer(id: number, indataId: number) {
    incorrectAnswer = false;
    const res = await fetch(`/.netlify/functions/answer/${id}`, {
      method: 'POST',
      body: JSON.stringify({ answer, indataId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      correctAnswer = true;
    } else {
      incorrectAnswer = true;
    }
  }
</script>

{#await getTaskPromise}
  <p>...waiting</p>
{:then task}
  <section class="task">
    <p class="code-label">The provided code is:</p>
    <div class="code">
      {task.code}
    </div>
    <label for="answer">Type your answer here:</label>
    <input id="answer" bind:value={answer} />
    <button on:click={() => sendAnswer(task.id, task.indataId)}>Send answer</button>

    {#if incorrectAnswer}
      <p class="incorrect-answer">That answer was not correct, please try again</p>
    {/if}

    {#if correctAnswer}
      <p class="correct-answer">That was correct! <a href="/">Back to tasks list</a></p>
    {/if}
  </section>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
  .task {
    text-align: left;
  }

  .code-label,
  label {
    font-weight: bold;
  }

  .code {
    padding: 15px;
    border: 5px solid var(--primary-color-dark);
    word-wrap: break-word;
  }
</style>
