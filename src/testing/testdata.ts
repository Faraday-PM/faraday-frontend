import * as forge from "node-forge";
import { vault } from "../stores";

const url = "http://192.168.2.198:8000";
const salt = "salt";
const password = forge.pkcs5.pbkdf2("password123", salt, 600_000, 32, "sha256");

const key = "This is a key123";
let message = "";
let iv = ""; // "This is an IV456";

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
getiv();
getVault();

function encrypt(plaintext: string) {
  const cipher = forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(plaintext));
  cipher.finish();
  return cipher;
}

function decrypt(ciphertext: string) {
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
export default function run() {
  // Same quirk in JSON parsing standard
  const decrypted = decrypt(message).replaceAll("'", '"');

  console.log(decrypted);
  console.log(JSON.parse(decrypted));
  return;
}

const v = {
  vault: [
    {
      url: "https://google.com",
      username: "richardjackson@yahoo.com",
      password: "!5bAcX&VuK",
    },
    {
      url: "https://youtube.com",
      username: "iwilson@hotmail.com",
      password: "+4CrUi5%*t",
    },
    {
      url: "https://facebook.com",
      username: "hmcgee@hotmail.com",
      password: "Y*kp9XKVCd",
    },
    {
      url: "https://instagram.com",
      username: "isantiago@yahoo.com",
      password: "h%an0YveZ#",
    },
    {
      url: "https://twitter.com",
      username: "brian68@gmail.com",
      password: "@qO@LwZ(M2",
    },
  ],
};

// 68656C6C6F20776F726C64

// 68656c6c6f20776f726c640505050505

/* 

163372d851751cc93711de77322f2f8c10688de9ee66878327c363427d709766
c56901b594261452a36c64417b8867198eef4bfc53f56e5d7bb3c7f2a52df6ea

*/
