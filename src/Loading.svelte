<script>
  export let size = 60;
  export let unit = 'px';
  export let colorOuter = '#db5461';
  export let colorCenter = '#342a21';
  export let colorInner = '#5bc0eb';
  export let durationMultiplier = 1;
  export let durationOuter = `${durationMultiplier * 2}s`;
  export let durationInner = `${durationMultiplier * 1.5}s`;
  export let durationCenter = `${durationMultiplier * 3}s`;
</script>

<div
  class="circle"
  style="--size: {size}{unit}; --colorInner: {colorInner}; --colorCenter: {colorCenter}; --colorOuter: {colorOuter}; --durationInner: {durationInner}; --durationCenter: {durationCenter}; --durationOuter: {durationOuter};"
/>

<style>
  .circle {
    width: var(--size);
    height: var(--size);
    box-sizing: border-box;
    position: relative;
    border: 3px solid transparent;
    border-top-color: var(--colorOuter);
    border-radius: 50%;
    animation: circleSpin var(--durationOuter) linear infinite;
    margin: 10px auto;
  }
  .circle:before,
  .circle:after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    border: 3px solid transparent;
    border-radius: 50%;
  }
  .circle:after {
    border-top-color: var(--colorInner);
    top: 9px;
    left: 9px;
    right: 9px;
    bottom: 9px;
    animation: circleSpin var(--durationInner) linear infinite;
  }
  .circle:before {
    border-top-color: var(--colorCenter);
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    animation: circleSpin var(--durationCenter) linear infinite;
  }
  @keyframes circleSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
