<script lang="ts">
  import sleep from "../../utility/sleep";

  let check = true;

  let introWords = ["Welcome to Faraday", "The self hosted password manager"];
  let i = 0;
  let j = 0;
  let text = "";
  let currentWord = "";
  let isDeleting = false;
  let speed = 150;
  let done = true;

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
          done = true;
        }
        await sleep(1000);
        isDeleting = true;
      }
    }
    if (!done) {
      setTimeout(typeWriter, speed);
    }
  };
  typeWriter();

  $: {
    console.log(check);
  }
</script>

<div class="h-[600px] w-[375px] font-mono">
  <div class="flex items-center justify-center h-screen flex-col">
    {#if !done}
      <p
        class="max-w-[60%] text-center text-2xl pb-3 font-bold transition-opacity ease-in duration-700 opacity-100 hover:opacity-0"
      >
        {text}
      </p>
    {:else}
      <h2 class="text-xl font-bold">Server Details</h2>
      <div class="form-control">
        <label class="label cursor-pointer">
          <input type="checkbox" class="checkbox" bind:checked={check} />
          <span
            ><input
              disabled={check}
              type="text"
              placeholder="Type here"
              class="ml-5 input w-full max-w-xs"
            /></span
          >
        </label>
      </div>
    {/if}

    <!--
    <p class="text-sm px-4">Faraday is a platform that helps you to manage your passwords.</p>
    -->
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
