<script lang="ts">
  import { credentials, serverIP } from "./../../../../stores";

  let ip = $serverIP;
  let username = $credentials.username;
  let password = "";
  // I love svelte reactivity
  $: {
    serverIP.set(ip);
  }
</script>

<div class="h-[536px] w-[375px]">
  <div class="border-b-2 border-gray-300 h-[66px] inline-flex w-full p-3">
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
    <h3 class="text-lg font-bold ml-3">Account Settings</h3>
  </div>

  <div>
    <div class="m-3">
      <p>Server Ip Address</p>
      <input
        type="text"
        placeholder="Input valid ip address"
        bind:value={ip}
        class="input input-bordered input-primary w-3/4 max-w-xs"
      />
    </div>
  </div>
</div>
