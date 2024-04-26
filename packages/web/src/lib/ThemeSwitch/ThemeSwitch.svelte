<script lang="ts">
	import { onMount } from "svelte";

let darkMode = true;
const handleSwitchDarkMode = () => {
  darkMode = !darkMode;
  darkMode
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark');
}

onMount(() => {
  if (localStorage.getItem('darkMode') === 'true') {
    darkMode = true;
    document.documentElement.classList.add('dark');
  } else {
    darkMode = false;
    document.documentElement.classList.remove('dark');
  }
});
</script>

<button on:click={handleSwitchDarkMode}>
  {#if !darkMode}
    <svg class="text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$props}><g fill="currentColor"><path d="M184 128a56 56 0 1 1-56-56a56 56 0 0 1 56 56" opacity=".2"/><path d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0m72 88a64 64 0 1 1-64-64a64.07 64.07 0 0 1 64 64m-16 0a48 48 0 1 0-48 48a48.05 48.05 0 0 0 48-48M58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8m80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8m112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16"/></g></svg>
  {:else}
    <svg class="text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$props}><g fill="currentColor"><path d="M210.69 158.18A88 88 0 1 1 97.82 45.31A96.08 96.08 0 0 0 192 160a96.78 96.78 0 0 0 18.69-1.82" opacity=".2"/><path d="M240 96a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0v-16h-16a8 8 0 0 1 0-16h16V72a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8m-96-40h8v8a8 8 0 0 0 16 0v-8h8a8 8 0 0 0 0-16h-8v-8a8 8 0 0 0-16 0v8h-8a8 8 0 0 0 0 16m72.77 97a8 8 0 0 1 1.43 8A96 96 0 1 1 95.07 37.8a8 8 0 0 1 10.6 9.06a88.07 88.07 0 0 0 103.47 103.47a8 8 0 0 1 7.63 2.67m-19.39 14.88c-1.79.09-3.59.14-5.38.14A104.11 104.11 0 0 1 88 64c0-1.79 0-3.59.14-5.38a80 80 0 1 0 109.24 109.24Z"/></g></svg>
  {/if}
</button>