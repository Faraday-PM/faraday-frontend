<script lang="ts">
  import "../tailwind.css";
  import NavBar from "../components/NavBar.svelte";
</script>

<div class="h-[600px] w-[375px]">
  <slot />
  <NavBar />
</div>
