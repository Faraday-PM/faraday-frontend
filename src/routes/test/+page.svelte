<script>
  import { AES } from "@stablelib/aes";
  import { encode, decode } from "../../utility/stringencode";

  const key = "2B7E151628AED2A6ABF7158809CF4F3C";
  const message = "your-message-to-encrypt";

  const cipher = new AES(encode(key));

  const dst = new Uint8Array(32);
  cipher.encryptBlock(encode(message), dst);
  console.log(dst);
  console.log(decode(dst));

  const src = new Uint8Array(32);
  cipher.decryptBlock(dst, src);
  console.log(src);
  console.log(decode(src));
</script>
