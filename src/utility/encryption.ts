import { AES, mode, pad } from "crypto-js";

export const encrypt = (vault: object, key: string, iv: any): string => {
  const res = AES.encrypt(JSON.stringify(vault), key, {
    // honestly don't know what this does
    // TODO: figure out what it does
    mode: mode.CFB,
    padding: pad.Pkcs7,
    iv: iv,
  });
  return res.toString();
};

export const decrypt = (vault: string, key: string, iv: any): object => {
  const res = AES.decrypt(vault, key, {
    // honestly don't know what this does
    // TODO: figure out what it does
    mode: mode.CFB,
    padding: pad.Pkcs7,
    iv: iv,
  });
  return JSON.parse(res.toString());
};
