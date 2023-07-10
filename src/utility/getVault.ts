import { serverIP, credentials, vault } from "../stores";
import { Buffer } from "buffer";

// idk if it will auto update value
let creds: any = {};

credentials.subscribe((c) => {
  creds = c;
});

let ip: string;

serverIP.subscribe((i) => (ip = i));

export const base64ToJson = (
  base64String: string
): { [index: string]: any } => {
  const json = Buffer.from(base64String, "base64").toString();
  return JSON.parse(json);
};

export const jsonToBase64 = (object: object): string => {
  const json = JSON.stringify(object);
  return Buffer.from(json).toString("base64");
};

const getVault = async () => {
  const res = await fetch(`${ip}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: creds.username,
      password: creds.password,
    }),
  });
  const json = await res.json();
  console.log(json);
  vault.set(base64ToJson(json.vault));
  return json;
};

export default getVault;
