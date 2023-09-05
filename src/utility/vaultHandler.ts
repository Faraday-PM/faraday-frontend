import * as forge from "node-forge";
import { vault, credentials, serverIP } from "../stores";
import { Buffer } from "buffer";

const salt = "salt";

// All dynamically set
// I hate doing it like this
// There must be a better way but I'm lazy and wanna ship to prod
let url = "";
serverIP.subscribe((value) => {
  url = value;
});

let password = "";
let username = "";
credentials.subscribe((value) => {
  password = value.password;
  username = value.username;
});

let message = "";
let iv = ""; // "This is an IV456";

// Gonna make it change the vault store
async function getVault() {
  //console.log(password);
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

  message = json.vault;
  // console.log(json);
}

// typescript stuff ??

interface Item {
  url: string;
  username: string;
  password: string;
}

// Take v as param to avoid using more LOC and memory to subscribe vault to a store in this script
// Not sure if that's actually how it works
export async function saveVault(v: Record<string, Item>) {
  await getiv();

  console.log(password);
  console.log(JSON.stringify(v));

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
  await getiv();
  await getVault();

  const decrypted = JSON.parse(decrypt(message).replaceAll("'", '"'));

  vault.set(decrypted);
}

async function getiv() {
  console.log(password);
  const body = {
    username: username,
    password: password, // Password should be in hex form
  };
  const res = await fetch(`${url}/iv`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  console.log(json);
  iv = forge.util.hexToBytes(json.iv);
}

export function encrypt(plaintext: string): string {
  const cipher = forge.cipher.createCipher(
    "AES-CBC",
    forge.util.hexToBytes(password) // decipher and cipher need byte key, cause key len thats why hextobytes
  );
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(plaintext));
  cipher.finish();
  return cipher.output.data;
}

export function decrypt(ciphertext: string) {
  const decipher = forge.cipher.createDecipher(
    "AES-CBC",
    forge.util.hexToBytes(password)
  ); // decipher and cipher need byte key, cause key len thats why hextobytes
  decipher.start({
    iv: iv,
  });
  // im sorry future me
  // this line directly beneath this comment caused so much pain
  decipher.update(forge.util.createBuffer(ciphertext));
  decipher.finish();

  return decipher.output.data;
}

export function run() {
  // to future me, I at least made things in seperate functions
  getiv();
  getVault();
  // Same quirk in JSON parsing standard
  const decrypted = decrypt(message).replaceAll("'", '"');
  //console.log(forge.util.bytesToHex(password));
  console.log(decrypted);
  console.log(JSON.parse(decrypted));
  return;
}
