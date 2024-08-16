import { Buffer } from "buffer";

export function encode(s: string): Uint8Array {
  const arr: Uint8Array = Uint8Array.from(
    s.split("").map((c) => c.charCodeAt()) //idk why error
  );
  return arr;
}

export function decode(arr: Uint8Array): string {
  const s = Buffer.from(arr.buffer).toString("base64");
  return s;
}
