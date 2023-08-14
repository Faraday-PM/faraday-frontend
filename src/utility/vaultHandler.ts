import * as forge from "node-forge";
import { vault, credentials, serverIP } from "../stores";

const salt = "salt";

// All dynamically set
let url = "";
serverIP.subscribe((value) => {
  url = value;
});

let password = "";
let key = "";
credentials.subscribe((value) => {
  password = value.password;
  key = password;
});

let message = "";
let iv = ""; // "This is an IV456";

// Gonna make it change the vault store
async function getVault() {
  const body = {
    username: "testing123",
    password: forge.util.bytesToHex(password),
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
  console.log(json);
}

export async function updateVault() {
  await getiv();
  await getVault();

  const decrypted = JSON.parse(decrypt(message).replaceAll("'", '"'));

  vault.set(decrypted);
}

async function getiv() {
  const body = {
    username: "testing123",
    password: forge.util.bytesToHex(password),
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

export function encrypt(plaintext: string) {
  const cipher = forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(plaintext));
  cipher.finish();
  return cipher;
}

export function decrypt(ciphertext: string) {
  const unhex = forge.util.hexToBytes(ciphertext);
  const decipher = forge.cipher.createDecipher("AES-CBC", password);
  decipher.start({
    iv: iv,
  });
  // im sorry future me
  decipher.update(forge.util.createBuffer(unhex));
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
