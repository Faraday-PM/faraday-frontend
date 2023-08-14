import * as forge from "node-forge";

const derivekey = (username: string, password: string) => {
  // salt doesnt matter for this application
  // hopefully
  const key = forge.pkcs5.pbkdf2(
    username + password,
    "salt",
    600_000,
    32,
    "sha256"
  );
  return forge.util.bytesToHex(key);
};

self.onmessage = (event) => {
  const derived = derivekey(event.data.username, event.data.password);
  self.postMessage(derived);
  self.close();
};
