//chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//  if (changeInfo.status == "complete") {
//chrome.scripting.executeScript({ target: { tabId }, function: pageLoad });
//  }
//});

chrome.webNavigation.onCompleted.addListener(({ tabId, frameId }) => {
  if (frameId !== 0) return;

  chrome.scripting.executeScript({ target: { tabId }, function: pageLoad });
  chrome.scripting.executeScript({
    target: { tabId },
    function: NodeListener,
  });
});

async function NodeListener() {
  const observer = new MutationObserver(async (mutations) => {
    try {
      if (containsLogin()) {
        await pageLoad();
      }
    } catch (e) {
      if (e.message !== "No Username Found!") {
        throw e;
      }
    }
  });

  observer.observe(document, { childList: true, subtree: true });
}

let fillable = false;

function containsLogin() {
  const cl = false;
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
  return cl;
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
  try {
    const [username, password] = await getCredentials();
    autoFill(username, password);
  } catch (e) {
    return;
  }
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
