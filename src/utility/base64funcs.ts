import { Buffer } from "buffer";

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
