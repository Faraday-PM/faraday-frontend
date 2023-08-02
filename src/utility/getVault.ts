import { serverIP, credentials } from "../stores";
import { Buffer } from "buffer";
import updateVault from "./updateVault";
import { encrypt, decrypt } from "./encryption";
import deriveVaultKey from "./deriveVaultKey";
import pbkdf2 from "crypto-js/pbkdf2";
import ByteBuffer from "bytebuffer";

let ip = "";
serverIP.subscribe((val) => {
  ip = val;
});

type credentialType = {
  username: string;
  password: string;
  decrypted: string;
};

let creds: credentialType = {
  username: "",
  password: "",
  decrypted: "",
};
credentials.subscribe((val) => {
  creds = val;
});

const getVault = async () => {
  const key = await pbkdf2(creds.password, "salt", {
    iterations: 600000,
    hasher: CryptoJS.algo.SHA256,
  })
  const iv_res = await fetch(`${ip}/iv`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: creds.username,
      password: creds.password
    })
  })
  const json = await iv_res.json()
  const iv = json.iv

  const res = await fetch(`${ip}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: creds.username,
      password: creds.password
    })
  })
  const res_json = await res.json()
  const v = res_json.vault
  const bytes_vault = ByteBuffer.fromHex(v)
}

const runGetVault = () => {
  getVault().then((val) => {
    updateVault(val);
  });
};

export default runGetVault;
