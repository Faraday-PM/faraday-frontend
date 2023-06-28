<script lang="ts">
  import NavBar from "../components/NavBar.svelte";
  import SearchBar from "../components/SearchBar.svelte";
  import ListItem from "../components/ListItem.svelte";
  const jsonToBase64 = (object: Object): string => {
    const json = JSON.stringify(object);
    return Buffer.from(json).toString("base64");
  };

  const base64ToJson = (base64String: string): { [index: string]: any } => {
    const json = Buffer.from(base64String, "base64").toString();
    return JSON.parse(json);
  };

  let vault = [
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
  ];
  const loadapidata = () => {};

  /*
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
</script>

<div>
  <div class="font-mono">
    <div class="h-[536px] w-[375px]">
      <SearchBar />
      <main class="h-[78%] overflow-y-scroll">
        <ul class="pl-3">
          {#each vault as v}
            <ListItem {...v} />
          {/each}
        </ul>
      </main>
    </div>
  </div>
</div>
