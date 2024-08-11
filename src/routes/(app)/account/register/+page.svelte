<script lang="ts">
  import { credentials, serverIP } from "./../../../../stores";
  import MyWorker from "../../../../utility/hashpw?worker";
  // import derivekey from "../../../utility/hashpw";
  let ip = $serverIP;
  let username = $credentials.username;
  let password = "";
  // I love svelte reactivity
  $: {
    serverIP.set(ip);
  }

  let added = 0; // 0 is not done yet, 1 is done, 2 is rejected

  async function registerWithServer() {
    const res = await fetch(`${ip}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: $credentials.password,
      }),
    });
    const json = await res.json();
    // console.log(json);
    if (json.msg == "Added User Successfully!") {
      added = 1;
    } else {
      added = 2;
    }
  }

  function registerUser() {
    const w = new MyWorker();
    // console.log("starting");
    w.postMessage({ username: username, password: password });
    w.onmessage = function (event) {
      console.log(event.data);
      credentials.set({
        username: username,
        password: event.data,
        decrypted: password,
      });

      registerWithServer();
    };
  }
</script>

<div class="h-[536px] w-[375px]">
  <div class="inline-flex p-4 w-full border-b-2">
    <a class="btn btn-sm btn-primary px-1" href="/account">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
          clip-rule="evenodd"
        />
      </svg>
    </a>

    <h2 class="text-lg font-semibold ml-3">Register</h2>
  </div>
  <div class="m-3">
    <h3 class="text-lg font-semibold">Enter new details</h3>
    {#if added == 1}
      <p class="font-bold text-green-300">Added Successfully!</p>
    {:else if added == 2}
      <p class="font-bold text-red-400">Username taken!</p>
    {:else}
      <p />
    {/if}
    <div>
      <p>Username</p>
      <input
        type="text"
        placeholder="Username"
        bind:value={username}
        class="input input-bordered input-primary w-3/4 max-w-xs"
      />
      <p>Password</p>
      <input
        type="text"
        placeholder="Password"
        bind:value={password}
        class="input input-bordered input-primary w-3/4 max-w-xs"
      />
      <button
        class="btn btn-primary"
        on:click={() => {
          registerUser();
        }}>Change</button
      >
    </div>
  </div>
</div>
