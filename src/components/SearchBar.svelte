<script lang="ts">
  import { serverIP, vault } from "./../stores";
  import Modal from "./Modal.svelte";

  let showModal = false;

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab.url);

    if (tab.url) {
      const regex = /^(https?:\/\/[^/?#]+)/;
      const matches = regex.exec(tab.url);

      if (matches && matches.length > 1) {
        const domainName = matches[1];
        return domainName;
      } else {
        throw new Error("Could not match find url");
      }
    }
    throw new Error("Could not get url instance");
  }

  const getfavicon = async (url: string) => {
    // my bad for the messy code
    const res = await fetch(`${$serverIP}/favicon?url=${url}`);

    await res.json().then((result) => {
      favicon = result.msg;
    });
  };

  async function setupAdd() {
    try {
      const domainName = await getCurrentTab();
      capsule.url = domainName;
      getfavicon(domainName);
    } catch {}
  }

  let capsule = {
    url: "",
    username: "",
    password: "",
  };

  let favicon = "";

  function addToVault() {
    try {
      let v = $vault;
      v.vault.push({
        url: capsule.url,
        username: capsule.username,
        password: capsule.password,
      });

      vault.set(v);
      console.log("added to vault");
    } catch (e) {
      console.log("Couldn't add to vault");
      console.log(typeof $vault.vault);
      console.log(e);
      // Couldn't add to vault
      return;
    }
    return;
  }
</script>

<div id="search" class="flex pl-1 pt-2">
  <div class="relative flex w-10/12">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="absolute left-2 top-3.5 h-5 w-5"
    >
      <path
        fill-rule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clip-rule="evenodd"
      />
    </svg>

    <input
      type="text"
      placeholder="Search Vault"
      class="input-bordered input w-full max-w-xs pl-10"
    />
  </div>
  <div class="pl-2 pr-2 mt-2">
    <div class="relative">
      <button class="btn btn-neutral btn-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
  <button
    on:click={() => {
      showModal = true;
      setupAdd();
    }}
  >
    show modal
  </button>

  <Modal bind:showModal updateVault={addToVault}>
    <h2 slot="header" class="text-xl font-bold">Add to Faraday?</h2>

    <div>
      <div class="w-full">
        <span class="inline-flex">
          <img
            class="border w-[50px] h-[50px]"
            src={`data:image/png;base64,${favicon}`}
            alt=""
          />
          <input
            type="text"
            placeholder="example.com"
            class="input input-bordered w-full max-w-xs ml-3"
            bind:value={capsule.url}
          />
        </span>
      </div>
      <div class="w-full">
        <h3>Username</h3>
        <input
          type="text"
          required
          placeholder="username123"
          class="input input-bordered w-full invalid:border-error"
          bind:value={capsule.username}
        />
      </div>
      <div>
        <h3>Password</h3>
        <input
          type="password"
          required
          placeholder="password123"
          class="input input-bordered w-full invalid:border-error mb-5"
          bind:value={capsule.password}
        />
      </div>
    </div>
  </Modal>
</div>
