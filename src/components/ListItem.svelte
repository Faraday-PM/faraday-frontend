<script lang="ts">
  import { onMount } from "svelte";
  let favicon: string;
  export let url: string;
  export let username: string;
  export let password: string;

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text); // writes to clipboard
  };

  const getfavicon = async () => {
    // TODO: Replace url with ref to localstorage of link
    const res = await fetch(`http://192.168.2.198:8000/favicon?url=${url}`);

    await res.json().then((result) => {
      favicon = result.msg;
    });
  };

  onMount(async () => await getfavicon());
</script>

<li class="pt-2">
  <div class="flex">
    <img
      class="border w-[50px] h-[50px]"
      src={`data:image/png;base64,${favicon}`}
      alt=""
    />
    <div class="flex flex-col pl-2">
      <a
        class="text-sm font-extralight text-gray-500 hover:text-gray-400"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </a>
      <h6>{username}</h6>
    </div>
    <div class="flex w-full justify-end">
      <div class="flex items-center pl-3">
        <div class="dropdown dropdown-end">
          <label tabIndex={0} class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-6 w-6"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3A1.501 1.501 0 009 4.5h6A1.5 1.5 0 0013.5 3h-3zm-2.693.178A3 3 0 0110.5 1.5h3a3 3 0 012.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            class="dropdown-content menu rounded-box w-36 bg-base-100 p-2 text-xs shadow"
          >
            <li>
              <button
                on:click={() => {
                  copyToClipboard(username);
                }}
              >
                Copy Username
              </button>
            </li>
            <li>
              <button
                on:click={() => {
                  copyToClipboard(password);
                }}>Copy Password</button
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="flex items-center pl-4 pr-3">
        <div class="dropdown dropdown-end">
          <label tabIndex={0} class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-6 w-6"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            class="dropdown-content menu rounded-box w-36 bg-base-100 p-2 text-xs shadow"
          >
            <li>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"
                  />
                </svg>
                Edit
              </button>
            </li>
            <li>
              <button class="text-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    clip-rule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</li>
