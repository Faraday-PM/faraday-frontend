import { AES, mode, pad } from "crypto-js";

export const encrypt = (vault: object, key: string): string => {
  const res = AES.encrypt(JSON.stringify(vault), key, {
    // honestly don't know what this does
    // TODO: figure out what it does
    mode: mode.CFB,
    padding: pad.Pkcs7,
  });
  return res.toString();
};

export const decrypt = (vault: string, key: string): object => {
  const res = AES.decrypt(vault, key, {
    // honestly don't know what this does
    // TODO: figure out what it does
    mode: mode.CFB,
    padding: pad.Pkcs7,
  });
  return JSON.parse(res.toString());
};

self.onmessage = (event) => {
  const { vault, key } = event.data;
  const encryptedVault = encrypt(vault, key);
  self.postMessage(encryptedVault);
  self.close();
};
