<script lang="ts">
  import NavBar from "../../components/NavBar.svelte";
  import { onNavigate, goto } from "$app/navigation";
  import { onboarded } from "../../stores";
  import { onMount } from "svelte";
  const showNavBar: boolean = true;

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  onMount(() => {
    if (!$onboarded) {
      goto("/onboarding");
    }
  });
</script>

<div class="h-[600px] w-[375px] font-mono">
  <slot />
  {#if showNavBar}
    <NavBar />
  {/if}
</div>
