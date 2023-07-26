importScripts("https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.0/zxcvbn.js");

const passwordStrength = (password: string) => {
  const res = zxcvbn(password);
  postMessage(res);
};

self.onmessage = (e) => {
  passwordStrength(e.data);
};
