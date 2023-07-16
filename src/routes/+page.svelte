<script lang="ts">
  import { onMount } from "svelte";
  import SearchBar from "../components/SearchBar.svelte";
  import ListItem from "../components/ListItem.svelte";
  import { vault } from "../stores";
  import runGetVault from "../utility/getVault";

  onMount(() => {
    if ($vault.vault == undefined) runGetVault();
  });
</script>

<div>
  <div class="h-[536px] w-[375px]">
    <SearchBar />
    <main class="h-[78%] overflow-y-scroll">
      <ul class="pl-3">
        {#if $vault.vault != undefined}
          {#each $vault.vault as v}
            <ListItem {...v} />
          {/each}
        {/if}
      </ul>
    </main>
  </div>
</div>
