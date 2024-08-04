<script lang="ts">
  import sleep from "../../utility/sleep";
  import { fade } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { serverIP, serverDetails } from "../../stores";

  interface user {
    url: string;
    url2: string;
    username: string;
    password: string;
  }

  $: {
    serverIP.set(userInfo.url);
  }

  $: {
    serverDetails.set(serverInfo);
  }

  let userInfo: user = {
    url: "http://127.0.0.1:8000",
    url2: "",
    username: "",
    password: "",
  };

  let serverInfo: ServerDetails = {
    allowConns: false,
    email: false,
  };

  let check: boolean = true;
  // whiteboard masturbation??
  let introWords: Array<string> = [
    "Welcome to Faraday",
    "The self hosted password manager",
  ];
  let i: number = 0;
  let j: number = 0;
  let text: string = "";
  let currentWord: string = "";
  let isDeleting: boolean = false;
  let speed: number = 150;
  let scene: string = "intro";

  let typeWriter = async () => {
    currentWord = introWords[i];
    if (isDeleting) {
      text = currentWord.substring(0, j - 1);
      j--;
      if (j == 0) {
        isDeleting = false;
        i++;
        if (i == introWords.length) {
          i = 0;
        }
      }
    } else {
      text = currentWord.substring(0, j + 1);
      j++;
      if (j == currentWord.length) {
        if (text == introWords[1]) {
          await sleep(1000);
          text = "";
          scene = "server";
        }
        await sleep(1000);
        isDeleting = true;
      }
    }
    if (scene == "intro") {
      setTimeout(typeWriter, speed);
    }
  };
  typeWriter();

  let errorMessage: string = "";

  async function checkAllowConns(): Promise<ServerDetails> {
    let allow = false;
    try {
      const res = await fetch(`${userInfo.url}/details`);
      console.log(res);
      const data: ServerDetails = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // I just love type masturbation
  class ConnectionError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ConnectionError";
    }
  }

  interface ServerDetails {
    allowConns: boolean;
    email: boolean;
  }

  async function connect() {
    let allowed = false;
    try {
      const d = await checkAllowConns();
      allowed = d.allowConns;
      serverInfo = d;
    } catch (e) {
      console.log(e);
      throw new ConnectionError("Couldn't find server");
    }
    if (allowed) {
      console.log("redirecting");
      goto("/onboarding/signup");
    } else {
      throw new ConnectionError("Server refused new account");
    }
  }
</script>

<div class="h-[600px] w-[375px] font-mono">
  <div class="flex items-center justify-center h-screen flex-col">
    {#if scene == "intro"}
      <p class="max-w-[60%] text-center text-2xl pb-3 font-bold">
        {text}
      </p>
    {:else if scene == "server"}
      <div transition:fade>
        <h2 class="text-xl font-bold">Server Details</h2>
        <div class="form-control flex items-center">
          <label class="label cursor-pointer">
            <input
              type="checkbox"
              class="checkbox"
              bind:checked={check}
              on:change={() => {
                [userInfo.url, userInfo.url2] = [userInfo.url2, userInfo.url];
              }}
            />
            <span
              ><input
                disabled={check}
                type="text"
                bind:value={userInfo.url}
                class="ml-5 input input-bordered w-full max-w-xs"
              /></span
            >
          </label>
          <input
            type="button"
            value="Connect"
            class="btn btn-ghost focus:btn-primary w-1/2 mt-3"
            on:click={() => {
              try {
                connect();
              } catch (e) {
                if (e instanceof Error) {
                  errorMessage = e.message;
                }
              }
            }}
          />
        </div>
      </div>
    {/if}
  </div>

  <!-- technical fields-->
  <!--
    <div>
    <div class="flex justify-between">
      <input type="checkbox" checked={checked} class="checkbox" />
      <input type="text" id="server" placeholder="Enter server address"/>
    </div>
    <div class="flex justify-between">
      <label for="email">Email</label>
      <input type="email" id="email" />
    </div>
    <div class="flex justify-between">
      <label for="password">Password</label>
      <input type="password" id="password" />
    </div>
    <div class="flex justify-between">
      <label for="confirm-password">Confirm Password</label>
      <input type="password" id="confirm-password" />
    </div>
  </div>
  
  -->
</div>
