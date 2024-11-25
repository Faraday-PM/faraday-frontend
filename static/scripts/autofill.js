//chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//  if (changeInfo.status == "complete") {
//chrome.scripting.executeScript({ target: { tabId }, function: pageLoad });
//  }
//});

let fillable = false;

function containsLogin() {
  const keywords = ["password", "email", "username"];

  const inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    console.log("HELLOO");
    let type = inputs[i].type.toLowerCase();
    let autocomplete = inputs[i].autocomplete.toLowerCase();
    if (keywords.includes(type) || keywords.includes(autocomplete)) {
      return true;
    }
  }
  return false;
}

async function NodeListener() {
  const observer = new MutationObserver(async (mutations) => {
    const keywords = ["password", "email", "username"];

    const inputs = document.getElementsByTagName("input");
    let fill = false;

    for (let i = 0; i < inputs.length; i++) {
      let type = inputs[i].type.toLowerCase();
      let autocomplete = inputs[i].autocomplete.toLowerCase();
      if (keywords.includes(type) || keywords.includes(autocomplete)) {
        fill = true;
        break;
      }
    }
    if (!fill) return;

    const v = await chrome.storage.local.get(["fvault"]);
    const vault = v["fvault"]["vault"];
    const url = window.location.host;

    let username = "";
    let password = "";

    for (i = 0; i < vault.length; i++) {
      if ([`https://${url}`, `http://${url}`].indexOf(vault[i]["url"]) >= 0) {
        username = vault[i]["username"];
        password = vault[i]["password"];
        break;
      }
    }

    if (username == "") return;

    // autofill
    const inputLength = inputs.length;
    for (let i = 0; i < inputLength; i++) {
      const input = inputs.item(i);
      const type = input.type.toLowerCase();

      // Purpose??
      // const autocomplete = input.autocomplete.toLowerCase();

      // type in email/username
      if (["email", "username"].indexOf(type) >= 0) {
        input.value = username;
      }
      if (type == "password") {
        input.value = password;
      }
    }
  });

  observer.observe(document, { childList: true, subtree: true });
}

async function getCredentials() {
  const v = await chrome.storage.local.get(["fvault"]);
  const vault = v["fvault"]["vault"];

  const url = window.location.host;

  let username = "";
  let password = "";
  for (i = 0; i < vault.length; i++) {
    if (
      vault[i]["url"] == `https://${url}` ||
      vault[i]["url"] == `http://${url}`
    ) {
      username = vault[i]["username"];
      password = vault[i]["password"];
      break;
    }
  }

  if (username == "") throw new Error("No Username Found!"); // Pretty sure any error in the program should mean no go
  fillable = true;
  return username, password;
}

async function pageLoad() {
  // JS errors suck

  const v = await chrome.storage.local.get(["fvault"]);
  const vault = v["fvault"]["vault"];
  const url = window.location.host;

  let username = "";
  let password = "";

  for (i = 0; i < vault.length; i++) {
    if ([`https://${url}`, `http://${url}`].indexOf(vault[i]["url"]) >= 0) {
      username = vault[i]["username"];
      password = vault[i]["password"];
      break;
    }
  }

  if (username == "") return;

  // autofill
  const inputs = document.getElementsByTagName("input");
  const inputLength = inputs.length;
  for (let i = 0; i < inputLength; i++) {
    const input = inputs.item(i);
    const type = input.type.toLowerCase();

    // Purpose??
    // const autocomplete = input.autocomplete.toLowerCase();

    // type in email/username
    if (["email", "username"].indexOf(type) >= 0) {
      input.value = username;
    }
    if (type == "password") {
      input.value = password;
    }
  }
  /* console.log("Running");
  try {
    const [username, password] = await getCredentials();
    console.log(username);
    autoFill(username, password);
  } catch (e) {
    console.log(e.message);
    throw e;
  }
  */
}

function autoFill(username, password) {
  const inputs = document.getElementsByTagName("input");
  const inputLength = inputs.length;
  for (let i = 0; i < inputLength; i++) {
    const input = inputs.item(i);

    const type = input.type.toLowerCase();
    // Purpose?
    // const autocomplete = input.autocomplete.toLowerCase();
    if (type == "email" || type == "username") {
      input.value = username;
    }
    if (type == "password") {
      input.value = password;
    }
  }
}

chrome.webNavigation.onCompleted.addListener(({ tabId, frameId }) => {
  if (frameId !== 0) return;

  chrome.scripting.executeScript({ target: { tabId }, function: pageLoad });
  chrome.scripting.executeScript({
    target: { tabId },
    function: NodeListener,
  });
});
