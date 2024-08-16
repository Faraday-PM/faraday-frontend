<script lang="ts">
  import NavBar from "../../components/NavBar.svelte";
  import { onNavigate } from "$app/navigation";
  import { onboarded } from "../../stores";
  import { redirect } from "@sveltejs/kit";
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

  if (!$onboarded) {
    throw redirect(300, "/onboarding");
  }
</script>

<div class="h-[600px] w-[375px] font-mono">
  <slot />
  {#if showNavBar}
    <NavBar />
  {/if}
</div>
