<script lang="ts">
  import { credentials, serverDetails, serverIP } from "../../../stores";
  import * as sha256 from "fast-sha256";
  import { encode, decode } from "../../../utility/stringencode";

  let email: string = "";
  let username: string = "";
  let password: string = "";
  let confirmPassword: string = "";

  let response: string = "";
  async function signup() {
    // check passwords match
    if (password !== confirmPassword) {
      response = "Passwords do not match";
      return;
    }

    let res = await fetch(`${$serverIP}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const messages: Record<number, string> = {
      200: "Account created successfully",
      400: "Invalid email or password",
      422: "Please fill in all fields",
    };
    if (res.status in messages) {
      response = messages[res.status];
    } else {
      response = "An error occurred";
    }

    if (res.status === 200) {
      storeStuff();
    }
  }
  // set stuff with stores
  // TODO: change name of func
  async function storeStuff() {
    const plaintext = encode(username + password);
    // salt
    const salt = new Uint8Array([115, 97, 108, 116]);
    const key = sha256.pbkdf2(plaintext, salt, 600000, 32);

    // convert key to string using Uint8Array
    const ciphertext = decode(key);

    credentials.set({
      username: username,
      password: ciphertext,
    });
  }
</script>

<div class="h-[600px] w-[375px] font-mono">
  <div class="flex justify-center align-middle items-center h-full">
    <div class="flex-row justify-center items-center">
      <h2 class="font-bold te xt-xl">Create Account</h2>
      <div class="form-control mt-4">
        {#if $serverDetails.email}
          <label class="input input-bordered flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
              />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
              />
            </svg>
            <input
              type="text"
              class="grow focus:outline-none"
              placeholder="Email"
              bind:value={email}
            />
          </label>
        {/if}
        <label class="input input-bordered flex items-center gap-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
            />
          </svg>
          <input
            type="text"
            class="grow focus:outline-none"
            placeholder="Username"
            bind:value={username}
          />
        </label>
        <label class="input input-bordered flex items-center gap-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            class="grow focus:outline-none"
            bind:value={password}
          />
        </label>
        <label class="input input-bordered flex items-center gap-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Confirm Password"
            class="grow focus:outline-none"
            bind:value={confirmPassword}
          />
        </label>
        <button
          class="btn btn-primary w-full mt-4"
          on:click={() => {
            signup();
          }}>Sign Up</button
        >
        <p class="font-mono text-red-600 font-bold pt-3">{response}</p>
      </div>
    </div>
  </div>
</div>
