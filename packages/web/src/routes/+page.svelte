<script lang="ts">
  import { env } from '$env/dynamic/public'
	import ThemeSwitch from '$lib/ThemeSwitch/ThemeSwitch.svelte';
  import axios from 'axios';

  const meta = {
    title: '🔗 Shorturl',
    description: 'Shorturl is a simple URL shortener service that allows you to shorten your long URL into a short one.',
  }

  let inputUrl = 'https://google.com';
  let result: string | null = null;
  let isLoading = false;
  const shortenNow = async () => {
    try {
      isLoading = true;
      const res = await axios({
        method: 'POST',
        url: `${env.PUBLIC_API_URL}/links`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        data: {
          originalUrl: inputUrl,
        },
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (res.status === 201 && res.data) {
        const data = res.data as { data: { link: string } };
        result = `${window.location.origin}/${data.data.link}`;
      } else {
        throw new Error('Failed to shorten URL');
      }
    } catch (error) {
      console.log(error);
      result = null;
    }
    isLoading = false;
  };
  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      result = null;
      inputUrl = '';
    }
  };
</script>

<svelte:head>
	<title>{meta.title}</title>
  <meta name="description" content="{meta.description}" />
  <meta name="og:title" content="{meta.title}" />
  <meta name="og:description" content="{meta.description}" />
  <meta name="keywords" content="shorturl, url shortener, shorten url" />
  <meta name="author" content="viandwi24" />
</svelte:head>

<div class="w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 flex flex-col">
  <div class="h-[74px] flex items-center border-b-2 border-gray-500/30">
    <div class="container px-6 max-w-screen-lg mx-auto w-full flex justify-between items-center">
      <div class="text-lg font-bold">{meta.title}</div>
      <div>
        <ThemeSwitch />
      </div>
    </div>
  </div>
  <div class="flex flex-1 items-center pb-[40px]">
    <div class="container px-6 flex-1 flex justify-center max-w-screen-lg mx-auto w-full">
      <div class="w-full md:w-1/2 flex flex-col justify-center">
        <div class="text-center md:text-left mb-8">
          <div class="text-8xl font-bold">Shorten your URL</div>
          <div class="text-gray-500 mt-4">Paste your long URL below to shorten it</div>
        </div>
        <div class="flex items-center rounded-lg overflow-hidden mb-2">
          {#if result}
            <input type="text" bind:value={result} class="border-l w-full h-12 px-4 shadow-lg text-gray-800 dark:text-gray-200 outline-none placeholder-gray-500 bg-gray-200 dark:bg-gray-800" placeholder="Your shortened URL" />
            <button class="h-12 px-4 bg-orange-500 text-white" on:click={copyResult}>Copy</button>
          {:else}
            <input type="text" bind:value={inputUrl} class="w-full h-12 px-4 shadow-lg text-gray-800 dark:text-gray-200 outline-none placeholder-gray-500 bg-gray-200 dark:bg-gray-800" placeholder="Paste your long URL here" />
            <button class="flex-1 h-12 px-4 bg-blue-500 text-white" on:click={shortenNow}>
              {#if isLoading}
                <svg class="animate-spin text-4xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12" opacity=".1"/><path fill="currentColor" d="M12 4a7.958 7.958 0 0 0-5.533 2.222a1 1 0 1 1-1.384-1.444A9.958 9.958 0 0 1 12 2a1 1 0 1 1 0 2"/></g></svg>
              {:else}
                Shorten
              {/if}
            </button>
          {/if}
        </div>
        <div>
          <p>
            {#if isLoading}
              Shortening...
            {:else}
              {#if result}
                Your shortened URL is ready!
              {/if}
            {/if}
          </p>
        </div>
      </div>
      <div class="md:w-1/2 hidden md:flex items-center justify-end">
        <img src="/illust.png" alt="Illustration" class="h-[460px]" />
      </div>
    </div>
  </div>
  <div class="h-[68px] border-t-2 border-gray-500/30 flex items-center">
    <div class="w-full mx-auto max-w-screen-lg px-4">
      <div>
        &copy; {new Date().getFullYear()}
        by <a href="https://viandwi24.com" target="_blank" class="text-blue-500 hover:underline">viandwi24</a>
      </div>
    </div>
  </div>
</div>