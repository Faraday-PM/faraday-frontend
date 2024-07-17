<script lang="ts">
  import sleep from "../../utility/sleep";

  let introWords = [
    "Welcome to Faraday",
    "Faraday is a platform that helps you to manage your passwords.",
  ];
  let i = 0;
  let j = 0;
  let text = "";
  let currentWord = "";
  let isDeleting = false;
  let speed = 150;

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
        await sleep(1000);
        isDeleting = true;
      }
    }
    setTimeout(typeWriter, speed);
  };
  typeWriter();
</script>

<div class="h-[600px] w-[375px] font-mono">
  <div class="flex items-center justify-center h-screen flex-col">
    <p
      class="text-2xl pb-3 font-bold transition-opacity ease-in duration-700 opacity-100 hover:opacity-0"
    >
      {text}
    </p>
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
