<script lang="ts">

  let introWords = [
    "Welcome to Faraday",
    "Faraday is a platform that helps you to manage your passwords.",
  ]
  let i = 0
  let j = 0
  let text = introWords[0]
  let text2 = introWords[1]
  let speed = 50
  let speed2 = 50
  let typeWriter = () => {
    if (i < text.length) {
      text += text.charAt(i)
      i++
      setTimeout(typeWriter, speed)
    } else {
      if (j < text2.length) {
        text += text2.charAt(j)
        j++
        setTimeout(typeWriter, speed2)
      }
    }
  }
  typeWriter()


</script>

<div class="h-[600px] w-[375px] font-mono">
  <div class="flex items-center justify-center h-screen flex-col">
    <p class="text-2xl pb-3 font-bold transition-opacity ease-in duration-700 opacity-100 hover:opacity-0">{text}</p>
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
