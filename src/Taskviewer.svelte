<script lang="ts">
  import { meta } from 'tinro';
  import type { ClientTask, Information } from './shared/Task';
  import { progress } from './stores';
  import Loading from './Loading.svelte';

  const route = meta();
  let getTaskPromise = getTask(Number(route.params.id));
  let answer = '';
  let incorrectAnswer = false;
  let correctAnswer = false;

  let progressObject;

  const reload = () => {
    getTaskPromise = getTask(Number(route.params.id));
  };

  progress.subscribe((data) => {
    progressObject = data;
  });

  $: shouldShow = (info: Information, taskId: number): boolean => {
    if (info.level === 'Required') {
      return true;
    }

    return progressObject[taskId]?.revealed?.includes(info.level);
  };

  async function getTask(id: number): Promise<ClientTask> {
    const res = await fetch(`/.netlify/functions/task/${id}`);
    const task = await res.json();

    if (res.ok) {
      progress.startTask(task.id);
      return task;
    } else {
      throw new Error(task);
    }
  }

  async function sendAnswer(id: number, indataId: number) {
    incorrectAnswer = false;
    progress.guessedTask(id, answer);
    const res = await fetch(`/.netlify/functions/answer/${id}`, {
      method: 'POST',
      body: JSON.stringify({ answer, indataId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      correctAnswer = true;
      progress.finishedTask(id);
    } else {
      incorrectAnswer = true;
    }
  }
</script>

<nav class="navigation">
  <a class="button" href="/">&larr; Back to tasks list</a>
  <button class="reload-button" on:click={() => reload()}>&#8634; Reload</button>
</nav>

{#await getTaskPromise}
  <Loading />
{:then task}
  <section class="task">
    <p class="code-label">Crack this:</p>
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

    {#if task.information && task.information.length}
      <div class="info-container">
        <h2>Intercepted information</h2>
        {#each task.information as info}
          <div class="info">
            {#if shouldShow(info, task.id)}
              {@html info.html}
            {:else}
              <button on:click={() => progress.revealInformation(info.level, task.id)}
                >Reveal information</button
              >
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </section>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
  .navigation {
    display: flex;
    justify-content: space-between;
  }
  .reload-button {
    display: inline-flex;
    width: auto;
  }
  .code-label {
    margin-bottom: 20px;
  }

  .button {
    display: flex;
    justify-self: flex-start;
  }

  .code {
    word-wrap: break-word;
    font-size: 32px;
    font-weight: bold;
    max-width: 20ch;
    margin: 0 auto;
  }

  .info-container {
    text-align: left;
  }

  .info {
    margin-bottom: 20px;
  }
</style>
