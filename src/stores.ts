import {
  CHROME_STORAGE_TYPE,
  persist,
  createLocalStorage,
  createChromeStorage,
} from "@macfja/svelte-persistent-store";
import { onMount } from "svelte";
import { writable } from "svelte/store";

export const route = persist(writable(""), createLocalStorage(), "route");

export const vault = persist(
  writable({ vault: [] }),
  createLocalStorage(),
  "vault"
);

export const chrome_vault = persist(
  writable({ vault: [] }),
  createChromeStorage(),
  "fvault" //faraday vault
);

vault.subscribe((value) => {
  chrome_vault.set(value);
});

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
export const serverDetails = writable<ServerDetails>({
  allowConns: false,
  email: false,
});

interface ServerDetails {
  allowConns: boolean;
  email: boolean;
}

export const credentials = persist(
  writable({
    username: "",
    password: "",
    vaultkey: "", // base64 encoded
  }),
  createLocalStorage(),
  "credentials"
);

export const serverIP = persist(
  writable("http://192.168.2.198:8000"),
  createLocalStorage(),
  "serverIP"
);

export const mount = writable(false);

export const onboarded = persist(
  writable(false),
  createLocalStorage(),
  "onboarded"
);
