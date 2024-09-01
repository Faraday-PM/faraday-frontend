<script lang="ts">
  import {
    password,
    backgroundColour,
    borderColour,
  } from "../routes/(app)/generator/stores";
  import zxcvbn from "zxcvbn";

  /*
  onMount(() => {
    const w = new Worker("src/routes/generator/worker.ts");
    w.postMessage($password);
    w.onmessage = function (event) {
      console.log(event.data);
      grade = event.data;
    };
  }); */
  let grade: any = {};
  const updateGrade = (p: string) => {
    /*
    const w = new Worker("src/routes/generator/worker.ts");
    w.postMessage(p);
    w.onmessage = function (event) {
      console.log(event.data);
      grade = event.data;
    };
    */
    grade = zxcvbn($password);
  };

  password.subscribe((value) => {
    if (value.length < 50) updateGrade(value);
  });

  $: {
    switch (grade.score) {
      case 0:
        backgroundColour.set("bg-red-300");
        borderColour.set("border-red-600");
        break;
      case 1:
        backgroundColour.set("bg-amber-300");
        borderColour.set("border-amber-600");
        break;
      case 2:
        backgroundColour.set("bg-lime-300");
        borderColour.set("border-lime-600");
        break;
      case 3:
        backgroundColour.set("bg-green-300");
        borderColour.set("border-green-600");
        break;
      case 4:
        backgroundColour.set("bg-green-400");
        borderColour.set("border-green-700");
        break;
      default:
        backgroundColour.set("bg-zinc-300");
        borderColour.set("border-zinc-600");
        break;
    }
  }
</script>

<div>
  {#if $password.length >= 50}
    <div>
      <div class="ml-3">
        <h3 class="font-bold">Report Card</h3>
        <p class="text-xs">
          <strong>100 / hour: </strong>centuries (throttled online attack)
        </p>
        <p class="text-xs">
          <strong>10 / second: </strong>centuries (unthrottled online attack)
        </p>
        <p class="text-xs">
          <strong>10k / second: </strong>centuries (offline, slow hash,
          multicore)
        </p>
        <p class="text-xs">
          <strong>10B / second:</strong>
          centuries (offline, fast hash, multicore)
        </p>
      </div>
    </div>
  {:else if grade.password === $password}
    <div class="ml-3">
      <h3 class="font-bold">Report Card</h3>
      <p class="text-xs">
        <strong>100 / hour: </strong>{grade.crack_times_display
          .online_throttling_100_per_hour} (throttled online attack)
      </p>
      <p class="text-xs">
        <strong>10 / second: </strong>{grade.crack_times_display
          .online_no_throttling_10_per_second} (unthrottled online attack)
      </p>
      <p class="text-xs">
        <strong>10k / second: </strong>{grade.crack_times_display
          .offline_slow_hashing_1e4_per_second} (offline, slow hash, multicore)
      </p>
      <p class="text-xs">
        <strong>10B / second:</strong>
        {grade.crack_times_display.offline_fast_hashing_1e10_per_second} (offline,
        fast hash, multicore)
      </p>
    </div>
  {:else}
    <div class="w-full h-full flex justify-center items-center align-middle">
      <span class="loading loading-xl" />
    </div>
  {/if}
</div>
