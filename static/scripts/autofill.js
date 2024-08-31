/*function containsLogin() {
  const cl = false;

  const keywords = ["password", "email", "username"];

  let inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    let type = inputs[i].type.toLowerCase();
    let autocomplete = inputs[i].autocomplete.toLowerCase();
    if (keywords.includes(type) || keywords.includes(autocomplete)) {
      return true;
    }
  }

  return cl;
}

const keywords = ["password", "email", "username"];
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (!mutation.addedNodes) {
      return;
    }
    for (let i = 0; i < mutation.addedNodes.length; i++) {
      if (mutation.addedNodes[i].nodeName == "INPUT") {
        let type = mutation.addedNodes[i].type.toLowerCase();
        let autocomplete = mutation.addedNodes[i].type.toLowerCase();
        console.log(mutation.addedNodes[i].type);
        if (keywords.includes(type) || keywords.includes(autocomplete)) {
          console.log("TRUE");
        }
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

console.log("HI");

*/
chrome.webNavigation.onCompleted.addListener(({ tabId, frameId }) => {
  if (frameId !== 0) return;

  /*const v = chrome.storage.local.get(["vault"], () => {
    chrome.storage.sync.set({ vault: v }, () => {
      chrome.scripting.executeScript({
        target: { tabId },
        function: pageLoad,
      });
    });
  });
  */
  //console.log(v);
  /*chrome.storage.sync.set({ vault: v });
  chrome.scripting.executeScript({
    target: { tabId },
    function: pageLoad,
  }); */
  chrome.storage.local.get(null, function (items) {
    console.log(JSON.stringify(items));
  });

  chrome.scripting.executeScript({ target: { tabId }, function: pageLoad });
});

function containsLogin() {
  const cl = false;
  console.log(123);
  const keywords = ["password", "email", "username"];

  const inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    console.log * "HELLOO";
    let type = inputs[i].type.toLowerCase();
    let autocomplete = inputs[i].autocomplete.toLowerCase();
    if (keywords.includes(type) || keywords.includes(autocomplete)) {
      return true;
    }
  }
  console.log(1234);
  return cl;
}

function autofill(username, password) {
  // Fill all elements of this type
  const keywords_e = ["email", "username"];
  const keyword_p = "password";
  const inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    let type = inputs[i].type.toLowerCase();
    let autocomplete = inputs[i].autocomplete.toLowerCase();
    if (keywords_e.includes(type) || keywords_e.includes(autocomplete)) {
      inputs[i].value = username;
    }
    if (type == keyword_p || autocomplete == keyword_p) {
      inputs[i].value = password;
    }
  }
}

async function pageLoad() {
  console.log(0);
  const hasLogin = containsLogin();
  console.log(`HASLOGIN: ${hasLogin}`);
  if (!hasLogin) return;

  //chrome.storage.local.get(null, function (items) {
  //  console.log(items);
  //});
  const v = await chrome.storage.local.get(["fvault"]);
  const vault = v["fvault"]["vault"];
  //console.log(v["fvault"]["vault"]);

  const url = window.location.host;
  //console.log(window.location.host);
  console.log(1);
  let username = "";
  let password = "";
  for (i = 0; i < vault.length; i++) {
    console.log(vault[i]);
    if (
      vault[i]["url"] == `https://${url}` ||
      vault[i]["url"] == `http://${url}`
    ) {
      username = vault[i]["username"];
      password = vault[i]["password"];
      break;
    }
  }
  if (username == "") return;
  console.log(username, password);
  autofill(username, password);
}
