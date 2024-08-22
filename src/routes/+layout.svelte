<script lang="ts">
  import "../tailwind.css";
  import { onMount } from "svelte";
  import { mount } from "../stores";
  onMount(() => {
    mount.set(true);
  });
</script>

<button
  on:click={async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    await chrome.scripting.registerContentScripts([
      { id: "1", matches: ["*://*/*"], js: ["content_scripts/autofill.js"] },
    ]);
    const x = await chrome.scripting.getRegisteredContentScripts();
    console.log(x);
  }}>Hello</button
>
<slot />
