<script lang="ts">
  import {
    ArrayBufferToBase64,
    Base64ToArrayBuffer,
  } from "../../../utility/base64funcs";

  const a = new ArrayBuffer(2);
  console.log(a);

  const b = ArrayBufferToBase64(a);
  console.log(b);

  const c = Base64ToArrayBuffer(b);
  console.log(c);
</script>
