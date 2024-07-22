<script lang="ts">
  import "../tailwind.css";
  import NavBar from "../components/NavBar.svelte";
  import { onNavigate } from "$app/navigation";

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<div class="h-[600px] w-[375px] font-mono">
  <slot />
  <NavBar />
</div>
