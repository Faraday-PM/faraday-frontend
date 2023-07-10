<script lang="ts">
  import { onMount } from "svelte";
  import NavBar from "../components/NavBar.svelte";
  import SearchBar from "../components/SearchBar.svelte";
  import ListItem from "../components/ListItem.svelte";
  import { vault, serverIP, credentials } from "../stores";
  import updateVault from "../utility/updateVault";

  const get = async () => {
    let v = "";
    const res = await fetch(`${$serverIP}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: $credentials.username,
        password: $credentials.password,
      }),
    })
      .then((r) => r.json())
      .then((val) => {
        v = val.vault;
      });
    return v;
  };

  const response = get().then((val) => {
    updateVault(val);
  });
  console.log($vault.vault);
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
