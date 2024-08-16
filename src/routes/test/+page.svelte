<script lang="ts">
  import { onMount } from "svelte";
  import { encode, decode } from "../../utility/stringencode";

  /*
    Get import key
    derive key
    encrypt
    decrypt

    heres how flow is going to work


    encrypt:

        HAPPENING AT LOGIN
        user generates pbkdf2 key with import key and derive key
        user hashes more than 600_000 times to get rid of server knowing encryption key

        HAPPENING DURING ENCRYPTION
        user generates random iv
        user sends iv to server
        
        user uses pbkdf2 key to encrypt base64 encoded vault
        user sends vault to server

    decrupt:
        user gets iv

        user uses iv and pbkdf2 to decrypt vault
        vault is taken from base64 to object
        


        
  */

  function base64ArrayBuffer(arrayBuffer: ArrayBuffer) {
    var base64 = "";
    var encodings =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var bytes = new Uint8Array(arrayBuffer);
    var byteLength = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength = byteLength - byteRemainder;

    var a, b, c, d;
    var chunk;

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
      d = chunk & 63; // 63       = 2^6 - 1

      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength];

      a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

      // Set the 4 least significant bits to zero
      b = (chunk & 3) << 4; // 3   = 2^2 - 1

      base64 += encodings[a] + encodings[b] + "==";
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

      a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

      // Set the 2 least significant bits to zero
      c = (chunk & 15) << 2; // 15    = 2^4 - 1

      base64 += encodings[a] + encodings[b] + encodings[c] + "=";
    }

    return base64;
  }

  async function test() {
    const salt = "Hello Owrld";
    const plain = encode("Hello world how are you doing today?");

    // Key Derivation
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      plain,
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );

    const params = {
      name: "PBKDF2",
      salt: encode(salt),
      iterations: 600000,
      hash: "SHA-256",
    };

    const key = await window.crypto.subtle.deriveKey(
      params,
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );

    const decodedkey = await window.crypto.subtle.exportKey("raw", key); // type: array buffer
    console.log(base64ArrayBuffer(decodedkey));

    //encrypt
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      plain
    );
    console.log(base64ArrayBuffer(encrypted));

    //decrypt
    const decrypt = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      key,
      encrypted
    );

    console.log(base64ArrayBuffer(decrypt));
  }
  onMount(() => {
    test();
  });
</script>

<h1>HII</h1>
