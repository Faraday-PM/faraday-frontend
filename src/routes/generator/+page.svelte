<script lang="ts">
  import GradePanel from "../../components/GradePanel.svelte";
  import { password, backgroundColour, borderColour } from "./stores";

  const getRndInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // how do types work
  type generatedPasswordType = {
    length: number;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };

  let options = {
    length: 10,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  } satisfies generatedPasswordType;

  const generatePassword = (params: generatedPasswordType): string => {
    const { length, uppercase, lowercase, numbers, symbols } = params;
    const l = "abcdefghijklmnopqrstuvwxyz";
    const u = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const n = "0123456789";
    const s = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    let possibleChars = "";

    if (uppercase) possibleChars += u;
    if (lowercase) possibleChars += l;
    if (numbers) possibleChars += n;
    if (symbols) possibleChars += s;

    let password = "";

    for (let i = 0; i <= length; i++) {
      password += possibleChars[getRndInteger(0, possibleChars.length - 1)];
    }

    // not pure function
    if (password.includes("undefined")) {
      options.lowercase = true;
      return generatePassword(options);
    }

    return password;
  };

  let generatedPassword = "";
  // onMount(() => (generatedPassword = generatePassword(options)));

  $: {
    generatedPassword = generatePassword(options);
  }

  $: {
    password.set(generatedPassword);
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text); // writes to clipboard
  };
</script>

<div class="h-[536px] w-[375px]">
  <div class="p-3 w-full {$backgroundColour} border-b-2 {$borderColour} flex">
    <div class="w-3/4">
      <h3 class="text-lg text-primary font-bold">Generated Password</h3>
      <p class="truncate text-sm">{generatedPassword}</p>
    </div>
    <div class="mt-3 ml-3">
      <button
        on:click={() => {
          copyToClipboard(generatedPassword);
        }}
        class="active:scale-90 transition-all ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
          />
        </svg>
      </button>
      <button
        class="active:scale-90 transition-all ease-in-out"
        on:click={() => {
          generatedPassword = generatePassword(options);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </div>
  </div>

  <div class="mt-4">
    <form>
      <div class="flex flex-col items-center text-left">
        <div>
          <p>
            Password will be <strong>{options.length}</strong> characters
          </p>
          <input
            type="range"
            min="1"
            max="99"
            bind:value={options.length}
            class="range range-xs w-[90%]"
          />
        </div>
      </div>
      <div class="m-3">
        <div class="flex">
          <input
            type="checkbox"
            class="checkbox"
            bind:checked={options.lowercase}
          />
          <p class="ml-3">Lowercase (abc)</p>
        </div>
        <div class="flex">
          <input
            type="checkbox"
            class="checkbox"
            bind:checked={options.uppercase}
          />
          <p class="ml-3">Uppercase (ABC)</p>
        </div>
        <div class="flex">
          <input
            type="checkbox"
            class="checkbox"
            bind:checked={options.numbers}
          />
          <p class="ml-3">Numbers (123)</p>
        </div>
        <div class="flex">
          <input
            type="checkbox"
            class="checkbox"
            bind:checked={options.symbols}
          />
          <p class="ml-3">Symbols (!#$)</p>
        </div>
      </div>
    </form>

    <div class="divider" />
    <div>
      <GradePanel />
    </div>
  </div>
</div>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
