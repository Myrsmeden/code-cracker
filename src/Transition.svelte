<script>
  import { router } from 'tinro';
  import { fade, fly } from 'svelte/transition';
</script>

{#key $router.path}
  <div in:fly="{{ x: -200, duration: 400 }}">
    <slot />
  </div>
{/key}
