<script lang="ts">
  const file = {
    vault: [
      {
        url: "https://google.com",
        username: "admin",
        password: "password",
      },
      {
        url: "https://stackoverflow.com",
        username: "stackoverflowusername",
        password: "password",
      },
      {
        url: "https://gnu.org",
        username: "gnuusername",
        password: "password",
      },
    ],
  };
</script>

<div class="h-[536px] w-[375px]">
  <div class="inline-flex p-4 w-full border-b-2">
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

    <h2 class="text-lg font-semibold ml-3">Advanced Settings</h2>
  </div>

  <div class="">
    <div
      class="inline-flex hover:bg-gray-200 transition-all ease-in-out w-full px-5 py-3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
          clip-rule="evenodd"
        />
      </svg>
      <!-- Honestly idek -->
      <a
        href="data:text/json;charset=utf-8,{encodeURIComponent(
          JSON.stringify(file)
        )}"
        download="vault.json"
        class="ml-3">Download vault</a
      >
    </div>
  </div>
</div>
