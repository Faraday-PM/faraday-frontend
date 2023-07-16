import { credentials, vault } from "../stores";

const logout = () => {
  credentials.set({ username: "", password: "" });
  vault.set({});
};

export default logout;
