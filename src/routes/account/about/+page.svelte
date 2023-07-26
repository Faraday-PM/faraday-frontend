<script lang="ts">
  import faraday from "../../../faraday.json";
</script>

<div class="h-[536px] w-[375px]">
  <div
    class="border-b-2 border-gray-300 h-[66px] inline-flex w-full align-middle mt-3 ml-3"
  >
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
      </svg></a
    >
    <h3 class="text-xl font-bold ml-3">About Faraday</h3>
  </div>
  <div class="ml-3">
    <p>Name: {faraday.name}</p>
    <p>Version: {faraday.version}</p>
    <p>Release: {faraday.release}</p>
    <p>Built On: {faraday.built}</p>
    <p>
      License: <a
        class="link"
        href={faraday.license_link}
        target="_blank"
        rel="noopener noreferrer">{faraday.license}</a
      >
    </p>
    <p>
      Source: <a
        class="link"
        href={faraday.source_code}
        target="_blank"
        rel="noopener noreferrer">{faraday.source_code}</a
      >
    </p>
    <p>Author: {faraday.author}</p>
  </div>
</div>
