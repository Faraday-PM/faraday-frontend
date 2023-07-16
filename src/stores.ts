import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";

export const route = persist(writable(""), createLocalStorage(), "route");

export const vault: any = persist(writable({}), createLocalStorage(), "vault");

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
    password: "hashedpassw",
    decrypted: "hashedpassw",
  }),
  createLocalStorage(),
  "credentials"
);

export const serverIP = persist(
  writable("http://192.168.2.198:8000"),
  createLocalStorage(),
  "serverIP"
);
