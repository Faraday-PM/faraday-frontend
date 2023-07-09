<script lang="ts">
  import { onMount } from "svelte";
  import NavBar from "../components/NavBar.svelte";
  import SearchBar from "../components/SearchBar.svelte";
  import ListItem from "../components/ListItem.svelte";
  import { vault, serverIP, credentials } from "../stores";
  import getVault from "../utility/getVault";

  const jsonToBase64 = (object: Object): string => {
    const json = JSON.stringify(object);
    return Buffer.from(json).toString("base64");
  };
  /*
  const base64ToJson = (base64String: string): { [index: string]: any } => {
    const json = Buffer.from(base64String, "base64").toString();
    return JSON.parse(json);
  };

  */
  let vl = {};
  onMount(() => {
    vl = getVault();
  });
  /*
  let vault = {
    vault: [
      {
        url: "https://google.com",
        username: "admin",
        password: "password",
      },
      {
        url: "https://stackoverflow.com",
        username: "stackoverflowusername",
        password: "password",
      },
      {
        url: "https://gnu.org",
        username: "gnuusername",
        password: "password",
      },
    ],
  };
  const loadapidata = () => {};


  {
    vault: [
      {
        url: "https://google.com",
        username: "admin",
        password: "password",
      },
      {
        url: "https://stackoverflow.com",
        username: "stackoverflowusername",
        password: "password",
      },
      {
        url: "https://gnu.org",
        password: "password",
      },
    ];
  }

  */

  const get = () => {
    const run = async () => {
      console.log("Hello World");
      await fetch(`${$serverIP}/vault`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: $credentials.username,
          password: $credentials.password,
          vault: jsonToBase64($vault),
        }),
      });
    };
    run();
  };
</script>

<div>
  <div class="h-[536px] w-[375px]">
    <SearchBar />
    <main class="h-[78%] overflow-y-scroll">
      <ul class="pl-3">
        {#each $vault.vault as v}
          <ListItem {...v} />
        {/each}
      </ul>
    </main>
    {JSON.stringify(vl)}
  </div>
</div>
