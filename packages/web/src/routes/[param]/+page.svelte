<script lang="ts">
  export let data: {
    originalUrl: string;
    shortUrl: string;
  };
</script>

<div>{JSON.stringify(data)}</div>