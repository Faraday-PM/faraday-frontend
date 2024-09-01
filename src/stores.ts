/*global chrome*/
import {
  persist,
  createLocalStorage,
  createChromeStorage,
} from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";
import { onMount } from "svelte";

export const route = persist(writable(""), createLocalStorage(), "route");

export const vault = persist(
  writable({ vault: [] }),
  createLocalStorage(),
  "vault"
);

// TODO: Update vault to store email and password????
// TODO: UPDATE vault setup to allow for better searching
/*
vault = {
  url: {
    username: 123
    password: 456
    }
}
*/
// Then I can just do vault[url] instead of stupid for loop
export const chrome_vault = persist(
  writable({ vault: [] }),
  createChromeStorage(),
  "fvault" //faraday vault
);

async function getTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);

  if (tab.url) {
    const regex = /^(https?:\/\/[^/?#]+)/;
    const matches = regex.exec(tab.url);

    if (matches && matches.length > 1) {
      const domainName = matches[1];
      return domainName;
    } else {
      throw new Error("Could not match find url");
    }
  }
}

vault.subscribe(async (value: any) => {
  /* if (typeof window !== "undefined") {
    const url = await getTab();
    for (let i = 0; i < value.length; i++) {
      if (value[i].url == url) {
        chrome_vault.set(value[i]);
        return;
      }
    }
  }*/
  chrome_vault.set(value);
});

//onMount(() => {
//  chrome.runtime.onMessage.addListener(messageReceived);
//});

function messageReceived(msg: any) {
  console.log(msg);
}

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
