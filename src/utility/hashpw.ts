import pbkdf2 from "crypto-js/pbkdf2";

const derivekey = (username: string, password: string) => {
  // salt doesnt matter for this application
  // hopefully
  /*const key = forge.pkcs5.pbkdf2(
    username + password,
    "salt",
    600_000,
    32,
    "sha256"
  ); 

  return forge.util.bytesToHex(key);*/

  // is this the js way to do it?
  async function helper() {
    const key = await pbkdf2(username + password, "salt", {
      keySize: 8,
      iterations: 600000,
      hasher: CryptoJS.algo.SHA256,
    }).toString(CryptoJS.enc.Hex);
    return key;
  }
  const k = helper();
  return k;
};

self.onmessage = (event) => {
  const derived = derivekey(event.data.username, event.data.password);
  self.postMessage(derived);
  self.close();
};
