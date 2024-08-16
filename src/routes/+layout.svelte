<script lang="ts">
  import "../tailwind.css";
  import { onMount } from "svelte";
  import { mount } from "../stores";

  onMount(() => {
    mount.set(true);
  });
</script>

<slot />
