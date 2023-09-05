import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";
import * as forge from "node-forge";

export const route = persist(writable(""), createLocalStorage(), "route");

export const vault: any = persist(
  writable({ vault: [] }),
  createLocalStorage(),
  "vault"
);

/* 
vault = {
    vault: [
        {
        url: "https://google.com",
        username: "admin",
        password: "password",
        },
        {
        url: "https://stackoverflow.com",
        username: "stackoverflowusername",
        password: "password",
        },
        {
        url: "https://gnu.org",
        username: "gnuusername",
        password: "password",
        }
    ] 
}





"username": "tester",
"password": "hashedpassw"
*/

export const credentials = persist(
  writable({
    username: "emilio",
    password:
      "c56901b594261452a36c64417b8867198eef4bfc53f56e5d7bb3c7f2a52df6ea", // hex encoded value of password123 with salt "salt"
    decrypted: "password123",
  }),
  createLocalStorage(),
  "credentials"
);

export const serverIP = persist(
  writable("http://192.168.2.198:8000"),
  createLocalStorage(),
  "serverIP"
);
