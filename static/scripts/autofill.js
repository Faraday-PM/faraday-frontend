function containsPasswordField() {}

function getPwdInputs() {
  let ary = [];
  const inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type.toLowerCase() === "password") {
      ary.push(inputs[i]);
    }
  }
  return ary;
}

console.log(getPwdInputs());
