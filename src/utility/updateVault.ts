import { vault } from "../stores";
import { base64ToJson, jsonToBase64 } from "./base64funcs";

const updateVault = (v: string) => {
  console.log(base64ToJson(v));
  vault.set(base64ToJson(v));
};

export default updateVault;
