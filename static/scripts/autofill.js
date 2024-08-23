function containsLogin() {
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
