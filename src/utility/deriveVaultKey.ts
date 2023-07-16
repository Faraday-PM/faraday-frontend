import pbkdf2 from "crypto-js/pbkdf2";

const deriveVaultKey = async (
  decryptedPassword: string,
  password: string
): Promise<string> => {
  // pbkdf2(pbkdf2(email | password) | password)
  const r1 = await pbkdf2(password + decryptedPassword, "salt", {
    keySize: 8,
    iterations: 600000,
    hasher: CryptoJS.algo.SHA256,
  }).toString(CryptoJS.enc.Hex);

  const r2 = await pbkdf2(r1 + password, "salt", {
    keySize: 8,
    iterations: 1,
    hasher: CryptoJS.algo.SHA256,
  }).toString(CryptoJS.enc.Hex);
  return r2;
};

export default deriveVaultKey;
