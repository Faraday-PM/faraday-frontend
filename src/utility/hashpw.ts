import pbkdf2 from "crypto-js/pbkdf2";
import CryptoJS from "crypto-js";

// takes soooo long to run, so we should run it in a seperate thread
const derivekey = (username: string, password: string) => {
  //console.log("running hashing");
  //console.time();
  // salt doesnt matter for this application
  // hopefully
  const key = pbkdf2(username + password, "salt", {
    keySize: 8,
    iterations: 600000,
    hasher: CryptoJS.algo.SHA256,
  }).toString(CryptoJS.enc.Hex);
  //console.log(key);
  //console.timeEnd();
  return key;
};

self.onmessage = (event) => {
  const derived = derivekey(event.data.username, event.data.password);
  self.postMessage(derived);
  self.close();
};
