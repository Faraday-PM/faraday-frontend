<script lang="ts">
  import { onMount } from "svelte";
  import { encode, decode } from "../../utility/stringencode";
  import {
    Base64ToArrayBuffer,
    ArrayBufferToBase64,
  } from "../../utility/base64funcs";

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
    console.log(ArrayBufferToBase64(decodedkey));

    //encrypt
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      plain
    );
    console.log(ArrayBufferToBase64(encrypted));

    //decrypt
    const decrypt = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      key,
      encrypted
    );

    console.log(ArrayBufferToBase64(decrypt));
  }
  onMount(() => {
    test();
  });
</script>

<h1>HII</h1>
