import { serverIP, credentials } from "../stores";
import { Buffer } from "buffer";
import updateVault from "./updateVault";
import { encrypt, decrypt } from "./encryption";
import deriveVaultKey from "./deriveVaultKey";

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
  let resVault = "";
  const res = await fetch(`${ip}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: creds.username,
      password: creds.password,
    }),
  })
    .then((r) => r.json())
    .then((val) => {
      resVault = val.vault;
    });
  const decrypted = decrypt(
    resVault,
    await deriveVaultKey(creds.decrypted, creds.password)
  );
  return resVault;
};

const runGetVault = () => {
  getVault().then((val) => {
    updateVault(val);
  });
};

export default runGetVault;
