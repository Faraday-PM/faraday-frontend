import { vault, credentials, serverIP, mount } from "../stores";
import { Buffer } from "buffer";
import { encode } from "./stringencode";
import { ArrayBufferToBase64, Base64ToArrayBuffer } from "./base64funcs";

// All dynamically set
// I hate doing it like this
// There must be a better way but I'm lazy and wanna ship to prod
let url = "";
serverIP.subscribe((value) => {
  url = value;
});

let password = "";
let username = "";
let key: CryptoKey;

async function getkey(a: ArrayBuffer) {
  const k = await window.crypto.subtle.importKey("raw", a, "AES-GCM", true, [
    "decrypt",
    "encrypt",
  ]);
  // GLOBAL VARIABLE :)
  key = k;
}

let mounted = false;
mount.subscribe((v) => {
  mounted = v;
});

credentials.subscribe((value) => {
  password = value.password;
  username = value.username;
  if (mounted) {
    getkey(Base64ToArrayBuffer(value.vaultkey));
  }
});

function getVault(): string {
  let vault = "";
  async function helper() {
    const body = {
      username: username,
      password: password,
    };
    const res = await fetch(`${url}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();

    vault = json.vault;
  }
  helper();
  return vault;
}

// typescript stuff ??

interface Item {
  url: string;
  username: string;
  password: string;
}

// Update vault
export async function saveVault(v: Record<string, Item>) {
  const encVault = encrypt(JSON.stringify(v));

  const res = await fetch(`${url}/vault`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      vault: encVault,
    }),
  });
  console.log(await res.json());
}

export async function updateVault() {
  const v = await getVault();
  // Might not need to replace stuff
  const decrypted = JSON.parse(decrypt(v).replaceAll("'", '"'));
  vault.set(decrypted);
}

export function encrypt(plaintext: string): string {
  let returnitem = "";
  async function helper() {
    const iv = Base64ToArrayBuffer(await getiv());

    const cipher = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      encode(plaintext)
    );
    returnitem = ArrayBufferToBase64(cipher);
  }
  helper();
  return returnitem;
}

// TODO: Convert this iv to a better one
// TODO: Make iv return based on status, like a 200 means success and get iv, but anything else means don't
function getiv(): string {
  let resultant_iv = "";
  async function helper() {
    const res = await fetch(`${url}/iv?user=${username}`);

    // TODO: Implement global notification system
    if (res.status == 200) {
      resultant_iv = await res.text();
    } else {
      console.error(res.statusText);
    }
  }
  helper();
  return resultant_iv;
}

export function decrypt(ciphertext: string): string {
  let decrypted = "";

  async function helper() {
    const iv = Base64ToArrayBuffer(await getiv());

    const cipher = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      encode(ciphertext)
    );

    decrypted = ArrayBufferToBase64(cipher);
  }

  return decrypted;
}
